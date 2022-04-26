import { EdgeType } from '../Lineage';
import { SqlBaseVisitor } from './SqlBaseVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { Range } from '../utils/getRange';
import { ColumnRef, QuotableIdentifier } from './common';
import { ParserRuleContext } from 'antlr4ts';
import {
  AliasedQueryContext,
  ColumnReferenceContext,
  ConstantDefaultContext,
  DereferenceContext,
  ExistsContext,
  ExpressionContext,
  FromClauseContext,
  FunctionCallContext,
  GroupByClauseContext,
  HavingClauseContext,
  JoinCriteriaUsingContext,
  NamedExpressionContext,
  NamedQueryContext,
  NumericLiteralContext,
  PredicateContext,
  PredicatedContext,
  PrimaryExpressionContext,
  QueryContext,
  QueryOrganizationContext,
  QueryTermDefaultContext,
  RegularQuerySpecificationContext,
  SelectClauseContext,
  SortItemContext,
  StarContext,
  SubqueryExpressionContext,
  TableNameContext,
  ValueExpressionDefaultContext,
  WhereClauseContext,
} from './SqlBaseParser';

import common from './common';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import { TablePrimary } from '..';

const ROOT_QUERY_ID = 'result_1';
export const ROOT_QUERY_NAME = '[final result]';

export class Column {
  readonly columnReferences: Array<ColumnRef> = [];

  constructor(
    readonly id: string,
    public label: string,
    readonly range?: Range,
    readonly data?: unknown,
    readonly isAssumed?: boolean
  ) {}
}

/**
 * Base relation class representing any relation in query: query itself, subquery, source table, CTE
 */
export abstract class Relation {
  constructor(
    readonly id: string,
    readonly columns: Array<Column>,
    readonly parent?: QueryRelation,
    readonly range?: Range
  ) {}

  findColumn(columnName: QuotableIdentifier): Column | undefined {
    return this.columns.find((c) =>
      columnName.quoted
        ? c.label == columnName.name
        : c.label.localeCompare(columnName.name, undefined, {
            sensitivity: 'accent',
          }) == 0
    );
  }

  resolveColumn(columnName: QuotableIdentifier): ColumnRef | undefined {
    const col = this.findColumn(columnName);
    return col !== undefined
      ? {
          tableId: this.id,
          columnId: col.id,
          isAssumed: false,
        }
      : undefined;
  }
}

/**
 * Relation representing source table.
 */
export class TableRelation extends Relation {
  constructor(
    id: string,
    readonly tablePrimary: TablePrimary,
    columns: Array<Column>,
    readonly isFetched: boolean,
    parent?: QueryRelation,
    range?: Range,
    readonly data?: unknown
  ) {
    super(id, columns, parent, range);
  }

  addAssumedColumn(columnName: QuotableIdentifier, range: Range): ColumnRef {
    const column = new Column(
      `column_${this.columns.length + 1}`,
      columnName.name,
      range,
      undefined,
      true
    );
    this.columns.push(column);
    return { tableId: this.id, columnId: column.id, isAssumed: true };
  }
}

/**
 * Relation representing (sub-)query.
 */
export class QueryRelation extends Relation {
  // CTEs from this context
  ctes: Map<string, QueryRelation> = new Map();

  // relations for this context extracted from FROM
  relations: Map<string, Relation> = new Map();

  // sequence generator for columns in this context
  columnIdSeq = 0;

  currentClause?: EdgeType;

  currentColumnId?: string;

  columnReferences: Array<ColumnRef> = [];

  constructor(id: string, parent?: QueryRelation, range?: Range) {
    super(id, [], parent, range);
  }

  findLocalRelation(tableName: QuotableIdentifier): Relation | undefined {
    for (const rel of this.relations) {
      if (tableName.quoted) {
        if (rel[0] == tableName.name) return rel[1];
      } else {
        if (
          tableName.name.localeCompare(rel[0], undefined, {
            sensitivity: 'accent',
          }) == 0
        )
          return rel[1];
      }
    }

    return undefined;
  }

  findRelation(tableName: QuotableIdentifier): Relation | undefined {
    return this.findLocalRelation(tableName) ?? this.parent?.findRelation(tableName);
  }

