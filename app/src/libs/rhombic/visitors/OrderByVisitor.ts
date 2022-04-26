import { parser } from "../SqlParser";
import { OrderItemContext, SelectContext } from "../Context";
import { getImageFromChildren } from "../utils/getImageFromChildren";
import { getChildrenRange } from "../utils/getChildrenRange";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

interface OrderItem {
  expression: string;
  order?: "asc" | "desc";
  nullsOrder?: "first" | "last";
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

/**
 * Visitor to extract information about `ORDER BY` statement
 */
export class OrderByVisitor extends Visitor {
  public output: OrderItem[] = [];
  /**
   * Position to insert an ORDER BY statement
   */
  public insertLocation?: { line: number; column: number };

  constructor() {
    super();
    this.validateVisitor();
  }

  orderItem(ctx: OrderItemContext) {
    const range = getChildrenRange(ctx);
    const item: OrderItem = {
      expression: getImageFromChildren(ctx.expression[0].children),
      ...range
    };

    if (ctx.Asc) item.order = "asc";
    if (ctx.Desc) item.order = "desc";
    if (ctx.First) item.nullsOrder = "first";
    if (ctx.Last) item.nullsOrder = "last";

    this.output.push(item);
  }

  select(ctx: SelectContext) {
    const range = getChildrenRange(ctx);
    this.insertLocation = {
      line: range.endLine,
      column: range.endColumn
    };
  }
}
