/*eslint max-len: ["error", { "code": 280 , "ignoreTrailingComments": true , "ignoreComments": true }]*/
import {
  ROOT_QUERY_NAME,
  AbstractSQLTreeVisitor,
  CURSOR_CHARS_VALUE,
} from './AbstractSQLTreeVisitor';
import { ClickHouseParserVisitor } from './CHSql';
import {
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
  SelectUnionStmtContext,
  ArrayJoinClauseContext,
  ColumnExprContext,
  ColumnExprIdentifierContext,
  ColumnsExprAsteriskContext,
  ColumnsExprColumnContext,
  ColumnExprAliasContext,
  ColumnsExprContext,
} from './CHSql/ClickHouseParser';

import {
  QueryRelation,
  QuotableIdentifier,
  Range,
  TablePrimary,
  Column,
  TableRelation,
  QToken,
  ClauseTokenType,
} from '../CommonSQL';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { Token, ParserRuleContext } from 'antlr4ts';
// ------------------------------------------------------------------------------------------------------------------------------
const ROOT_QUERY_ID = 'result_1';
const CURSOR_VALUE = CURSOR_CHARS_VALUE.trim();

export class ClickhouseSQLVisitor<Result>
  extends AbstractSQLTreeVisitor<Result>
  implements ClickHouseParserVisitor<Result>
{
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
    this.log(
      `relations.set [aliasedQuery] : ${relation.id} to ${this.currentRelation.id} `,
      alias,
      Object.assign({}, this.currentRelation)
    );
    this.onRelation(relation, alias);
  }

  /**
   * Вход в JOIN секцию
   * @param ctx
   */
  visitJoinExprTable(ctx: JoinExprTableContext) {
    const result = this.visitChildren(ctx);
    // ?? isFinal = ctx.FINAL()?.text !== undefined ctx.sampleClause()

    let tableId = ctx.tableExpr().tryGetChild(0, TableExprIdentifierContext)?.tableIdentifier();
    if (!tableId) {
      tableId = ctx.tableExpr().tryGetChild(0, TableIdentifierContext);
    }
    const aliasId = ctx.tryGetChild(0, TableExprAliasContext);

    // DatabaseIdentifierContext
    // IdentifierContext
    const tableName = tableId?.identifier()?.text;
    let databaseName = tableId?.databaseIdentifier()?.text;
    let alias = aliasId?.identifier()?.text ?? aliasId?.alias()?.text;
    databaseName = this.filterCursorText(databaseName);

    alias = this.filterCursorText(alias);

    this.log(
      `DBTable -> -> %c[${databaseName}]:[${tableName}] as [${alias}] ${ctx.text}`,
      'color:#fcdb03'
    );

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
      true, // metadata !== undefined,
      this.currentRelation, // parent
      this.rangeFromContext(ctx), // range
      null // table.data
    );
    const keyAlias = alias ?? tableName;
    if (!keyAlias) {
      console.warn(
        'Can`t find alias for relation',
        relation,
        tablePrimary,
        aliasId,
        alias,
        tableName
      );
    }
    this.onRelation(relation);
    this.currentRelation.relations.set(keyAlias, relation);
    // this.log(
    //   `relations.set [in visitJoinExprTable] add ${relation.id} to ${this.currentRelation.id}`,
    //   keyAlias,
    //   {
    //     ...Object.assign({}, this.currentRelation),
    //   }
    // );
    // this.log(`visitJoinExprTable ->Exit`, keyAlias);
    //throw 'ERR';
    return this.defaultResult();
  }

  visitTableExpr(ctx: TableExprContext) {
    const result = this.visitChildren(ctx);
    this.log('visitTableExpr', ctx);
    return result;
  }

  private filterCursorText(txt: string | undefined): string | undefined {
    if (!txt) return txt;
    if (txt.includes(CURSOR_VALUE)) {
      if (txt === CURSOR_VALUE) return undefined;
      return txt.replace(CURSOR_VALUE, '');
    }
    return txt;
  }

  private extractColumn(col: ColumnExprContext | ColumnsExprAsteriskContext): void {
    // ColumnsExprColumnContext       <- Root , col instanceof ColumnsExprColumnContext
    // ColumnExprAliasContext         <- getChild(0)
    // ColumnExprIdentifierContext    <- getChild(0).getChild(0)
    // ColumnIdentifierContext        <- getChild(0).getChild(0).getChild(0)
    // Если есть `AS` .columnsExpr(3).columnExpr().AS().text - ok
    // Название колонки .columnsExpr(3).columnExpr().identifier().text

    // PreSet
    let columnName: string | undefined = undefined;
    let tableName: string | undefined = undefined;
    let aliasText: string | undefined = undefined;
    let isAsterisk = false;
    // Asterisk
    if (col instanceof ColumnsExprAsteriskContext) {
      // SELECT cc.* FROM cc
      isAsterisk = true;
      tableName = this.unquote(col.tableIdentifier()?.text);
      this.log(`Asterisk , tableIdentifier = ${tableName}`);
    }
    // Col
    if (col instanceof ColumnsExprColumnContext) {
      // SELECT a,b,c
      isAsterisk = false;
      const colAliasId = col.tryGetChild(0, ColumnExprAliasContext);
      // SELECT a as bb,b b_b -- where b_b alias for b
      aliasText = colAliasId
        ? colAliasId.alias()?.text ?? colAliasId.identifier()?.text
        : undefined;
      aliasText = this.filterCursorText(aliasText);
      let colIdentifierId = undefined;

      if (colAliasId) {
        colIdentifierId = colAliasId
          .tryGetChild(0, ColumnExprIdentifierContext)
          ?.columnIdentifier();
      } else {
        colIdentifierId = col.tryGetChild(0, ColumnExprIdentifierContext)?.columnIdentifier();
      }
      columnName = this.unquote(colIdentifierId?.nestedIdentifier().text);
      tableName = this.unquote(colIdentifierId?.tableIdentifier()?.text);
    }
    // -------- result
    this.log(
      `Column -> -> %c'${col.text}' -> [ ` +
        (isAsterisk ? `Asterisk` : `${tableName} , ${columnName} , ${aliasText}`) +
        ` ]`,
      'color:#32a852'
    );
    if (col.stop) {
      this.applyToken(col.start, col.stop, {
        context: 'column',
        link: {
          table: tableName,
          alias: aliasText,
        },
      });
    }

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
    const range = this.rangeFromContext(col); // Текущий range
    const columnId = this.currentRelation.getNextColumnId();
    let column = this.currentRelation.columns.find((c) => c.id == columnId);

    let useColName: string | undefined = undefined;

    if (isAsterisk) {
      useColName = (tableName ?? '') + '*';
    } else if (aliasText) {
      useColName = aliasText;
    } else {
      useColName = columnName;
    }
    if (!useColName) return;
    if (column === undefined) {
      column = new Column(
        columnId,
        useColName,
        range,
        columnName,
        this.currentRelation.currentClause
      );
      // this.log(`!!! -> Add Column ${columnName} as ${columnId}`);
      this.currentRelation.columns.push(column);
    }

    //
    const qCol: QuotableIdentifier = { name: useColName, quoted: false, origin: columnName };
    const qTb: QuotableIdentifier | undefined = !tableName
      ? undefined
      : { name: tableName, quoted: false };

    const colObj = this.currentRelation.resolveOrAssumeRelationColumn(qCol, range, qTb);
    this.currentRelation.currentColumnId = columnId;
    if (colObj !== undefined) {
      this.currentRelation.columnReferences.push(colObj);
    }
  }

  //
  // visitColumnsExpr(ctx: ColumnsExprContext) {
  //   const result = this.visitChildren(ctx);
  //   console.log(
  //     '%c-------------          >visitColumnsExpr<           --------- ------------ ',
  //     'color:red'
  //     //
  //   );
  //   return result;
  // }

  visitColumnsExprAsterisk(ctx: ColumnsExprAsteriskContext) {
    const result = this.visitChildren(ctx);
    this.extractColumn(ctx);
    return result;
  }

  visitColumnsExprColumn(ctx: ColumnExprContext) {
    const result = this.visitChildren(ctx);
    this.extractColumn(ctx);
    return result;
  }

  // visitColumnExprList(ctx: ColumnExprListContext) {
  //   const result = this.visitChildren(ctx);
  //   console.log(
  //     '%c-------------          visitColumnExprList           --------- ------------ ',
  //     'color:red'
  //   );
  //
  //   ctx.columnsExpr().forEach((col) => {
  //     this.extractColumn(col);
  //   });
  //   //
  //   //     if (!tableId) {
  //   //       tableId = ctx.tableExpr().tryGetChild(0, TableIdentifierContext);
  //   //     }
  //   //
  //   //     const aliasId = ctx.tryGetChild(0, TableExprAliasContext);
  //
  //   console.log('visitColumnExprList', ctx);
  //   console.log(
  //     '%c-------------          visitColumnExprList           --------- ------------ ',
  //     'color:green'
  //   );
  //   return result;
  // }

  //
  // visitColumnExpr(ctx: ColumnExprContext) {
  //   // console.log('visitColumnExpr->ENTER', ctx);
  //   // const columnId = this.currentRelation.getNextColumnId();
  //   const result = this.visitChildren(ctx);
  //   // console.log('visitColumnExpr->EXIT', ctx);
  //   return result;
  // }
  //
  // visitColumnExprIdentifier(ctx: ColumnExprIdentifierContext) {
  //   const result = this.visitChildren(ctx);
  //   // this.log('visitColumnExprIdentifier', ctx);
  //   return result;
  // }

  /**
   * // SELECT ... FROM remote(...)
   * @param ctx
   */
  visitTableExprFunction(ctx: TableExprFunctionContext) {
    return this.visitChildren(ctx);
  }

  visitColumnExprFunction(ctx: ColumnExprFunctionContext) {
    const re = this.visitChildren(ctx);
    if (ctx.stop) this.applyToken(ctx.start, ctx.stop, { clause: ClauseTokenType.function });
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

  // visitQuery(ctx: QueryContext) {
  //   const result = this.visitChildren(ctx);
  //   return result;
  // }

  private processClause(clause: ClauseTokenType, ctx: ParserRuleContext): Result {
    // console.log('processClause : ', clause);
    this.currentRelation.currentClause = clause;
    const result = this.visitChildren(ctx);
    this.currentRelation.currentClause = undefined;
    if (ctx.stop) this.applyToken(ctx.start, ctx.stop, { clause: clause });
    return result;
  }

  private rangeFromContext(ctx: ParserRuleContext): Range {
    const stop = ctx.stop ?? ctx.start;
    return {
      startLine: ctx.start.line,
      endLine: stop.line,
      startColumn: ctx.start.charPositionInLine,
      endColumn: stop.charPositionInLine + (stop.stopIndex - stop.startIndex + 1),
      startTokenIndex: ctx.start.tokenIndex,
      stopTokenIndex: stop.tokenIndex,
    };
  }

  visitRegularQuerySpecification(ctx: RegularQuerySpecificationContext): Result {
    // process FROM first to capture all available relations
    let result = ctx.fromClause()?.accept(this) ?? this.defaultResult();
    // this.log('visitRegularQuerySpecification->ENTER');
    ctx.children?.forEach((c) => {
      if (!(c instanceof FromClauseContext)) {
        result = this.aggregateResult(result, c.accept(this));
      }
    });
    // this.log('visitRegularQuerySpecification->EXIT');
    return result;
  }

  /**
   * Запрос SELECT + UNION
   * @param ctx
   */
  visitSelectUnionStmt(ctx: SelectUnionStmtContext): Result {
    //queryStmt
    this.currentRelation = new QueryRelation(
      this.getNextRelationId(),
      this.currentRelation,
      this.rangeFromContext(ctx)
    );
    //
    const rw = this.visitChildren(ctx);

    this.lastRelation = this.currentRelation;

    // this.log(
    //   `!!! SET this.lastRelation [currentRelation] ${this.currentRelation.id}`,
    //   this.lastRelation
    // );

    this.onRelation(
      this.currentRelation,
      this.currentRelation.id == ROOT_QUERY_ID ? ROOT_QUERY_NAME : this.currentRelation.id
    );
    this.currentRelation =
      this.currentRelation.parent ?? new QueryRelation(this.getNextRelationId());
    return rw;
  }

  visitSelectStmtWithParens(ctx: SelectStmtWithParensContext) {
    // reinit column seq as we will repeat the same columns in subsequent queries
    // this.currentRelation.columnIdSeq = 0;
    // reports table references from previous queryTerm (if any)
    // this.reportTableReferences();
    // clear relations for each queryTermDefault because it's individual query
    // this.currentRelation.relations = new Map();
    return this.visitChildren(ctx);
  }

  visitFromClause(ctx: FromClauseContext): Result {
    return this.processClause(ClauseTokenType.from, ctx);
  }

  visitWhereClause(ctx: WhereClauseContext): Result {
    return this.processClause(ClauseTokenType.where, ctx);
  }

  visitGroupByClause(ctx: GroupByClauseContext): Result {
    return this.processClause(ClauseTokenType.group, ctx);
  }

  visitArrayJoinClause(ctx: ArrayJoinClauseContext): Result {
    return this.processClause(ClauseTokenType.join, ctx);
  }

  visitHavingClause(ctx: HavingClauseContext): Result {
    return this.processClause(ClauseTokenType.having, ctx);
  }

  visitWithClause(ctx: WithClauseContext): Result {
    return this.processClause(ClauseTokenType.with, ctx);
  }

  visitWindowClause(ctx: WindowClauseContext): Result {
    return this.processClause(ClauseTokenType.window, ctx);
  }

  visitOrderByClause(ctx: OrderByClauseContext): Result {
    return this.processClause(ClauseTokenType.order, ctx);
  }

  visitPrewhereClause(ctx: PrewhereClauseContext): Result {
    return this.processClause(ClauseTokenType.prewhere, ctx);
  }

  visitLimitByClause(ctx: LimitByClauseContext): Result {
    return this.processClause(ClauseTokenType.limit, ctx);
  }

  visitLimitClause(ctx: LimitClauseContext): Result {
    return this.processClause(ClauseTokenType.limit, ctx);
  }

  visitSettingsClause(ctx: SettingsClauseContext): Result {
    return this.processClause(ClauseTokenType.settings, ctx);
  }

  protected defaultResult(): Result {
    return {} as Result;
  }
}
