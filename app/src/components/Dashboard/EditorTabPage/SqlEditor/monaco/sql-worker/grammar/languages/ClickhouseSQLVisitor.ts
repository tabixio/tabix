import { AbstractSQLTreeVisitor } from './AbstractSQLTreeVisitor';
import { ClickHouseParserVisitor } from './CHSql';
import {
  ColumnIdentifierContext,
  WhereClauseContext,
  GroupByClauseContext,
  WithClauseContext,
  HavingClauseContext,
  FromClauseContext,
  OrderByClauseContext,
  WindowClauseContext,
  PrewhereClauseContext,
  LimitByClauseContext,
  LimitClauseContext,
  SettingsClauseContext,
} from './CHSql/ClickHouseParser';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Token } from 'antlr4ts';

export class ClickhouseSQLVisitor<Result>
  extends AbstractSQLTreeVisitor<Result>
  implements ClickHouseParserVisitor<Result>
{
  visitColumnIdentifier(ctx: ColumnIdentifierContext): Result {
    const tableName: string | undefined = ctx.tableIdentifier()?.identifier().text;
    const colName: string | undefined = ctx.nestedIdentifier()?.text;

    console.log(`ColumnIdentifier: ${tableName} . ${colName}`);

    const result = this.visitChildren(ctx);
    return result;
  }

  visitNode(ctx: RuleNode) {
    const name: string = ctx.constructor.name;
    const start: Token | null = null;
    const stop: Token | null = null;
    //
    // if (ctx.symbol) {
    //   start = ctx.symbol;
    //   stop = ctx.symbol;
    // }
    // if (ctx.start && ctx.stop) {
    //   start = ctx.start;
    //   stop = ctx.stop;
    // }
    // let exception = false;
    // let invokingState = -1;
    // let ruleIndex = -1;
    // if (ctx.invokingState) {
    //   invokingState = ctx.invokingState;
    // }
    // if (ctx.ruleIndex) {
    //   ruleIndex = ctx.ruleIndex;
    // }
    // if (ctx.exception) {
    //   exception = true;
    // }
    // if (!start || !stop) {
    //   console.warn('EMPTY TAG`s', name, ctx, start, stop);
    //   return;
    // }
    //   current_points.set(name, (current_points.get(name) ?? 0) + 1);
    //   // console.info('CXT', name, ctx, current_points);
    //   if (start && stop) {
    //     tokensList.forEach((tok: QToken, index) => {
    //       if (
    //         start &&
    //         stop &&
    //         tok.tokenIndex >= start.tokenIndex &&
    //         tok.tokenIndex <= stop.tokenIndex
    //       ) {
    //         // map.set("a", (map.get("a") ?? 0) + 1)
    //         tokensList[index].counter.set(name, current_points.get(name));
    //
    //         if (exception) {
    //           tokensList[index].exception.push(name);
    //         }
    //         if (invokingState >= 0) {
    //           tokensList[index].invokingState.set(name, invokingState);
    //         }
    //         if (ruleIndex >= 0) {
    //           tokensList[index].ruleIndex.set(name, ruleIndex);
    //         }
    //       } // if in `token`
    //     }); // tokensList loop
    //   } // have start & stop
    // }, // visitNode
    // console.log(name);
  }

  //
  // visitTableExprIdentifier(ctx: any): Result {
  //   console.log(ctx);
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }
  //
  // visitExistsTableStmt(ctx: any): Result {
  //   console.log(ctx);
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  private processClause(clause: string, ctx: RuleNode): Result {
    console.log('clause', clause);
    // this.currentRelation.currentClause = clause;
    const result = this.visitChildren(ctx);
    // this.currentRelation.currentClause = undefined;
    return result;
  }

  visitFromClause(ctx: FromClauseContext): Result {
    return this.processClause('from', ctx);
  }

  visitWhereClause(ctx: WhereClauseContext): Result {
    return this.processClause('where', ctx);
  }

  visitGroupByClause(ctx: GroupByClauseContext): Result {
    return this.processClause('group by', ctx);
  }

  visitHavingClause(ctx: HavingClauseContext): Result {
    return this.processClause('having', ctx);
  }

  visitWithClause(ctx: WithClauseContext): Result {
    return this.processClause('with', ctx);
  }

  visitWindowClause(ctx: WindowClauseContext): Result {
    return this.processClause('window', ctx);
  }

  visitOrderByClause(ctx: OrderByClauseContext): Result {
    return this.processClause('order by', ctx);
  }

  visitPrewhereClause(ctx: PrewhereClauseContext): Result {
    return this.processClause('prewhere', ctx);
  }

  visitLimitByClause(ctx: LimitByClauseContext): Result {
    return this.processClause('limit', ctx);
  }

  visitLimitClause(ctx: LimitClauseContext): Result {
    return this.processClause('limit', ctx);
  }

  visitSettingsClause(ctx: SettingsClauseContext): Result {
    return this.processClause('settings', ctx);
  }

  protected defaultResult(): Result {
    return {} as Result;
  }
}
