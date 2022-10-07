import { Recognizer, Token, ANTLRErrorListener, RecognitionException, Lexer } from 'antlr4ts';
import { Interval } from 'antlr4ts/misc/Interval';
import { ATNSimulator } from 'antlr4ts/atn/ATNSimulator';

enum TypeError {
  LEXER = 'lexer',
  PARSER = 'parser',
}

export interface antlrErrorList {
  type: TypeError;
  offset: number;
  line: number;
  charPosition: number;
  message: string;
  token: string | null;
  interval?: Interval;
}

export abstract class antlrErrorCollector implements ANTLRErrorListener<Token> {
  private _errors: antlrErrorList[];
  private type: TypeError;
  private lexer: Lexer;

  constructor(type: TypeError, lexer: Lexer) {
    this.type = type;
    this.lexer = lexer;
    this._errors = [];
  }

  public resetErrors(): void {
    this._errors = [];
  }

  public getErrors(): antlrErrorList[] {
    return this._errors;
  }

  syntaxError<Token>(
    recognizer: Recognizer<Token, any>,
    offendingSymbol: Token,
    line: number,
    charPositionInLine: number,
    message: string,
    e: RecognitionException | undefined
  ): void {
    // offendingToken is only defined for parser error listeners, so its safe to return here
    if (offendingSymbol) {
      return;
    }

    console.log('syntaxErrorsyntaxErrorsyntaxErrorsyntaxError');

    const input = this.lexer.inputStream;
    const interval = new Interval(this.lexer._tokenStartCharIndex, input.index);
    const text = this.lexer.getErrorDisplay(input.getText(interval)) || ' ';

    switch (text[0]) {
      case '/':
        message = 'Unfinished multiline comment';
        break;
      case '"':
        message = 'Unfinished double quoted string literal';
        break;
      case "'":
        message = 'Unfinished single quoted string literal';
        break;
      case '`':
        message = 'Unfinished back tick quoted string literal';
        break;
      default:
        // Hex or bin string?
        if (text.length > 1 && text[1] === "'" && (text.startsWith('x') || text.startsWith('b'))) {
          message = 'Unfinished ' + (text.startsWith('x') ? 'hex' : 'binary') + ' string literal';
        } else {
          // Something else the lexer couldn't make sense of (likely there is no rule that accepts this input).
          message = '"' + text + '" is no valid input at all';
        }
    }
    //
    // let endCol: number = charPositionInLine + 1;
    // let token: string | null = null;
    // if (offendingSymbol && offendingSymbol.text !== null) {
    //   endCol = charPositionInLine + offendingSymbol.text.length;
    //   token = offendingSymbol.text;
    // }
    // console.error(`ERROR ${msg} at ${line}:${charPositionInLine}`, offendingSymbol, recognizer);

    const er = {
      type: this.type,
      offset: input.index,
      line: line,
      charPosition: charPositionInLine, // drop
      token: text,
      interval: interval,
      message: message,
    };
    console.log(er);
    this._errors.push(er);
  }

  //
  // reportAmbiguity(
  //   recognizer: Recognizer,
  //   dfa: any,
  //   startIndex: number,
  //   stopIndex: number,
  //   exact: any,
  //   ambigAlts: any,
  //   configs: any
  // ): void {
  //   // console.info(`ERROR antlr4ParserErrorCollector->reportAmbiguity`); //, recognizer, dfa, configs);
  // }
  //
  // reportAttemptingFullContext(
  //   recognizer: Recognizer,
  //   dfa: any,
  //   startIndex: number,
  //   stopIndex: number,
  //   conflictingAlts: any,
  //   configs: any
  // ): void {
  //   // console.info(
  //   //   `ERROR antlr4ParserErrorCollector->reportAttemptingFullContext`
  //   // recognizer,
  //   // dfa,
  //   // configs
  //   // );
  // }
  //
  // reportContextSensitivity(
  //   recognizer: Recognizer,
  //   dfa: any,
  //   startIndex: number,
  //   stopIndex: number,
  //   conflictingAlts: any,
  //   configs: any
  // ): void {
  //   // console.info(`ERROR reportContextSensitivity`);
  // }
}

export class antlr4ErrorLexer extends antlrErrorCollector {
  constructor(lexer: Lexer) {
    super(TypeError.LEXER, lexer);
  }
}

export class ParserErrorListener implements ANTLRErrorListener<Token> {
  error: Array<string> | undefined;

  public getErrors(): antlrErrorList[] {
    return [];
  }

  syntaxError<T extends Token>(
    recognizer: Recognizer<T, ATNSimulator>,
    offendingToken: T | undefined,
    line: number,
    character: number,
    message: string,
    error: RecognitionException | undefined
  ): void {
    // offendingToken is only undefined for lexer error listeners, so its safe to return here
    if (!offendingToken) {
      return;
    }

    const expected = recognizer.atn.getExpectedTokens(recognizer.state, error?.context);

    // console.log('syntaxError', expected);
    // const expectedTokens = intervalToArray(expected, recognizer.vocabulary)
    // const errorMessage = getErrorMessage(error, message, expectedTokens, offendingToken)

    // this.error = new ParserError(errorMessage, {
    //   offendingToken: offendingToken ?? null,
    //   expectedTokens,
    //   character,
    //   line
    // })
  }
}

export class antlr4ErrorParser extends antlrErrorCollector {
  constructor(lexer: Lexer) {
    super(TypeError.PARSER, lexer);
  }
}
