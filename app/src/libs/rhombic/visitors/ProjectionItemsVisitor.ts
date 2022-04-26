import { parser } from "../SqlParser";
import {
  ProjectionItemContext,
  ProjectionItemsContext,
  CastContext,
  OrderItemContext,
  OrderByContext,
  ColumnPrimaryContext,
  ExpressionContext
} from "../Context";
import { IToken, CstElement, CstNode } from "chevrotain";
import { getImageFromChildren } from "../utils/getImageFromChildren";
import { getChildrenRange } from "../utils/getChildrenRange";
import { isCstNode } from "../utils/isCstNode";
import { isAsteriskContext, isExpressionContext } from "../utils/projectionItem";
import { isFunctionContext } from "../utils/expression";
import { Range } from "../utils/getRange";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

interface CstCastNode extends Omit<CstNode, "children"> {
  readonly name: "cast";
  readonly children: CastContext;
}

function ifCastNode(node: CstElement): CstCastNode | null {
  return isCstNode(node) && node.name === "cast" ? ((node as unknown) as CstCastNode) : null;
}

interface CstColumnPrimaryNode extends Omit<CstNode, "children"> {
  readonly name: "columnPrimary";
  readonly children: ColumnPrimaryContext;
}

function ifColumnPrimaryNode(node: CstElement): CstColumnPrimaryNode | null {
  return isCstNode(node) && node.name === "columnPrimary" ? ((node as unknown) as CstColumnPrimaryNode) : null;
}

function isExpressionContextColumnBranch(
  ctx: ExpressionContext
): ctx is {
  columnPrimary: CstColumnPrimaryNode[];
} {
  return Boolean(
    (ctx as {
      columnPrimary: CstColumnPrimaryNode[];
    }).columnPrimary
  );
}

function getColumnPrimaryPath(columnPrimary: CstColumnPrimaryNode) {
  switch (columnPrimary.children.Identifier.length) {
    case 1:
      return { columnName: columnPrimary.children.Identifier[0].image };
    case 2:
      return {
        tableName: columnPrimary.children.Identifier[0].image,
        columnName: columnPrimary.children.Identifier[1].image
      };
    case 3:
      return {
        schemaName: columnPrimary.children.Identifier[0].image,
        tableName: columnPrimary.children.Identifier[1].image,
        columnName: columnPrimary.children.Identifier[2].image
      };
    case 4:
      return {
        catalogName: columnPrimary.children.Identifier[0].image,
        schemaName: columnPrimary.children.Identifier[1].image,
        tableName: columnPrimary.children.Identifier[2].image,
        columnName: columnPrimary.children.Identifier[3].image
      };
  }
  throw new Error("columnPrimary can't be parsed");
}

/**
 * Visitor to extract `projectionItem` list
 */
export class ProjectionItemsVisitor extends Visitor {
  public output: Array<{
    range: Range;
    isAsterisk: boolean;
    expression: string;
    path?: {
      catalogName?: string;
      schemaName?: string;
      tableName?: string;
      columnName: string;
    };
    alias?: string;
    cast?: {
      value: string;
      type: string;
    };
    fn?: {
      identifier: string;
      values: {
        expression: string;
        path?: {
          catalogName?: string;
          schemaName?: string;
          tableName?: string;
          columnName: string;
        };
      }[];
    };
    sort?: {
      order: "asc" | "desc";
      nullsOrder?: "first" | "last";
    };
  }> = [];

  public sort: Array<{
    expression: string;
    expressionRange: Range;
    order?: "asc" | "desc";
    nullsOrder?: "first" | "last";
  }> = [];

  public sortRange: Range | undefined;

  public commas: IToken[] = [];

  public asteriskCount = 0;

  constructor() {
    super();
    this.validateVisitor();
  }

  projectionItems(ctx: ProjectionItemsContext) {
    if (ctx.Comma) {
      this.commas.push(...ctx.Comma);
    }
    ctx.projectionItem.map(i => this.projectionItem(i.children));
  }

  cast(ctx: CastContext) {
    return {
      value: getImageFromChildren(ctx.expression[0].children),
      type: getImageFromChildren(ctx.type[0].children)
    };
  }

  orderBy(ctx: OrderByContext) {
    this.sortRange = getChildrenRange(ctx);
    ctx.orderItem.forEach(i => this.orderItem(i.children));
  }

  orderItem(ctx: OrderItemContext) {
    const expression = getImageFromChildren(ctx.expression[0].children);
    const expressionRange = getChildrenRange(ctx.expression[0].children);
    const sort: {
      order?: "asc" | "desc";
      nullsOrder?: "first" | "last";
    } = {};

    if (ctx.Desc) sort.order = "desc";
    if (ctx.Asc) sort.order = "asc";
    if (ctx.First) sort.nullsOrder = "first";
    if (ctx.Last) sort.nullsOrder = "last";

    this.output = this.output.map(i =>
      i.expression === expression || i.alias === expression
        ? {
            ...i,
            sort: {
              ...sort,
              order: sort.order || "asc"
            }
          }
        : i
    );
    this.sort.push({ expression, expressionRange, ...sort });
  }

  projectionItem(ctx: ProjectionItemContext) {
    let isAsterisk = false;
    let cast: { value: string; type: string } | undefined;
    let fn:
      | {
          identifier: string;
          values: {
            expression: string;
            path?: {
              catalogName?: string;
              schemaName?: string;
              tableName?: string;
              columnName: string;
            };
          }[];
        }
      | undefined;
    let expression = "";
    let path:
      | {
          catalogName?: string;
          schemaName?: string;
          tableName?: string;
          columnName: string;
        }
      | undefined;
    let alias: string | undefined;

    if (isExpressionContext(ctx)) {
      ctx.expression.forEach(i => {
        // Extract `fn` information
        if (isFunctionContext(i.children)) {
          fn = {
            identifier: i.children.FunctionIdentifier[0].image,
            values: i.children.expression.map(exp => ({
              path: isExpressionContextColumnBranch(exp.children)
                ? getColumnPrimaryPath(exp.children.columnPrimary[0])
                : undefined,
              expression: getImageFromChildren(exp.children)
            }))
          };
        }

        Object.values(i.children).forEach(j => {
          // eslint-disable-next-line
          j.map((token: CstElement) => {
            const castNode = ifCastNode(token);
            if (castNode) {
              cast = this.cast(castNode.children);
              fn = {
                identifier: castNode.children.Cast[0].image,
                values: castNode.children.expression.map(exp => ({
                  path: isExpressionContextColumnBranch(exp.children)
                    ? getColumnPrimaryPath(exp.children.columnPrimary[0])
                    : undefined,
                  expression: getImageFromChildren(exp.children)
                }))
              };
            }
            const columnPrimary = ifColumnPrimaryNode(token);
            if (columnPrimary) {
              path = getColumnPrimaryPath(columnPrimary);
            }
          });
        });
      });

      // Extract `expression`
      expression = getImageFromChildren(ctx.expression.reduce((mem, i) => ({ mem, ...i.children }), {}));
    }

    if (isAsteriskContext(ctx)) {
      this.asteriskCount++;
      isAsterisk = true;
    }

    if (isExpressionContext(ctx) && ctx.As && ctx.Identifier) {
      alias = ctx.Identifier[ctx.Identifier.length - 1].image;
    }

    this.output.push({
      range: getChildrenRange(ctx),
      isAsterisk,
      alias,
      cast,
      fn,
      expression,
      path
    });
  }
}
