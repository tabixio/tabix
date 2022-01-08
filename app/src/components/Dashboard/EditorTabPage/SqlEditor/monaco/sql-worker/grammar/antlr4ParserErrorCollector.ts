import { Recognizer, Token } from 'antlr4';

enum TypeError {
  LEXER = 'lexer',
  PARSER = 'parser',
}

export interface Antlr4ParserErrorCollector {
  type: TypeError;
  startLine: number;
  endLine: number;
  startCol: number;
  endCol: number;
  message: string;
  token: string | null;
}

export abstract class antlr4ParserErrorCollector {
  private _errors: Antlr4ParserErrorCollector[];
  private type: TypeError;

  constructor(type: TypeError) {
    this.type = type;
    this._errors = [];
  }

  public getErrors(): Antlr4ParserErrorCollector[] {
    return this._errors;
  }

  /**
   * Проверяет на синтаксические ошибки
   *
   * @param {object} recognizer Структура, используемая для распознавания ошибок [parser]
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
    charPositionInLine: number,
    msg: string,
    e: any
  ): void {
    let endCol: number = charPositionInLine + 1;
    let token: string | null = null;
    if (offendingSymbol && offendingSymbol.text !== null) {
      endCol = charPositionInLine + offendingSymbol.text.length;
      token = offendingSymbol.text;
    }
    console.error(`ERROR ${msg} at ${line}:${charPositionInLine}`, offendingSymbol, recognizer);

    this._errors.push({
      type: this.type,
      startLine: line,
      endLine: line,
      startCol: charPositionInLine,
      token: token,
      endCol: endCol,
      message: msg,
    });
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
    console.warn(`ERROR antlr4ParserErrorCollector->reportAmbiguity`, recognizer, dfa, configs);
  }

  reportAttemptingFullContext(
    recognizer: Recognizer,
    dfa: any,
    startIndex: number,
    stopIndex: number,
    conflictingAlts: any,
    configs: any
  ): void {
    console.warn(
      `ERROR antlr4ParserErrorCollector->reportAttemptingFullContext`,
      recognizer,
      dfa,
      configs
    );
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

export class antlr4ErrorLexer extends antlr4ParserErrorCollector {
  constructor() {
    super(TypeError.LEXER);
  }
}

export class antlr4ErrorParser extends antlr4ParserErrorCollector {
  constructor() {
    super(TypeError.LEXER);
  }
}
