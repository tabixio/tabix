import { QToken, ResultQueryStructure } from './grammar/CommonSQL';
import { ParsedQuery } from './grammar';
import { ServerStructure } from '../../../../../../services';

export class ModelOfEditor {
  //
  private modelUri: string;
  private parsedQuery?: ParsedQuery;
  private ready = false;

  constructor(modelUri: string) {
    //
    this.modelUri = modelUri;
    console.info('Create ModelOfEditor');
  }

  public process(q: ParsedQuery | null) {
    if (!q) return;
    this.parsedQuery = q;
    this.ready = true;
  }

  public getToken(offset: number): QToken | null {
    return null;
  }

  public getHover(offset: number): string {
    if (!this.parsedQuery) return '';

    let str = '';
    // str += 'Offset:' + offset + '\n\n';
    str += '' + this.parsedQuery.info(offset) + '\n\n';
    // str += 'SizeStmt:' + this.parsedQuery.getCountOfStmt() + `\n`;
    // str += 'SizeStmt:' + this.parsedQuery.getStmtOnOffset(offset) + `\n`;
    str += '';
    return str;
  }

  public getStructureData(offset: number): ResultQueryStructure | undefined {
    return this.parsedQuery?.getStructureData(offset);
  }

  public getDatabase(offset: number): string {
    return '';
  }

  public getTables(offset: number): Array<string> | undefined {
    if (this.parsedQuery) {
      return this.parsedQuery?.getTablesNames(offset);
    }
    return undefined;
  }

  public getSuggestions(
    offset: number,
    structure: ServerStructure.Server
  ): Array<{ label: string; detail: string }> {
    if (!this.parsedQuery) return [];
    const $sd = this.getStructureData(offset);
    console.info('$tables ', $sd?.tables, $sd?.columns);
    // ------------------------------------------------------------------------------------------------
    const result: Array<{ label: string; detail: string }> = [];
    const addedCols: Array<string> = [];
    // ------------------------------------------------------------------------------------------------
    structure.databases.forEach((db: ServerStructure.Database) => {
      const existsDb = $sd?.databases.find((d) => d.name === db.name);
      if (!existsDb) return;

      db.tables.forEach((table: ServerStructure.Table) => {
        const existsTb = $sd?.tables.find((d) => d.name === table.name);
        if (!existsTb) return;
        table.columns.forEach((col) => {
          addedCols.push(col.name);
          result.push({
            label: col.name,
            detail: `${col.type} in ${col.table}`,
          });
        });
        // All fields by one table
        result.push({
          label: table.columns.map((d) => d.name).join(`,\n`) + `\n`,
          detail: `All in ${table.name}`,
        });
      });
    });
    // ------------------------------------------------------------------------------------------------
    console.log(addedCols);
    $sd?.columns.forEach((c) => {
      if (addedCols && addedCols.indexOf(c.name) > -1) {
        return;
      }
      addedCols.push(c.name);
      result.push({
        label: c.name,
        detail: `${c.name} in ${c.deep}`,
      });
    });
    console.log(result);
    return result;
  }

  public validate(): void {
    // current editor sql=getValue();
    // const syntaxErrors = validate({ lexer, parser, initialRule })(editor.getValue());
    // const monacoErrors = [];
    // for (const e of syntaxErrors) {
    //   monacoErrors.push({
    //     startLineNumber: e.startLine,
    //     startColumn: e.startCol,
    //     endLineNumber: e.endLine,
    //     endColumn: e.endCol,
    //     message: e.message,
    //     severity: monaco.MarkerSeverity.Error,
    //   });
    // }
    // const errorsString = monacoErrors.map(e => e.message).reduce((e1, e2) => e1 + ", " + e2, "");
    // if (editor.getValue()) {
    //   setErrors([]);
    //   errors = { value: "" };
    // } else if (errorsString !== errors.value) {
    //   setErrors(monacoErrors);
    //   errors = { value: errorsString };
    // }
    // window.syntaxErrors = syntaxErrors;
    // const model = monaco.editor.getModels()[0];
    // monaco.editor.setModelMarkers(model, "owner", monacoErrors);
    // editor.onDidChangeModelContent(() => {
    //             if (to) clearTimeout(to);
    //             return onDidChangeTimout();
    //         });
    //         editor.onDidChangeCursorPosition((e: monaco.editor.ICursorPositionChangedEvent) =>
    //             setCursorPosition(e.position),
    //         );
  }
}
