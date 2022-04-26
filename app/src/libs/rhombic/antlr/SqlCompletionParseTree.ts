import { StatementContext } from './SqlBaseParser';
import { CompletionVisitor } from './CompletionVisitor';
import { Cursor } from './Cursor';
import _ from 'lodash';
import { LineageParserOptions, SqlLineageParseTree } from './SqlLineageParseTree';

/**
 * Additional options when parsing for suggestions. Contains the cursor position.
 */
export interface CompletionParserOptions extends LineageParserOptions {
  /**
   * The cursor position used to identify the completion "context". Completion suggestions do often have to
   * be provided for invalid queries, for example due to trailing commas (after which a user expects suggestions).
   * To make sure the parser can handle such queries, it will first insert a parseable placeholder at the
   * specified position. When computing completions, we can then look for that placeholder to identify the
   * context (subquery clause) in which to complete.
   */
  cursorPosition: { lineNumber: number; column: number };
}

export const isCompletionOptions = (
  options: LineageParserOptions | CompletionParserOptions
): options is CompletionParserOptions => {
  return 'cursorPosition' in options;
};

interface Named {
  name: string;
}

/**
 * A `MetadataProvider` allows access to metadata of a project. It's used to compute
 * completion suggestions.
 */
export interface MetadataProvider<
  Catalog extends Named = Named,
  Schema extends Named = Named,
  Table extends Named = Named,
  Column extends Named = Named
> {
  getCatalogs: () => Catalog[];
  getSchemas: (arg?: { catalog: string }) => Schema[];
  getTables: (args?: { catalogOrSchema: string; schema?: string }) => Table[];
  getColumns: (args: { table: string; catalogOrSchema?: string; schema?: string }) => Column[];
}

/**
 * Possible suggestion items for auto completion.
 * "keyword" is not used right now but will likely be added later
 */
export type CompletionItem<Catalog = Named, Schema = Named, Table = Named, Column = Named> =
  | { type: 'keyword'; value: string } // keyword suggestion
  | { type: 'catalog'; value: Catalog } // catalog suggestion
  | { type: 'schema'; value: Schema } // schema suggestion
  | { type: 'relation'; value: string; desc?: Table } // table/cte suggestion
  | { type: 'column'; relation?: string; value: string; desc?: Column } // column suggestion
  | { type: 'snippet'; label: string; template: string }; // snippet suggestion

export class SqlCompletionParseTree extends SqlLineageParseTree {
  constructor(tree: StatementContext, cursor: Cursor) {
    super(tree, cursor);
  }

  /**
   * This method computes completion suggestions at the cursor position for the parsed query.
   *
   * @param metadataProvider Metadata lookup functions
   * @returns A list of possible completions at the cursor position in the parsed query
   */
  getSuggestions<
    Catalog extends Named = Named,
    Schema extends Named = Named,
    Table extends Named = Named,
    Column extends Named = Named
  >(
    metadataProvider: MetadataProvider<Catalog, Schema, Table, Column>
  ): CompletionItem<Catalog, Schema, Table, Column>[] {
    //
    const completionVisitor = new CompletionVisitor(this.cursor as Cursor, (args) =>
      metadataProvider.getColumns(args)
    );
    this.tree.accept(completionVisitor);

    const completions = completionVisitor.getSuggestions();
    console.log('completions', completions);
    const completionItems: CompletionItem<Catalog, Schema, Table, Column>[] = [];
    switch (completions.type) {
      case 'column': {
        const columns: CompletionItem<Catalog, Schema, Table, Column>[] = completions.columns.map(
          (col) => {
            return { type: 'column', relation: col.relation, value: col.name, desc: col.desc };
          }
        );

        completionItems.push(...columns);
        break;
      }
      case 'relation': {
        // always include cte names
        const cteCompletions: CompletionItem<Catalog, Schema, Table, Column>[] =
          completions.relations.map((rel) => {
            return { type: 'relation', value: rel };
          });
        completionItems.push(...cteCompletions);

        // fetch tables
        const args = completions.incompleteReference && {
          catalogOrSchema: completions.incompleteReference.references[0],
          schema: completions.incompleteReference.references[1],
        };
        const tableCompletions: CompletionItem<Catalog, Schema, Table, Column>[] = metadataProvider
          .getTables(args)
          .map((t) => {
            return { type: 'relation', value: t.name, desc: t };
          });
        completionItems.push(...tableCompletions);

        // fetch schemas if only a one-part prefix (or no prefix) was entered
        if (
          completions.incompleteReference === undefined ||
          completions.incompleteReference.references.length == 1
        ) {
          const args = completions.incompleteReference && {
            catalog: completions.incompleteReference.references[0],
          };
          const schemaCompletions: CompletionItem<Catalog, Schema, Table, Column>[] =
            metadataProvider.getSchemas(args).map((s) => {
              return { type: 'schema', value: s };
            });
          completionItems.push(...schemaCompletions);
        }

        // fetch catalogs if no prefix was entered
        if (completions.incompleteReference === undefined) {
          const catalogCompletions: CompletionItem<Catalog, Schema, Table, Column>[] =
            metadataProvider.getCatalogs().map((c) => {
              return { type: 'catalog', value: c };
            });
          completionItems.push(...catalogCompletions);
        }

        break;
      }
    }

    const snippets: CompletionItem<Catalog, Schema, Table, Column>[] = completions.snippets.map(
      (s) => {
        return { type: 'snippet', label: s.label, template: s.template };
      }
    );

    completionItems.push(...snippets);

    return completionItems;
  }
}
