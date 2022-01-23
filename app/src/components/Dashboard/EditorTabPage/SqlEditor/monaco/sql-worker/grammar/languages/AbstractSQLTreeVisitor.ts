import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { QToken } from '../CommonSQL';

export abstract class AbstractSQLTreeVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  abstract visitNode(ctx: RuleNode): void;

  private tokensList: Array<QToken> = [];

  abstract getCurrentRelation(): void;

  public setTokenList(tokensList: Array<QToken>): void {
    this.tokensList = tokensList;
  }

  visitChildren(ctx: RuleNode): Result {
    if (!ctx) {
      return {} as Result;
    }
    this.visitNode(ctx);
    for (let i = 0; i < ctx.childCount; i++) {
      const child = ctx.getChild(i);
      if (child && child.childCount) {
        child.accept(this);
      } else {
        //if (child && !child.children) {
        // visitor.visitNode(child);
        //}
      }
    }
    return {} as Result;
  }
}
