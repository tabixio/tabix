import { ErrorListener } from 'antlr4/error';
import { Recognizer } from 'antlr4/Recognizer';
import { Token } from 'antlr4/Token';

// @ts-ignore VALID
export class ConsoleParserErrorListener implements ErrorListener {
  /**
   * Проверяет на синтаксические ошибки
   *
   * @param {object} recognizer Структура, используемая для распознавания ошибок
   * @param {object} symbol Символ, вызвавший ошибку
   * @param {int} line Строка с ошибкой
   * @param {int} column Позиция в строке
   * @param {string} message Текст ошибки
   * @param {string} payload Трассировка стека
   */
  syntaxError(
    recognizer: Recognizer,
    offendingSymbol: Token,
    line: number,
    column: number,
    msg: string,
    e: any
  ): void {
    console.error(`ERROR ${msg} at ${line}:${column}`, offendingSymbol, recognizer);
    // console.error(offendingSymbol.getText());
  }

  reportAmbiguity(
    recognizer: Recognizer,
    dfa: any,
    startIndex: number,
    stopIndex: number,
    exact: any,
    ambigAlts: any,
    configs: any
  ): void {
    console.info(`ERROR reportAmbiguity`);
  }

  reportAttemptingFullContext(
    recognizer: Recognizer,
    dfa: any,
    startIndex: number,
    stopIndex: number,
    conflictingAlts: any,
    configs: any
  ): void {
    console.info(`ERROR reportAttemptingFullContext`);
  }

  reportContextSensitivity(
    recognizer: Recognizer,
    dfa: any,
    startIndex: number,
    stopIndex: number,
    conflictingAlts: any,
    configs: any
  ): void {
    console.info(`ERROR reportContextSensitivity`);
  }
}
//
//
export class ParserError {
  startLine: number;

  endLine: number;

  startCol: number;

  endCol: number;

  message: string;

  constructor(
    startLine: number,
    endLine: number,
    startCol: number,
    endCol: number,
    message: string
  ) {
    this.startLine = startLine;
    this.endLine = endLine;
    this.startCol = startCol;
    this.endCol = endCol;
    this.message = message;
  }
}
//
// @ts-ignore VALID
export class CollectorParserErrorListener implements ErrorListener {
  private errors: ParserError[] = [];

  constructor(errors: ParserError[]) {
    this.errors = errors;
  }

  // @ts-ignore VALID
  syntaxError(recognizer, offendingSymbol, line, column, msg) {
    // @ts-ignore VALID
    let endColumn = column + 1;
    if (offendingSymbol._text !== null && offendingSymbol._text !== undefined) {
      endColumn = column + offendingSymbol._text.length;
    }
    this.errors.push(new ParserError(line, line, column, endColumn, msg));
  }
}
