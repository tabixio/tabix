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
  TableIdentifierContext,
  TableExprContext,
  TableExprFunctionContext,
  JoinExprTableContext,
  TableExprIdentifierContext,
  TableExprAliasContext,
  SelectStmtWithParensContext,
  RegularQuerySpecificationContext,
  QueryContext,
  ColumnExprFunctionContext,
} from './CHSql/ClickHouseParser';

import {
  QueryRelation,
  QuotableIdentifier,
  Range,
  TablePrimary,
  Column,
  TableRelation,
  QToken,
} from '../CommonSQL';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Token, ParserRuleContext } from 'antlr4ts';
// ------------------------------------------------------------------------------------------------------------------------------
const ROOT_QUERY_ID = 'result_1';
export const ROOT_QUERY_NAME = '[final result]';

export class ClickhouseSQLVisitor<Result>
  extends AbstractSQLTreeVisitor<Result>
  implements ClickHouseParserVisitor<Result>
{
  /**
   *  Extracts table and column names from IdentifierContext (if possible).
   */
  visitColumnIdentifier(ctx: ColumnIdentifierContext): Result {
    // columnIdentifier: (tableIdentifier DOT)? nestedIdentifier;
    // processColumn Reference
    const tableName: string | undefined = this.unquote(ctx.tableIdentifier()?.identifier().text);
    const colName: string | undefined = this.unquote(ctx.nestedIdentifier()?.text);
    //
    if (colName !== undefined) {
      const deb = `Field: ${colName}`;
      if (ctx.stop) this.applyToken(ctx.start, ctx.stop, deb);

      // if (
      //   tableName === undefined &&
      //   this.currentRelation.currentClause !== undefined
      //   // &&
      //   // ['group by', 'order by', 'having'].includes(this.currentRelation.currentClause)
      // ) {
      //
      // check if it is self column reference
      // const selfCol = this.currentRelation.findColumn(tableCol.column);
      // if (selfCol) {
      //   selfCol.columnReferences.forEach(cr => this.onColumnReference(cr.tableId, cr.columnId));
      //   return this.defaultResult();
      // }
      // }
      const range = this.rangeFromContext(ctx); // Текущий range
      const columnId = this.currentRelation.getNextColumnId();
      let column = this.currentRelation.columns.find((c) => c.id == columnId);

      if (column === undefined) {
        column = new Column(columnId, colName, range);
        this.log(`->Add Column ${colName} as ${columnId}`);
        this.currentRelation.columns.push(column);
      }

      //
      const qCol: QuotableIdentifier = { name: colName, quoted: false };
      const qTb: QuotableIdentifier | undefined = !tableName
        ? undefined
        : { name: tableName, quoted: false };

      const col = this.currentRelation.resolveOrAssumeRelationColumn(qCol, range, qTb);
      this.currentRelation.currentColumnId = columnId;
      if (col !== undefined) {
        this.currentRelation.columnReferences.push(col);
        // this.onColumnReference(col.tableId, col.columnId);
        this.log('processColumnReference:::', this.currentRelation.columnReferences);
      }

      this.log(`[ColumnIdentifier]: [ ${tableName} . ${colName} ] ADD_COLL`, this.currentRelation);

      return this.defaultResult();
    }

    const result = this.visitChildren(ctx);
    // column.columnReferences.push(...this.currentRelation.columnReferences);
    // this.currentRelation.currentColumnId = undefined;
    return result;
  }

  visitChildren(/*@NotNull*/ node: RuleNode): Result {
    this.visitNode(node);
    return super.visitChildren(node);
  }

  visitNode(ctx: RuleNode) {
    const name: string = ctx.constructor.name;
    let start: Token | undefined;
    let stop: Token | undefined;
    let exception = false;

    if (ctx instanceof ParserRuleContext) {
      start = ctx.start;
      stop = ctx.stop;
      if (ctx.exception) exception = true;
    }
    if (!start) return;
    // ------------------------
    this.tokensCurrentPoints.set(name, (this.tokensCurrentPoints.get(name) ?? 0) + 1);
    if (start && stop) {
      this.tokensList.forEach((tok: QToken, index) => {
        if (
          start &&
          stop &&
          tok.tokenIndex >= start.tokenIndex &&
          tok.tokenIndex <= stop.tokenIndex
        ) {
          this.tokensList[index].up = this.tokensList[index].up + 1;
          this.tokensList[index].counter.set(name, this.tokensCurrentPoints.get(name));
          if (exception) {
            this.tokensList[index].exception.push(name);
          }
          //this.tokensList[index].invokingState.set(name, invokingState);
          // this.tokensList[index].ruleIndex.set(name, ruleIndex);
        } // if in `token`
      }); // tokensList loop
    } // have start & stop
  }

  // TableExprSubquery  // SELECT ... FROM ( SELECT )
  // TableExprAlias // tableExpr (alias | AS identifier)

  private aliasedQuery(alias: string): void {
    const relation = this.lastRelation;
    if (!relation) {
      console.error('Can`t aliasedQuery');
      return;
    }

    //if (columnAliases !== undefined) {
    //  relation.columns.forEach((c, i) => {
    //    c.label = columnAliases[i] ?? c.label;
    //  });
    //}
    this.currentRelation.relations.set(alias, relation);
    //this.onRelation(relation, alias);
  }

  visitJoinExprTable(ctx: JoinExprTableContext) {
    this.log(`visitJoinExprTable ->ENTER`);

    const result = this.visitChildren(ctx);

    this.log(`visitJoinExprTable ->EXIT`);

    // isFinal = ctx.FINAL()?.text !== undefined
    // ctx.sampleClause()

    let tableId = ctx.tableExpr().tryGetChild(0, TableExprIdentifierContext)?.tableIdentifier();

    if (!tableId) {
      tableId = ctx.tableExpr().tryGetChild(0, TableIdentifierContext);
    }

    const aliasId = ctx.tryGetChild(0, TableExprAliasContext);

    // DatabaseIdentifierContext
    // IdentifierContext
    // console.log(tableId);
    const tableName = tableId?.identifier()?.text;
    const databaseName = tableId?.databaseIdentifier()?.text;
    const alias = aliasId?.identifier()?.text ?? aliasId?.alias()?.text;

    this.log(`visitJoinExprTable->Find db: [${databaseName}]:[${tableName}] as [${alias}] `);

    if (ctx.stop) {
      // `DB:[${databaseName}]:[${tableName}] as [${alias}]`
      const debud =
        `Use database: ${databaseName}, Table = ${tableName}` +
        (alias ? ',alias = ' + alias : ' no alias');

      this.applyToken(ctx.start, ctx.stop, debud);
    }

    // catalogName?: string; schemaName?: string; tableName: string; alias?: string;
    if (!databaseName && !tableName && alias) {
      // (...) AS alias
      this.aliasedQuery(alias);
      return result;
    }
    if (!tableName) {
      console.warn('Cant find table[EWQ]');
      return result;
    }

    const tablePrimary: TablePrimary = {
      schemaName: databaseName,
      catalogName: undefined,
      tableName: tableName,
      alias: alias,
    };

    const relation = new TableRelation(
      this.getNextRelationId(),
      tablePrimary,
      [],
      true, //metadata !== undefined,
      this.currentRelation,
      this.rangeFromContext(ctx),
      null // table.data
    );
    const keyAlias = alias ?? tableName;
    this.currentRelation.relations.set(keyAlias, relation);
    return this.defaultResult();
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

  visitColumnExprFunction(ctx: ColumnExprFunctionContext) {
    const re = this.visitChildren(ctx);

    //
    if (ctx.stop) this.applyToken(ctx.start, ctx.stop, 'Function');

    return re;
  }

  //
  // visitTableExprIdentifier(ctx: any): Result {
  //   console.log('visitTableExprIdentifier');
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  // processes subqueries, SELECT ... FROM (SELECT ...) as AliasedQuery

  // visitExistsTableStmt(ctx: any): Result {
  //   console.log(ctx);
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  //
  // visitColumnExpr(ctx: ColumnExprContext) {
  //   console.log('visitColumnExpr->ENTER');
  //   const columnId = this.currentRelation.getNextColumnId();
  //
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  private processClause(clause: string, ctx: ParserRuleContext): Result {
    // console.log('processClause : ', clause);
    this.currentRelation.currentClause = clause;
    const result = this.visitChildren(ctx);
    this.currentRelation.currentClause = undefined;
    if (ctx.stop) this.applyToken(ctx.start, ctx.stop, `IN:${clause}`);
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

  // /**
  //  * First IN
  //  * @param ctx
  //  */
  // visitQueryStmt(ctx: QueryStmtContext) {
  //   // console.log('--> ENTER: visitQueryStmt --> ');
  //   const result = this.visitChildren(ctx);
  //   // console.log('--> EXIT : visitQueryStmt --> ');
  //
  //   return result;
  // }

  visitQuery(ctx: QueryContext) {
    const result = this.visitChildren(ctx);

    return result;
  }

  private reportTableReferences() {
    for (const [alias, relation] of this.currentRelation.relations) {
      if (relation instanceof TableRelation) {
        // console.log('onRelation ', relation);
        // this.onRelation(relation, alias !== relation.id ? alias : undefined);
      }
    }
  }

  visitRegularQuerySpecification(ctx: RegularQuerySpecificationContext): Result {
    // process FROM first to capture all available relations
    let result = ctx.fromClause()?.accept(this) ?? this.defaultResult();
    this.log('visitRegularQuerySpecification->ENTER');
    ctx.children?.forEach((c) => {
      if (!(c instanceof FromClauseContext)) {
        result = this.aggregateResult(result, c.accept(this));
      }
    });
    this.log('visitRegularQuerySpecification->EXIT');
    return result;
  }

  visitSelectStmtWithParens(ctx: SelectStmtWithParensContext) {
    //queryStmt
    this.currentRelation = new QueryRelation(
      this.getNextRelationId(),
      this.currentRelation,
      this.rangeFromContext(ctx)
    );
    //

    // this.currentRelation.columnIdSeq = 0;
    // this.reportTableReferences();
    // this.currentRelation.relations = new Map();
    const rw = this.visitChildren(ctx);

    this.lastRelation = this.currentRelation;
    // console.log('!!! SET this.lastRelation [currentRelation]', this.lastRelation);
    // if (this.currentRelation.id == ROOT_QUERY_ID) this.onRelation(this.currentRelation, ROOT_QUERY_NAME);
    // console.log(this.currentRelation);
    this.currentRelation =
      this.currentRelation.parent ?? new QueryRelation(this.getNextRelationId());

    // console.log('visitSelectStmtWithParens>>>EXIT');
    return rw;
  }

  visitFromClause(ctx: FromClauseContext): Result {
    return this.processClause('from', ctx);
  }

  visitWhereClause(ctx: WhereClauseContext): Result {
    return this.processClause('where', ctx);
  }

  visitGroupByClause(ctx: GroupByClauseContext): Result {
    return this.processClause('group_by', ctx);
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
    return this.processClause('order_by', ctx);
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
