import { Lineage, Table } from "../Lineage";
import { StatementContext } from "./SqlBaseParser";
import { TablePrimary, TablePrimaryIncomplete } from "..";
import { ExtractTablesVisitor } from "./ExtractTablesVisitor";
import { LineageVisitor } from "./LineageVisitor";
import { Cursor } from "./Cursor";
import _ from "lodash";

/**
 * Options available for SQL parser.
 */
export interface LineageParserOptions {
  /**
   * Whether double quoted identifiers are allowed. If `true` - then both double quotes and backticks can be used
   * to quote identifiers. String literals are quoted with single quotes only.
   * If `false` (default) - double quotes are used for string literals (as an alternative
   * to single quotes). Identifiers are quoted with backquotes.
   */
  doubleQuotedIdentifier?: boolean;
}

/**
 * SQL parse tree with available operations.
 */
export class SqlLineageParseTree {
  /**
   * Creates SQL parse tree from antlr StatementContext
   * @param tree StatementContext object which is the product of parsing SQL
   * @param cursor A representation of the cursor to look for in the query
   */
  constructor(public readonly tree: StatementContext, readonly cursor?: Cursor) {}

  /**
   * Extracts and returns all potentially used tables. Note that this method does not perform context
   * analysis and thus can return not only external tables used but also references to CTEs or subqueries
   * defined inside the query itself. But it is guaranteed that all external (to the query)
   * tables will be returned.
   * This method commonly used to analyse query and pre-fetch metadata for tables used.
   * @returns Tables used in query
   */
  getUsedTables(): { references: TablePrimary[]; incomplete: TablePrimaryIncomplete[] } {
    const visitor = new ExtractTablesVisitor(this.cursor);
    return this.tree.accept(visitor);
  }

  /**
   * Extracts column level lineage from SQL parse tree.
   * There are 2 principal modes that control lineage representation: "merged leaves" and "tree" (default).
   * - In "tree" mode (default) all source tables are displayed with all their columns and mentioned as many
   *   times as they occur in the query.
   * - In "mergedLeaves" mode source tables are mentioned only once even if they are used multiple times in
   *   the query. Source table columns that are not used in the query omitted from lineage.
   * @param getTable Function to get table metadata. It takes table identifier and returns some table data
   *    plus the list of columns for this table. Columns are expected to be in particular order as defined
   *    in this table's DDL.
   * @param mergedLeaves Selects mode for the lineage generation ("tree" (default) when `false`,
   * "mergedLeaves" when `true`).
   * @param options Lineage generation options:
   * - `positionalRefsEnabled` (`false` by default) options controls whether to interpret numerical references
   * inside ORDER BY as references to SELECT list expressions
   * @returns Calculated lineage.
   */
  getLineage<TableData, ColumnData>(
    getTable: (
      id: TablePrimary
    ) => { table: { id: string; data: TableData }; columns: { id: string; data: ColumnData }[] } | undefined = () =>
      undefined,
    mergedLeaves?: boolean,
    options?: {
      positionalRefsEnabled?: boolean;
    }
  ): Lineage<TableData, ColumnData> {
    const cursor = this.cursor;
    const fetchOp: typeof getTable = cursor !== undefined ? tp => getTable(cursor.removeFrom(tp)) : getTable;
    const visitor = new LineageVisitor<TableData, ColumnData>(fetchOp, options);
    this.tree.accept(visitor);
    const tables = visitor.tables;
    const edges = visitor.edges;

    const cleanedTables: Table<TableData, ColumnData>[] = [];

    // do lineage cleanup if mergedLeaves is true
    if (mergedLeaves) {
      // 1. remove duplicate table references from the list of tables
      const deduplicateTable: Map<string, string> = new Map();
      const usedTables: Map<string, string> = new Map();

      tables.forEach(t => {
        if (t.tablePrimary === undefined) {
          cleanedTables.push(t.table);
          return;
        }

        const key = JSON.stringify(t.tablePrimary);
        const entry = usedTables.get(key);
        if (entry !== undefined) {
          deduplicateTable.set(t.table.id, entry);
        } else {
          usedTables.set(key, t.table.id);
          t.table.label = t.tablePrimary.tableName;
          cleanedTables.push(t.table);
        }
      });

      // 2. remove references to duplicate tables from edges and collect used columns of tables
      const usedColumns: Map<string, string[]> = new Map();

      edges.forEach(e => {
        const remappedSourceTable = deduplicateTable.get(e.source.tableId);
        if (remappedSourceTable !== undefined) {
          e.source.tableId = remappedSourceTable;
        }
        if (e.source.columnId !== undefined) {
          const columns = usedColumns.get(e.source.tableId);
          if (columns !== undefined) {
            columns.push(e.source.columnId);
          } else {
            usedColumns.set(e.source.tableId, [e.source.columnId]);
          }
        }
      });

      // 3. leave only columns that are used in tables
      cleanedTables.forEach(t => {
        if (t.data !== undefined) {
          const tableColumns = usedColumns.get(t.id);
          t.columns = t.columns.filter(c => tableColumns?.includes(c.id));
        }
      });
    } else {
      tables.forEach(t => cleanedTables.push(t.table));
    }

    // used to filter tables that are sources for other tables
    const sourceTables: Set<string> = new Set();
    edges.forEach(e => {
      sourceTables.add(e.source.tableId);
    });
    cleanedTables.forEach(t => {
      if (!sourceTables.has(t.id)) t.isTargetOnly = true;
    });

    return {
      nodes: cleanedTables,
      edges
    };
  }
}
