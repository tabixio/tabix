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
  QueryStmtContext,
  TableExprContext,
  TableExprFunctionContext,
  JoinExprTableContext,
} from './CHSql/ClickHouseParser';

import { QueryRelation, QuotableIdentifier, Range, TableRelation } from '../CommonSQL';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Token, ParserRuleContext } from 'antlr4ts';

export class ClickhouseSQLVisitor<Result>
  extends AbstractSQLTreeVisitor<Result>
  implements ClickHouseParserVisitor<Result>
{
  private relationSeq = 0;

  protected currentRelation = new QueryRelation(this.getNextRelationId());

  public lastRelation: QueryRelation | undefined;

  getNextRelationId(): string {
    return `result_${this.relationSeq++}`;
  }

  protected unquote(text?: string): string {
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

  /**
   *  Extracts table and column names from IdentifierContext (if possible).
   */
  visitColumnIdentifier(ctx: ColumnIdentifierContext): Result {
    // columnIdentifier: (tableIdentifier DOT)? nestedIdentifier;
    const tableName: string | undefined = this.unquote(ctx.tableIdentifier()?.identifier().text);
    const colName: string | undefined = this.unquote(ctx.nestedIdentifier()?.text);

    if (colName !== undefined) {
      if (
        tableName === undefined &&
        this.currentRelation.currentClause !== undefined
        // &&
        // ['group by', 'order by', 'having'].includes(this.currentRelation.currentClause)
      ) {
        //
        // check if it is self column reference
        // const selfCol = this.currentRelation.findColumn(tableCol.column);
        // if (selfCol) {
        //   selfCol.columnReferences.forEach(cr => this.onColumnReference(cr.tableId, cr.columnId));
        //   return this.defaultResult();
        // }
      }

      // Текущий range?
      const range = this.rangeFromContext(ctx);
      const qCol: QuotableIdentifier = { name: colName, quoted: false };
      const qTb: QuotableIdentifier = { name: tableName, quoted: false };
      const col = this.currentRelation.resolveOrAssumeRelationColumn(qCol, range, qTb);
      if (col !== undefined) {
        this.currentRelation.columnReferences.push(col);
        // this.onColumnReference(col.tableId, col.columnId);
      }
      console.log(`ColumnIdentifier: ${tableName} . ${colName}`, range, col);
    }

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

  // TableExprSubquery  // SELECT ... FROM ( SELECT )
  // TableExprAlias // tableExpr (alias | AS identifier)
  visitJoinExprTable(ctx: JoinExprTableContext) {
    const result = this.visitChildren(ctx);
    console.log('visitJoinExprTable', ctx.tableExpr().text, 'isFin');
    // ctx.sampleClause()
    // isFinal = ctx.FINAL()?.text !== undefined

    return result;
  }

  visitTableExpr(ctx: TableExprContext) {
    const result = this.visitChildren(ctx);
    console.log('visitTableExpr', ctx);
    return result;
  }

  /**
   * // SELECT ... FROM remote(...)
   * @param ctx
   */
  visitTableExprFunction(ctx: TableExprFunctionContext) {
    return this.visitChildren(ctx);
  }

  visitTableExprIdentifier(ctx: any): Result {
    console.log('visitTableExprIdentifier');
    const result = this.visitChildren(ctx);
    return result;
  }

  // processes subqueries, SELECT ... FROM (SELECT ...) as AliasedQuery
  //ToDo: visitAliasedQuery(ctx: AliasedQueryContext): Result {

  // visitExistsTableStmt(ctx: any): Result {
  //   console.log(ctx);
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  private processClause(clause: string, ctx: RuleNode): Result {
    console.log('clause', clause);
    this.currentRelation.currentClause = clause;
    const result = this.visitChildren(ctx);
    this.currentRelation.currentClause = undefined;
    return result;
  }

  private rangeFromContext(ctx: ParserRuleContext): Range {
    const stop = ctx.stop ?? ctx.start;
    return {
      startLine: ctx.start.line,
      endLine: stop.line,
      startColumn: ctx.start.charPositionInLine,
      endColumn: stop.charPositionInLine + (stop.stopIndex - stop.startIndex + 1),
    };
  }

  // visitJoinExpr

  /**
   * First IN
   * @param ctx
   */
  visitQueryStmt(ctx: QueryStmtContext) {
    //queryStmt
    this.currentRelation = new QueryRelation(
      this.getNextRelationId(),
      this.currentRelation,
      this.rangeFromContext(ctx)
    );

    console.log('--> ENTER: visitQueryStmt --> ');
    const result = this.visitChildren(ctx);

    // selectStmt

    this.reportTableReferences();

    console.log('--> EXIT : visitQueryStmt --> ');

    // to be consumed later
    this.lastRelation = this.currentRelation;
    // if (this.currentRelation.id == ROOT_QUERY_ID) this.onRelation(this.currentRelation, ROOT_QUERY_NAME);
    // this.currentRelation = this.currentRelation.parent ?? new QueryRelation(this.getNextRelationId());

    return result;
  }

  private reportTableReferences() {
    for (const [alias, relation] of this.currentRelation.relations) {
      if (relation instanceof TableRelation) {
        console.log('onRelation ', relation);
        // this.onRelation(relation, alias !== relation.id ? alias : undefined);
      }
    }
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
