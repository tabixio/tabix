import { BooleanExpressionContext } from "../Context";
import { IToken } from "chevrotain";

type OrAndContext = BooleanExpressionContext & {
  // booleanExpression is always there if a `And` or `Or` is present
  booleanExpression: Array<{
    name: "booleanExpression";
    children: BooleanExpressionContext;
  }>;
};

/**
 * Type guard for the case of booleanExpression with `And` or `Or` present.
 *
 * @param ctx BooleanExpressionContext
 */
export const isAndOrContext = (ctx: BooleanExpressionContext): ctx is OrAndContext => Boolean(ctx.And || ctx.Or);

type ParenthesesContext = BooleanExpressionContext & {
  LParen: IToken[];
  booleanExpression: Array<{
    name: "booleanExpression";
    children: BooleanExpressionContext;
  }>;
  RParen: IToken[];
};

/**
 * Type guard to check if the expression has parentheses.
 *
 * @param ctx BooleanExpressionContext
 */
export const isParenthesesContext = (ctx: BooleanExpressionContext): ctx is ParenthesesContext =>
  Boolean((ctx as ParenthesesContext).LParen);
