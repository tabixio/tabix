import { Token, Recognizer } from 'antlr4';
import { ErrorListener } from 'antlr4/error';

export interface ParserError {
  startLine: number;
  endLine: number;
  startCol: number;
  endCol: number;
  message: string;
}

export interface SyntaxError {
  recognizer: Recognizer;
  offendingSymbol: Token;
  line: number;
  charPositionInLine: number;
  msg: string;
  e: any;
}

export type ErrorHandler = (err: ParserError, errOption: SyntaxError) => void;

export class ParserErrorCollector extends ErrorListener {
  private _errors: ParserError[];

  constructor(error: ParserError[]) {
    super();
    this._errors = error;
  }

  syntaxError(
    recognizer: Recognizer,
    offendingSymbol: Token,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: any
  ) {
    let endCol = charPositionInLine + 1;
    if (offendingSymbol && offendingSymbol.text !== null) {
      endCol = charPositionInLine + offendingSymbol.text.length;
    }
    this._errors.push({
      startLine: line,
      endLine: line,
      startCol: charPositionInLine,
      endCol,
      message: msg,
    });
  }
}

export default class ParserErrorListener extends ErrorListener {
  private _errorHandler: any;

  constructor(errorListener?: ErrorHandler) {
    super();
    this._errorHandler = errorListener;
  }

  syntaxError(
    recognizer: Recognizer,
    offendingSymbol: Token,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: any
  ) {
    let endCol = charPositionInLine + 1;
    if (offendingSymbol && offendingSymbol.text !== null) {
      endCol = charPositionInLine + offendingSymbol.text.length;
    }
    if (this._errorHandler) {
      this._errorHandler(
        {
          startLine: line,
          endLine: line,
          startCol: charPositionInLine,
          endCol,
          message: msg,
        },
        {
          e,
          line,
          msg,
          recognizer,
          offendingSymbol,
          charPositionInLine,
        }
      );
    }
  }
}
