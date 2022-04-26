import { ExpressionContext } from "../Context";
import { IToken } from "chevrotain";

type FunctionContext = {
  FunctionIdentifier: IToken[];
  LParen: IToken[];
  expression: Array<{
    name: "expression";
    children: ExpressionContext;
  }>;
  RParen: IToken[];
};

export const isFunctionContext = (ctx: ExpressionContext): ctx is FunctionContext =>
  Boolean((ctx as FunctionContext).FunctionIdentifier);
