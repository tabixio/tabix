import { parser } from "../SqlParser";
import { SelectContext } from "../Context";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

/**
 * Visitor to check if the statement has a `FROM`
 */
export class HasFromVisitor extends Visitor {
  public hasFrom = false;

  constructor() {
    super();
    this.validateVisitor();
  }

  select(ctx: SelectContext) {
    if (ctx.From) {
      this.hasFrom = true;
    }
  }
}
