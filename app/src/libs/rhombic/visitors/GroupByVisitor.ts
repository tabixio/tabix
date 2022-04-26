import { parser } from "../SqlParser";
import { GroupByContext } from "../Context";
import { getChildrenRange } from "../utils/getChildrenRange";
import { Range } from "../utils/getRange";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

/**
 * Visitor to extract information about `GROUP BY` statement
 */
export class GroupByVisitor extends Visitor {
  public groupByRange?: Range;

  constructor() {
    super();
    this.validateVisitor();
  }

  groupBy(ctx: GroupByContext) {
    this.groupByRange = getChildrenRange(ctx);
  }
}
