import { QToken } from './grammar/CommonSQL';
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

  public getDatabase(offset: number): string {
    return '';
    //
    //
    //
  }

  public getTables(offset: number): Array<string> | undefined {
    if (this.parsedQuery) {
      return this.parsedQuery?.getTablesNames(offset);
    }
    return undefined;
  }

  public getSuggestions(offset: number, structure: ServerStructure.Server): Array<string> {
    if (!this.parsedQuery) return [];
    const $table = this.getTables(offset);
    console.error('$table', $table);
    return [];
  }

  public getTokens(): Array<QToken> | undefined {
    return this.parsedQuery?.getTokens();
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
