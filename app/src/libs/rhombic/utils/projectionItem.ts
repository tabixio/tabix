import { ProjectionItemContext, ExpressionContext } from "../Context";
import { IToken } from "chevrotain";

type ProjectionAsteriskContext = { Asterisk: IToken[] };
type ProjectionExpressionContext = {
  expression: Array<{
    name: "expression";
    children: ExpressionContext;
  }>;
  As?: IToken[];
  Identifier?: IToken[];
};

export const isAsteriskContext = (ctx: ProjectionItemContext): ctx is ProjectionAsteriskContext =>
  Boolean((ctx as ProjectionAsteriskContext).Asterisk);

export const isExpressionContext = (ctx: ProjectionItemContext): ctx is ProjectionExpressionContext =>
  Boolean((ctx as ProjectionExpressionContext).expression);
