import { antlr4ErrorLexer, antlr4ErrorParser } from './antlr4ParserErrorCollector';
import { Token } from 'antlr4/Token';
import { SupportLanguage } from '../supportLanguage';
import ClickhouseSQL from './languages/ClickhouseSQL';
import IBaseAntlr4 from './languages/IBaseLanguage';
import * as monaco from 'monaco-editor';
import { RuleNode } from 'antlr4/tree/Tree';
import { ParsedQuery } from './ParsedQuery';

export interface QToken {
  points: Map<string, number>;
  counter: Map<string, number | undefined>;
  exception: Array<string>;
  invokingState: Map<string, number>;
  ruleIndex: Map<string, number>;
  channel: number;
  column: number;
  line: number;
  start: number;
  stop: number;
  tokenIndex: number;
  type: number;
  text: string;
  symbolic: string;
}

const nodeVisitor = <Result = void>(visitor: { visitNode: (node: RuleNode) => void }): any => ({
  visit: () => {
    //
  },
  visitTerminal: (node: any) => {
    // if (!node) { return; } console.info('child > > > ', node);
  },
  visitErrorNode: () => {
    //
  },
  visitChildren(node: any) {
    if (!node) {
      return;
    }
    visitor.visitNode(node);
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (child && child.children) {
        child.accept(this);
      } else {
        if (child && !child.children) {
          // visitor.visitNode(child);
        }
      }
    }
  },
});

export default class CommonSQL {
  private language: SupportLanguage;
  private baseAntlr4: IBaseAntlr4;

  constructor(language: SupportLanguage) {
    this.language = language;
    // @TODO: Support other language
    this.baseAntlr4 = new ClickhouseSQL();
  }

  // https://github.com/segmentio/ts-mysql-plugin
  /**
   * Parse one/many query
   *
   * @param input String query
   */
  public parse(input: string): ParsedQuery | null {
    const lexer = this.baseAntlr4.createLexer(input + '\n');
    const parser = this.baseAntlr4.createParser(lexer);
    const tokensList: Array<QToken> = [];
    console.info(input);
    const errP = new antlr4ErrorParser();
    const errL = new antlr4ErrorLexer();
    try {
      parser.buildParseTrees = true;
      parser.removeErrorListeners();
      lexer.addErrorListener(errL);
      parser.addErrorListener(errL);
      const tokens: Token[] = lexer.getAllTokens();
      lexer.reset();
      const proc = this.baseAntlr4.configuration().topStatements;
      const tree = parser[proc]();
      // --------- Base End
      const current_points: Map<string, number> = new Map();
      // @ts-ignore
      const symbolicNames = parser.getSymbolicNames();
      // ------ fetch QTok ------------------------------------------------------------

      tokens.forEach((tok: Token, index) => {
        tokensList.push({
          points: new Map(),
          counter: new Map(),
          exception: [],
          invokingState: new Map(),
          ruleIndex: new Map(),
          channel: tok.channel,
          column: tok.column,
          line: tok.line,
          start: tok.start,
          stop: tok.stop,
          tokenIndex: index,
          type: tok.type,
          text: tok.text,
          symbolic: symbolicNames[tok.type],
        });
      });
      // ParseTreeVisitor
      tree.accept(
        nodeVisitor({
          visitNode(ctx: any) {
            const name: string = ctx.constructor.name;
            let start: Token | null = null;
            let stop: Token | null = null;
            if (ctx.symbol) {
              start = ctx.symbol;
              stop = ctx.symbol;
            }
            if (ctx.start && ctx.stop) {
              start = ctx.start;
              stop = ctx.stop;
            }
            let exception = false;
            let invokingState = -1;
            let ruleIndex = -1;
            if (ctx.invokingState) {
              invokingState = ctx.invokingState;
            }
            if (ctx.ruleIndex) {
              ruleIndex = ctx.ruleIndex;
            }
            if (ctx.exception) {
              exception = true;
            }
            if (!start || !stop) {
              console.warn('EMPTY TAG`s', name, ctx, start, stop);
              return;
            }
            current_points.set(name, (current_points.get(name) ?? 0) + 1);
            // console.info('CXT', name, ctx, current_points);
            if (start && stop) {
              tokensList.forEach((tok: QToken, index) => {
                if (
                  start &&
                  stop &&
                  tok.tokenIndex >= start.tokenIndex &&
                  tok.tokenIndex <= stop.tokenIndex
                ) {
                  // map.set("a", (map.get("a") ?? 0) + 1)
                  tokensList[index].points.set(name, (tokensList[index].points.get(name) ?? 0) + 1);
                  tokensList[index].counter.set(name, current_points.get(name));

                  if (exception) {
                    tokensList[index].exception.push(name);
                  }
                  if (invokingState >= 0) {
                    tokensList[index].invokingState.set(name, invokingState);
                  }
                  if (ruleIndex >= 0) {
                    tokensList[index].ruleIndex.set(name, ruleIndex);
                  }
                } // if in `token`
              }); // tokensList loop
            } // have start & stop
          }, // visitNode
        }) // nodeVisitor
      ); // accept
      // ------------------------------------------------------------------------------------------------
      // ALL OK!
      //
    } catch (e) {
      console.error('CommonSQL -> parse()', e);
      return null;
    }
    return new ParsedQuery(tokensList, errL.getErrors(), errP.getErrors());
  }

  /**
   * Result ParserRuleContext
   *
   */
  public parseDefault(): ParsedQuery | null {
    return this.parse(
      'SELECT DISTINCT sin(x) as si,cos(x) as co, (si+co) as pi, user_name FROM system.users WHERE user_name LIKE "%bad%" ORDER BY user_id LIMIT 40,12' +
        // 'SELECT sin(x) as si,cos(x) as co, (si+co) as pi;' +
        '\n' +
        'SELECT pings as pinga2a'
      // '\n\n' +
      // 'DROP TABLE sy.swqws;SELECT 1 as wewe'
    );
  }

  /**
   * Monaco editing configuration for the language
   */
  public getLanguageConfiguration(): monaco.languages.LanguageConfiguration {
    return this.baseAntlr4.getLanguageConfiguration();
  }

  /**
   * Monaco editing configuration for the language
   */
  public getIMonarchLanguage(): monaco.languages.IMonarchLanguage {
    return this.baseAntlr4.getIMonarchLanguage();
  }

  //
  // public getParser(): antlr4.Parser {
  //   if (!this._parser) throw 'Error not set Parser';
  //   return this._parser;
  // }
  //
  // public getLexer(): antlr4.Lexer {
  //   if (!this._lexer) throw 'Error not set Lexer';
  //   return this._lexer;
  // }
  //
  // public getSymbolicNames(): any {
  //   const parser = this.getParser();
  //   // @ts-ignore
  //   parser.symbolicNames?.forEach((ruleName, index) => {
  //     // @ts-ignore
  //     const lit = parser.literalNames[index];
  //     // -- // --
  //     // console.log(index, ruleName, lit)
  //     // if (ruleName in lexer) {
  //     //  const index = lexer[ruleName as keyof typeof lexer];
  //   });
  // }
}
