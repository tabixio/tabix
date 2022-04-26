import { CstChildrenDictionary, createToken, Lexer, CstParser, IToken } from "chevrotain";
import { isCstNode } from "./isCstNode";

/**
 * Pretty output for cst for easy specifications
 *
 * @param cst
 */
export function prettifyCst(cst: CstChildrenDictionary) {
  let output = "";
  Object.entries(cst).forEach(([_, elements]) => {
    elements.forEach((node, i, nodes) => {
      if (isCstNode(node)) {
        output += node.name + "(" + prettifyCst(node.children) + ")";
      } else {
        if (i === 0 && node.tokenType) output += node.tokenType.tokenName;
        if (i === 0) output += "(";
        output += `"${node.image}"`;
        if (i === nodes.length - 1) output += ")";
        else output += ",";
      }
    });
  });
  return output;
}

/**
 * Indent the prettify version of the cst for more visibility
 *
 * @param cst output of `prettifyCst()`
 */
export function formatCst(prettifiedCst: string) {
  const lexResult = PrettyCstLexer.tokenize(prettifiedCst);
  parser.input = lexResult.tokens;

  const cst = parser.node();

  if (parser.errors.length + lexResult.errors.length > 0) {
    throw new Error(
      `PrettifyCst Error: \n - ${[...parser.errors.map(i => i.message), ...lexResult.errors.map(i => i.message)].join(
        "\n - "
      )}`
    );
  }
  const visitor = new PrettyCstVisitor();
  visitor.visit(cst);

  return visitor.output
    .split("\n")
    .filter(i => i)
    .join("\n");
}

// Lexer/Parser/Visitor to support `formatCst()`
const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_]+/
});
const Value = createToken({
  name: "Value",
  pattern: /((""[^"\\]*(?:\\.[^"\\]*)*(""))+)|(("[^"\\]*(?:\\.[^"\\]*)*("))+)/
});
const LParen = createToken({ name: "LParen", pattern: /\(/ });
const RParen = createToken({ name: "RParen", pattern: /\)/ });
const Comma = createToken({ name: "Comma", pattern: /,/ });
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});
const allTokens = [WhiteSpace, Identifier, Value, LParen, RParen, Comma];
const PrettyCstLexer = new Lexer(allTokens, {
  lineTerminatorCharacters: ["\n"]
});

class PrettyCstParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public node = this.RULE("node", () => {
    this.CONSUME(Identifier);
    this.CONSUME(LParen);
    this.OR([
      {
        ALT: () => {
          // Should be `AT_LEAST_ONE_SEP` but strange error with chevrotain…
          // this.AT_LEAST_ONE_SEP({
          //   DEF: () => this.CONSUME(Value),
          //   SEP: Comma
          // });
          this.CONSUME(Value);

          this.OPTION(() => {
            this.CONSUME(Comma);
            this.CONSUME1(Value);
          });
          this.OPTION1(() => {
            this.CONSUME1(Comma);
            this.CONSUME2(Value);
          });
          this.OPTION2(() => {
            this.CONSUME2(Comma);
            this.CONSUME3(Value);
          });
          this.OPTION3(() => {
            this.CONSUME3(Comma);
            this.CONSUME4(Value);
          });
        }
      },
      { ALT: () => this.AT_LEAST_ONE(() => this.SUBRULE(this.node)) }
    ]);
    this.CONSUME(RParen);
  });
}

const parser = new PrettyCstParser();

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

interface NodeContext {
  Identifier: IToken[];
  LParen: IToken[];
  Value?: IToken[];
  Comma?: IToken[];
  node?: Array<{
    name: "node";
    children: NodeContext;
  }>;
  RParen: IToken[];
}

class PrettyCstVisitor extends Visitor {
  public output = "";
  private indent = "";

  constructor() {
    super();
    this.validateVisitor();
  }

  node(ctx: NodeContext) {
    this.output += this.indent + ctx.Identifier[0].image + ctx.LParen[0].image;

    if (ctx.Value) {
      this.output += ctx.Value.map(v => v.image).join(", ") + ctx.RParen[0].image + "\n";
    } else if (ctx.node) {
      this.output += "\n";
      this.indent += "  ";
      ctx.node.forEach(i => this.node(i.children));
      this.output += "\n";
      this.indent = this.indent.slice(0, -2);
      this.output += this.indent + ctx.RParen[0].image + "\n";
    }
  }
}