  findCTE(tableName: QuotableIdentifier): Relation | undefined {
    for (const rel of this.ctes) {
      if (tableName.quoted) {
        if (rel[0] == tableName.name) return rel[1];
      } else {
        if (
          tableName.name.localeCompare(rel[0], undefined, {
            sensitivity: 'accent',
          }) == 0
        )
          return rel[1];
      }
    }

    return this.parent?.findCTE(tableName);
  }

  getCTENames(): string[] {
    const localCtes = Array.from(this.ctes.keys());
    if (this.parent !== undefined) {
      return localCtes.concat(this.parent.getCTENames());
    } else {
      return localCtes;
    }
  }

  resolveOrAssumeRelationColumn(
    columnName: QuotableIdentifier,
    range: Range,
    tableName?: QuotableIdentifier
  ): ColumnRef | undefined {
    if (tableName !== undefined) {
      const rel = this.findRelation(tableName);
      const col = rel?.resolveColumn(columnName);
      if (col === undefined && rel != undefined && rel instanceof TableRelation) {
        return rel.addAssumedColumn(columnName, range);
      }
      return col;
    } else {
      const tables: TableRelation[] = [];
      for (const r of this.relations) {
        const rel = r[1];
        const col = rel.resolveColumn(columnName);
        if (col) {
          return col;
        }
        if (rel instanceof TableRelation) {
          tables.push(rel);
        }
      }

      const assumed = tables.filter((t) => !t.isFetched);
      if (assumed.length == 1) {
        return assumed[0].addAssumedColumn(columnName, range);
      } else if (tables.length == 1) {
        return tables[0].addAssumedColumn(columnName, range);
      }

      return undefined;
    }
  }

  getNextColumnId(): string {
    this.columnIdSeq++;
    return `column_${this.columnIdSeq}`;
  }
}

/**
 * Visitor to extract query structure in the sense of relations, columns and used relations/columns.
 * This extraction builds a tree of contexts corresponding to (sub-)queries, resolves all column
 * references and for each (sub-)query and source table reports separate relation with #onRelation()
 * handler. For column/table used when building particular relation it reports the reference with
 * #onColumnReference() handler.
 */
