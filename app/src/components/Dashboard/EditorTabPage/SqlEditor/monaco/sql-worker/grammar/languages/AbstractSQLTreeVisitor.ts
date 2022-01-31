import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { QToken, QueryRelation, Range } from '../CommonSQL';
import { Token } from 'antlr4ts';

export abstract class AbstractSQLTreeVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  protected relationSeq = 0;
  private debug = false;
  protected currentRelation = new QueryRelation(this.getNextRelationId());

  getNextRelationId(): string {
    return `result_${this.relationSeq++}`;
  }

  public lastRelation: QueryRelation | undefined;
  protected tokensCurrentPoints: Map<string, number> = new Map();

  abstract visitNode(ctx: RuleNode): void;

  protected tokensList: Array<QToken> = [];

  // abstract getCurrentRelation(): void;

  public setTokenList(tokensList: Array<QToken>): void {
    this.tokensList = tokensList;
  }

  public getTokens(): Array<QToken> {
    return this.tokensList;
  }

  public log(...args: any[]) {
    if (this.debug) {
      console.log(...args);
    }
  }

  public unquote(text?: string): string {
    if (!text) {
      return '';
    }

    if (text.length < 2) {
      return text;
    }

    if (
      text.startsWith('"') ||
      text.startsWith('`') ||
      (text.startsWith("'") && text.startsWith(text[text.length - 1]))
    ) {
      return text.substr(1, text.length - 2);
    }

    return text;
  }

  public applyToken(start: Token, stop: Token, type: string) {
    this.tokensList.forEach((tok: QToken, index) => {
      if (
        start &&
        stop &&
        tok.tokenIndex >= start.tokenIndex &&
        tok.tokenIndex <= stop.tokenIndex
      ) {
        this.tokensList[index].context.push(type);
      }
    });
  }

  public visitChildren(ctx: RuleNode): Result {
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

  public getCurrentRelation(): void {
    console.log('getCurrentRelationgetCurrentRelationgetCurrentRelationgetCurrentRelation');
    console.log(this.lastRelation);
    if (this.lastRelation) {
      this.availableColumns(this.lastRelation);
    }
  }

  public availableColumns(relation: QueryRelation): void {
    const columns: { relation?: string; name: string; rrange?: Range; range?: Range }[] = [];

    relation.relations.forEach((rel, name) => {
      const relationName = name !== rel.id ? name : undefined;

      rel.columns.forEach((col) => {
        columns.push({
          relation: relationName,
          name: col.label,
          range: col.range,
          rrange: relation.range,
        });
      });
    });
    console.log('Cols:', columns);
  }
}
