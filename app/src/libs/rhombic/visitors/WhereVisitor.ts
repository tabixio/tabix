import { parser } from "../SqlParser";
import { BooleanExpressionContext, TableExpressionContext, WhereContext } from "../Context";
import { getChildrenRange } from "../utils/getChildrenRange";
import { Range } from "../utils/getRange";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

/**
 * Visitor to extract information about `WHERE` statement
 */
export class WhereVisitor extends Visitor {
  public tableRange?: Range;
  public booleanExpressionRange?: Range;
  public whereRange?: Range;

  public booleanExpressionNode?: BooleanExpressionContext;

  constructor() {
    super();
    this.validateVisitor();
  }

  tableExpression(ctx: TableExpressionContext) {
    // Register end of tableExpression as range as fallback
    const tableRange = getChildrenRange(ctx);
    this.tableRange = {
      startLine: tableRange.endLine,
      startColumn: tableRange.endColumn + 1,
      endColumn: tableRange.endColumn + 1,
      endLine: tableRange.endLine
    };
  }

  booleanExpression(ctx: BooleanExpressionContext) {
    this.booleanExpressionRange = getChildrenRange(ctx);
    this.booleanExpressionNode = ctx;
  }

  where(ctx: WhereContext) {
    this.whereRange = getChildrenRange(ctx);
    ctx.booleanExpression.map(i => this.booleanExpression(i.children));
  }
}