export abstract class QueryStructureVisitor<Result>
  extends AbstractParseTreeVisitor<Result>
  implements SqlBaseVisitor<Result>
{
  private relationSeq = 0;

  public lastRelation: QueryRelation | undefined;

  protected currentRelation = new QueryRelation(this.getNextRelationId());

  constructor(
    public getTable: (
      table: TablePrimary
    ) =>
      | { table: { id: string; data: unknown }; columns: { id: string; data: unknown }[] }
      | undefined,
    readonly options?: {
      positionalRefsEnabled?: boolean;
    }
  ) {
    super();
  }

  getNextRelationId(): string {
    return `result_${this.relationSeq++}`;
  }

  rangeFromContext(ctx: ParserRuleContext): Range {
    const stop = ctx.stop ?? ctx.start;
    return {
      startLine: ctx.start.line,
      endLine: stop.line,
      startColumn: ctx.start.charPositionInLine,
      endColumn: stop.charPositionInLine + (stop.stopIndex - stop.startIndex + 1),
    };
  }

  /**
   *  Extracts table and column names from PrimaryExpressionContext (if possible).
   */

  protected extractTableAndColumn(
    ctx: PrimaryExpressionContext
  ): { table?: QuotableIdentifier; column: QuotableIdentifier } | undefined {
    if (ctx instanceof ColumnReferenceContext) {
      return { column: common.stripQuote(ctx.identifier()) };
    } else if (ctx instanceof DereferenceContext) {
      const primary = ctx.primaryExpression();
      if (primary instanceof ColumnReferenceContext) {
        return {
          table: common.stripQuote(primary.identifier()),
          column: common.stripQuote(ctx.identifier()),
        };
      }
    }
    return undefined;
  }

  private asPrimaryExpression(ctx: ExpressionContext): PrimaryExpressionContext | undefined {
    const boolExpr = ctx.booleanExpression();
    if (boolExpr instanceof PredicatedContext) {
      const valExpr = boolExpr.valueExpression();
      if (valExpr instanceof ValueExpressionDefaultContext) {
        return valExpr.primaryExpression();
      }
    }
    return undefined;
  }

  /**
   *  Derives column name from expression if possible.
   */
  protected deriveColumnName(ctx: ExpressionContext): string | undefined {
    const primExpr = this.asPrimaryExpression(ctx);
    if (primExpr) {
      return this.extractTableAndColumn(primExpr)?.column.name;
    }
    return undefined;
  }

  /**
   * Called when relation is ready.
   * @param _relation
   * @param _alias
   * @returns
   */
  onRelation(_relation: TableRelation | QueryRelation, _alias?: string): void {
    return;
  }

  private reportTableReferences() {
    for (const [alias, relation] of this.currentRelation.relations) {
      if (relation instanceof TableRelation) {
        this.onRelation(relation, alias !== relation.id ? alias : undefined);
      }
    }
  }

  /**
   * Called when column reference is ready.
   * @param _tableId
   * @param _columnId
   * @returns
   */
  onColumnReference(_tableId: string, _columnId?: string): void {
    return;
  }

  /**
   *  Determines whether expression is a star.
   */

  private isStar(ctx: ExpressionContext): StarContext | undefined {
    const boolExpr = ctx.booleanExpression();
    if (boolExpr instanceof PredicatedContext) {
      const valExpr = boolExpr.valueExpression();
      if (valExpr instanceof ValueExpressionDefaultContext) {
        const primaryExpr = valExpr.primaryExpression();
        if (primaryExpr instanceof StarContext) {
          return primaryExpr;
        }
      }
    }
    return undefined;
  }

  private processStar(ctx: StarContext): Result {
    const range = this.rangeFromContext(ctx);
    const qualifiedName = ctx.qualifiedName();
    if (qualifiedName !== undefined) {
      // TODO support multipart table names
      const lastName = qualifiedName.identifier()[qualifiedName.identifier().length - 1];
      const tableName = common.stripQuote(lastName);
      const rel = this.currentRelation.findLocalRelation(tableName);
      if (rel !== undefined) {
        this.addRelationColumns(rel, range);
      }
    } else {
      for (const r of this.currentRelation.relations) {
        this.addRelationColumns(r[1], range);
      }
    }

    return this.visitChildren(ctx);
  }

  private addRelationColumns(rel: Relation, range: Range): void {
    rel.columns.forEach((c) => {
      const columnId = this.currentRelation.getNextColumnId();
      const col = new Column(columnId, c.label, range);
      this.currentRelation.columns.push(col);
      this.currentRelation.currentColumnId = columnId;
      this.onColumnReference(rel.id, c.id);
      this.currentRelation.currentColumnId = undefined;
    });
  }

  private processClause(clause: EdgeType, ctx: RuleNode): Result {
    this.currentRelation.currentClause = clause;
    const result = this.visitChildren(ctx);
    this.currentRelation.currentClause = undefined;
    return result;
  }

  //
  // Visitor method overrides
  //

  visitQuery(ctx: QueryContext): Result {
    this.currentRelation = new QueryRelation(
      this.getNextRelationId(),
      this.currentRelation,
      this.rangeFromContext(ctx)
    );
    console.log('visitQuery->ENTER');
    const result = this.visitChildren(ctx);
    console.log('visitQuery->EXIT');
    this.reportTableReferences();

    // to be consumed later
    this.lastRelation = this.currentRelation;
    console.log(
      `!!! SET this.lastRelation [currentRelation] ${this.currentRelation.id}`,
      this.lastRelation
    );
    if (this.currentRelation.id == ROOT_QUERY_ID)
      this.onRelation(this.currentRelation, ROOT_QUERY_NAME);
    // console.log(this.currentRelation);
    this.currentRelation =
      this.currentRelation.parent ?? new QueryRelation(this.getNextRelationId());

    return result;
  }

  /**
   * Processing set operations.
   */
  visitQueryTermDefault(ctx: QueryTermDefaultContext): Result {
    // reinit column seq as we will repeat the same columns in subsequent queries
    this.currentRelation.columnIdSeq = 0;
    // reports table references from previous queryTerm (if any)
    this.reportTableReferences();
    // clear relations for each queryTermDefault because it's individual query
    this.currentRelation.relations = new Map();
    return this.visitChildren(ctx);
  }

  visitRegularQuerySpecification(ctx: RegularQuerySpecificationContext): Result {
    // process FROM first to capture all available relations
    let result = ctx.fromClause()?.accept(this) ?? this.defaultResult();
    console.log('visitRegu/larQuerySpecification->ENTER');
    // then process all remaining clauses
    ctx.children?.forEach((c) => {
      if (!(c instanceof FromClauseContext)) {
        result = this.aggregateResult(result, c.accept(this));
      }
    });

    return result;
  }

  /**
   * Process JOIN ... USING (...) columns
   * @param ctx
   */
  visitJoinCriteriaUsing(ctx: JoinCriteriaUsingContext): Result {
    console.log('visitJoinCriteriaUsing->ENTER');
    const columns = ctx
      .identifierList()
      .identifierSeq()
      .errorCapturingIdentifier()
      .map((eci) => common.stripQuote(eci.identifier()));

    // columns shall be searched in last from relation and all previous ones
    const size = this.currentRelation.relations.size;
    if (size >= 2) {
      let i = 0;
      const foundLeftCol: Set<number> = new Set();
      this.currentRelation.relations.forEach((r) => {
        if (i == size - 1) {
          // this is the last (right) relation
          columns.forEach((c) => {
            const col = r.resolveColumn(c);
            if (col) this.onColumnReference(col.tableId, col.columnId);
          });
        } else {
          columns.forEach((c, j) => {
            if (!foundLeftCol.has(j)) {
              const col = r.resolveColumn(c);
              if (col) this.onColumnReference(col.tableId, col.columnId);
              foundLeftCol.add(j);
            }
          });
        }
        i++;
      });
    }

    return this.visitChildren(ctx);
  }

  // processes table/CTE/correlated subquery references
  visitTableName(ctx: TableNameContext): Result {
    console.log('visitTableName->ENTER');
    const multipartTableName = ctx
      .multipartIdentifier()
      .errorCapturingIdentifier()
      .map((v) => common.stripQuote(v.identifier()));

    const strictId = ctx.tableAlias().strictIdentifier();
    const alias = (
      strictId !== undefined
        ? common.stripQuote(strictId)
        : multipartTableName[multipartTableName.length - 1]
    ).name;

    if (multipartTableName.length == 1) {
      console.log('multipartTableName');
      const cte = this.currentRelation.findCTE(multipartTableName[0]);
      if (cte !== undefined) {
        // found relation as CTE
        this.currentRelation.relations.set(alias, cte);
        console.log(
          `relations.set [aliasedQuery] : ${cte.id} to ${this.currentRelation.id} `,
          alias,
          Object.assign({}, this.currentRelation)
        );
        return this.defaultResult();
      }
      console.log('findRelation', multipartTableName[0]);
      const rel = this.currentRelation.findRelation(multipartTableName[0]);
      if (rel !== undefined) {
        // found relation as correlated sq
        if (multipartTableName[0].name != alias) {
          console.log(
            `relations.set [aliasedQuery] : ${rel.id} to ${this.currentRelation.id} `,
            alias,
            Object.assign({}, this.currentRelation)
          );
          this.currentRelation.relations.set(alias, rel);
        }
        return this.defaultResult();
      }
    }

    const tablePrimary = common.tablePrimaryFromMultipart(multipartTableName.map((v) => v.name));

    const metadata = this.getTable(tablePrimary);
    const columns = metadata?.columns.map((c) => new Column(c.id, c.id, undefined, c.data)) || [];

    const relation = new TableRelation(
      this.getNextRelationId(),
      tablePrimary,
      columns,
      metadata !== undefined,
      this.currentRelation,
      this.rangeFromContext(ctx),
      metadata?.table.data
    );
    console.log(
      `relations.set [aliasedQuery] : ${relation.id} to ${this.currentRelation.id} `,
      alias,
      Object.assign({}, this.currentRelation)
    );

    this.currentRelation.relations.set(alias, relation);

    return this.defaultResult();
  }

  // processes CTE
  visitNamedQuery(ctx: NamedQueryContext): Result {
    console.log('visitNamedQuery->ENTER');
    const result = this.visitChildren(ctx);
    console.log('visitNamedQuery->EXIT [IS lastRelation?]');
    // expecting query relation to be in stack
    const relation = this.lastRelation;
    if (relation !== undefined) {
      const identifier = ctx.errorCapturingIdentifier().identifier();
      const alias = common.stripQuote(identifier).name;

      const columnAliases = ctx
        .identifierList()
        ?.identifierSeq()
        .errorCapturingIdentifier()
        .map((eci) => common.stripQuote(eci.identifier()).name);
      if (columnAliases !== undefined) {
        relation.columns.forEach((c, i) => {
          c.label = columnAliases[i] ?? c.label;
        });
      }

      // Notify the callback before adding the cte as the cte is not yet available in scope.
      this.onRelation(relation, alias);
      this.currentRelation.ctes.set(alias, relation);
      return result;
    } else {
      throw new Error('Expecting CTE query relation to be in stack');
    }
  }

  // TableExprAlias
  // processes subqueries
  visitAliasedQuery(ctx: AliasedQueryContext): Result {
    console.log('visitAliasedQuery->ENTER');
    const result = this.visitChildren(ctx);
    console.log('visitAliasedQuery->EXIT [is lastRelation?]', this.lastRelation ? 'YES' : 'NO!');
    // expecting query relation to be in stack
    const relation = this.lastRelation;
    console.log('READ !  this.lastRelation ! ');
    if (relation !== undefined) {
      const strictId = ctx.tableAlias().strictIdentifier();
      const alias = strictId !== undefined ? common.stripQuote(strictId).name : relation.id;
      const columnAliases = ctx
        .tableAlias()
        .identifierList()
        ?.identifierSeq()
        .errorCapturingIdentifier()
        .map((eci) => common.stripQuote(eci.identifier()).name);
      if (columnAliases !== undefined) {
        relation.columns.forEach((c, i) => {
          c.label = columnAliases[i] ?? c.label;
        });
      }
      console.log(
        `relations.set [aliasedQuery] : ${relation.id} to ${this.currentRelation.id} `,
        alias,
        Object.assign({}, this.currentRelation)
      );

      this.currentRelation.relations.set(alias, relation);
      this.onRelation(relation, alias);
      return result;
    } else {
      throw new Error('Expecting subquery relation to be in stack');
    }
  }

  visitSelectClause(ctx: SelectClauseContext): Result {
    return this.processClause('select', ctx);
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

  visitQueryOrganization(ctx: QueryOrganizationContext): Result {
    return this.processClause('order by', ctx);
  }

  /**
   * Handle subquery in EXISTS.
   * @param ctx
   * @returns
   */
  visitExists(ctx: ExistsContext): Result {
    const result = this.visitChildren(ctx);
    const rel = this.lastRelation;
    if (rel !== undefined) {
      this.onRelation(rel);
      this.onColumnReference(rel.id);
    }
    return result;
  }

  /**
   * Handle subquery in IN predicate.
   * @param ctx
   * @returns
   */
  visitPredicate(ctx: PredicateContext): Result {
    console.log('visitPredicate --> ENTER');
    const result = this.visitChildren(ctx);
    console.log('visitPredicate --> EXIT');
    if (ctx.query() !== undefined) {
      const rel = this.lastRelation;
      if (rel !== undefined) {
        this.onRelation(rel);
        this.onColumnReference(rel.id);
      }
    }
    return result;
  }

  visitNamedExpression(ctx: NamedExpressionContext): Result {
    console.log('visitNamedExpression->ENTER');
    if (ctx.errorCapturingIdentifier() === undefined) {
      const star = this.isStar(ctx.expression());
      if (star !== undefined) {
        return this.processStar(star);
      }
    }

    const columnId = this.currentRelation.getNextColumnId();

    let column = this.currentRelation.columns.find((c) => c.id == columnId);
    // column could have been already defined if we have set operation
    if (column === undefined) {
      const errCaptId = ctx.errorCapturingIdentifier();
      const label =
        errCaptId !== undefined
          ? common.stripQuote(errCaptId.identifier()).name
          : this.deriveColumnName(ctx.expression()) ?? columnId;

      const range = this.rangeFromContext(ctx);
      // console.log(`->Add Column ${label} as ${columnId}`);
      column = new Column(columnId, label, range);
      this.currentRelation.columns.push(column);
    } else {
      console.log(`->Exists Column  as ${columnId}`);
    }

    this.currentRelation.currentColumnId = columnId;
    this.currentRelation.columnReferences = [];

    const result = this.visitChildren(ctx);
    console.log('visitNamedExpression->EXIT');
    column.columnReferences.push(...this.currentRelation.columnReferences);
    this.currentRelation.currentColumnId = undefined;

    return result;
  }

  visitSubqueryExpression(ctx: SubqueryExpressionContext): Result {
    console.log('visitSubqueryExpression->ENTER');
    const result = this.visitChildren(ctx);
    console.log('visitSubqueryExpression->EXIT');
    const rel = this.lastRelation;
    if (rel !== undefined) {
      this.onRelation(rel);
      this.onColumnReference(rel.id);
    }
    return result;
  }

  visitFunctionCall(ctx: FunctionCallContext): Result {
    if (
      ctx.functionName().text.toLowerCase() == 'count' &&
      ctx.expression().length == 1 &&
      this.isStar(ctx.expression()[0])
    ) {
      for (const r of this.currentRelation.relations) {
        this.onColumnReference(r[1].id);
      }
    }
    return this.visitChildren(ctx);
  }

  visitSortItem(ctx: SortItemContext): Result {
    if (this.options?.positionalRefsEnabled) {
      const primExp = this.asPrimaryExpression(ctx.expression());
      if (primExp instanceof ConstantDefaultContext) {
        const constant = primExp.constant();
        if (constant instanceof NumericLiteralContext) {
          const idx = Number(constant.text) - 1;
          if (idx in this.currentRelation.columns) {
            const col = this.currentRelation.columns[idx];
            col.columnReferences.forEach((cr) => this.onColumnReference(cr.tableId, cr.columnId));
            return this.defaultResult();
          }
        }
      }
    }

    return this.visitChildren(ctx);
  }

  private processColumnReference(ctx: ColumnReferenceContext | DereferenceContext): Result {
    // console.log('processColumnReference');
    const tableCol = this.extractTableAndColumn(ctx);
    if (tableCol !== undefined) {
      if (
        tableCol.table === undefined &&
        this.currentRelation.currentClause !== undefined &&
        ['group by', 'order by'].includes(this.currentRelation.currentClause)
      ) {
        // check if it is self column reference
        const selfCol = this.currentRelation.findColumn(tableCol.column);
        if (selfCol) {
          selfCol.columnReferences.forEach((cr) => this.onColumnReference(cr.tableId, cr.columnId));
          return this.defaultResult();
        }
      }

      const range = this.rangeFromContext(ctx);
      const col = this.currentRelation.resolveOrAssumeRelationColumn(
        tableCol.column,
        range,
        tableCol.table
      );
      if (col !== undefined) {
        this.currentRelation.columnReferences.push(col);
        this.onColumnReference(col.tableId, col.columnId);
      }
      return this.defaultResult();
    } else {
      return this.visitChildren(ctx);
    }
  }

  visitColumnReference(ctx: ColumnReferenceContext): Result {
    return this.processColumnReference(ctx);
  }

  visitDereference(ctx: DereferenceContext): Result {
    return this.processColumnReference(ctx);
  }

  getCurrentRelation(): void {
    console.log('getCurrentRelationgetCurrentRelationgetCurrentRelationgetCurrentRelation');
    console.log('----- # currentRelation ---------\n', this.currentRelation);
    console.log('----- # lastRelation ---------\n', this.lastRelation);
    console.log(
      `----- # this.lastRelation?.relations --------------\n`,
      this.lastRelation?.relations
    );
    this.lastRelation?.relations.forEach((q, id) => {
      console.log(`----- # relation ${id} -----------\n`, q);
    });
    // if (this.lastRelation && this.lastRelation.relations && this.lastRelation.relations instanceof Map<string,QueryRelation>)
    // console.log(`this.lastRelation?.relations.relations -------------- `,this.lastRelation?.relations?.relations);
  }
}
