// Generated from src/antlr/SqlBase.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { TableNameContext } from "./SqlBaseParser";
import { AliasedQueryContext } from "./SqlBaseParser";
import { AliasedRelationContext } from "./SqlBaseParser";
import { InlineTableDefault2Context } from "./SqlBaseParser";
import { TableValuedFunctionContext } from "./SqlBaseParser";
import { ExponentLiteralContext } from "./SqlBaseParser";
import { DecimalLiteralContext } from "./SqlBaseParser";
import { LegacyDecimalLiteralContext } from "./SqlBaseParser";
import { IntegerLiteralContext } from "./SqlBaseParser";
import { BigIntLiteralContext } from "./SqlBaseParser";
import { SmallIntLiteralContext } from "./SqlBaseParser";
import { TinyIntLiteralContext } from "./SqlBaseParser";
import { DoubleLiteralContext } from "./SqlBaseParser";
import { FloatLiteralContext } from "./SqlBaseParser";
import { BigDecimalLiteralContext } from "./SqlBaseParser";
import { QueryTermDefaultContext } from "./SqlBaseParser";
import { SetOperationContext } from "./SqlBaseParser";
import { InsertOverwriteTableContext } from "./SqlBaseParser";
import { InsertIntoTableContext } from "./SqlBaseParser";
import { InsertOverwriteHiveDirContext } from "./SqlBaseParser";
import { InsertOverwriteDirContext } from "./SqlBaseParser";
import { ValueExpressionDefaultContext } from "./SqlBaseParser";
import { ArithmeticUnaryContext } from "./SqlBaseParser";
import { ArithmeticBinaryContext } from "./SqlBaseParser";
import { ComparisonContext } from "./SqlBaseParser";
import { PartitionTransformContext } from "./SqlBaseParser";
import { PartitionColumnContext } from "./SqlBaseParser";
import { QueryPrimaryDefaultContext } from "./SqlBaseParser";
import { FromStmtContext } from "./SqlBaseParser";
import { TableContext } from "./SqlBaseParser";
import { InlineTableDefault1Context } from "./SqlBaseParser";
import { SubqueryContext } from "./SqlBaseParser";
import { SingleInsertQueryContext } from "./SqlBaseParser";
import { MultiInsertQueryContext } from "./SqlBaseParser";
import { DeleteFromTableContext } from "./SqlBaseParser";
import { UpdateTableContext } from "./SqlBaseParser";
import { MergeIntoTableContext } from "./SqlBaseParser";
import { CurrentLikeContext } from "./SqlBaseParser";
import { SearchedCaseContext } from "./SqlBaseParser";
import { SimpleCaseContext } from "./SqlBaseParser";
import { CastContext } from "./SqlBaseParser";
import { StructContext } from "./SqlBaseParser";
import { FirstContext } from "./SqlBaseParser";
import { LastContext } from "./SqlBaseParser";
import { PositionContext } from "./SqlBaseParser";
import { ConstantDefaultContext } from "./SqlBaseParser";
import { StarContext } from "./SqlBaseParser";
import { RowConstructorContext } from "./SqlBaseParser";
import { SubqueryExpressionContext } from "./SqlBaseParser";
import { FunctionCallContext } from "./SqlBaseParser";
import { LambdaContext } from "./SqlBaseParser";
import { SubscriptContext } from "./SqlBaseParser";
import { ColumnReferenceContext } from "./SqlBaseParser";
import { DereferenceContext } from "./SqlBaseParser";
import { PostgresCastContext } from "./SqlBaseParser";
import { PostgresJsonContext } from "./SqlBaseParser";
import { ParenthesizedExpressionContext } from "./SqlBaseParser";
import { ExtractContext } from "./SqlBaseParser";
import { SubstringContext } from "./SqlBaseParser";
import { TrimContext } from "./SqlBaseParser";
import { OverlayContext } from "./SqlBaseParser";
import { UnquotedIdentifierContext } from "./SqlBaseParser";
import { QuotedIdentifierAlternativeContext } from "./SqlBaseParser";
import { TableFileFormatContext } from "./SqlBaseParser";
import { GenericFileFormatContext } from "./SqlBaseParser";
import { SampleByPercentileContext } from "./SqlBaseParser";
import { SampleByRowsContext } from "./SqlBaseParser";
import { SampleByBucketContext } from "./SqlBaseParser";
import { SampleByBytesContext } from "./SqlBaseParser";
import { NullLiteralContext } from "./SqlBaseParser";
import { IntervalLiteralContext } from "./SqlBaseParser";
import { TypeConstructorContext } from "./SqlBaseParser";
import { NumericLiteralContext } from "./SqlBaseParser";
import { BooleanLiteralContext } from "./SqlBaseParser";
import { StringLiteralContext } from "./SqlBaseParser";
import { RowFormatSerdeContext } from "./SqlBaseParser";
import { RowFormatDelimitedContext } from "./SqlBaseParser";
import { ComplexDataTypeContext } from "./SqlBaseParser";
import { YearMonthIntervalDataTypeContext } from "./SqlBaseParser";
import { DayTimeIntervalDataTypeContext } from "./SqlBaseParser";
import { PrimitiveDataTypeContext } from "./SqlBaseParser";
import { TransformQuerySpecificationContext } from "./SqlBaseParser";
import { RegularQuerySpecificationContext } from "./SqlBaseParser";
import { ErrorIdentContext } from "./SqlBaseParser";
import { RealIdentContext } from "./SqlBaseParser";
import { WindowRefContext } from "./SqlBaseParser";
import { WindowDefContext } from "./SqlBaseParser";
import { IdentityTransformContext } from "./SqlBaseParser";
import { ApplyTransformContext } from "./SqlBaseParser";
import { StatementDefaultContext } from "./SqlBaseParser";
import { DmlStatementContext } from "./SqlBaseParser";
import { UseContext } from "./SqlBaseParser";
import { CreateNamespaceContext } from "./SqlBaseParser";
import { SetNamespacePropertiesContext } from "./SqlBaseParser";
import { SetNamespaceLocationContext } from "./SqlBaseParser";
import { DropNamespaceContext } from "./SqlBaseParser";
import { ShowNamespacesContext } from "./SqlBaseParser";
import { CreateTableContext } from "./SqlBaseParser";
import { CreateTableLikeContext } from "./SqlBaseParser";
import { ReplaceTableContext } from "./SqlBaseParser";
import { AnalyzeContext } from "./SqlBaseParser";
import { AnalyzeTablesContext } from "./SqlBaseParser";
import { AddTableColumnsContext } from "./SqlBaseParser";
import { RenameTableColumnContext } from "./SqlBaseParser";
import { DropTableColumnsContext } from "./SqlBaseParser";
import { RenameTableContext } from "./SqlBaseParser";
import { SetTablePropertiesContext } from "./SqlBaseParser";
import { UnsetTablePropertiesContext } from "./SqlBaseParser";
import { AlterTableAlterColumnContext } from "./SqlBaseParser";
import { HiveChangeColumnContext } from "./SqlBaseParser";
import { HiveReplaceColumnsContext } from "./SqlBaseParser";
import { SetTableSerDeContext } from "./SqlBaseParser";
import { AddTablePartitionContext } from "./SqlBaseParser";
import { RenameTablePartitionContext } from "./SqlBaseParser";
import { DropTablePartitionsContext } from "./SqlBaseParser";
import { SetTableLocationContext } from "./SqlBaseParser";
import { RecoverPartitionsContext } from "./SqlBaseParser";
import { DropTableContext } from "./SqlBaseParser";
import { DropViewContext } from "./SqlBaseParser";
import { CreateViewContext } from "./SqlBaseParser";
import { CreateTempViewUsingContext } from "./SqlBaseParser";
import { AlterViewQueryContext } from "./SqlBaseParser";
import { CreateFunctionContext } from "./SqlBaseParser";
import { DropFunctionContext } from "./SqlBaseParser";
import { ExplainContext } from "./SqlBaseParser";
import { ShowTablesContext } from "./SqlBaseParser";
import { ShowTableExtendedContext } from "./SqlBaseParser";
import { ShowTblPropertiesContext } from "./SqlBaseParser";
import { ShowColumnsContext } from "./SqlBaseParser";
import { ShowViewsContext } from "./SqlBaseParser";
import { ShowPartitionsContext } from "./SqlBaseParser";
import { ShowFunctionsContext } from "./SqlBaseParser";
import { ShowCreateTableContext } from "./SqlBaseParser";
import { ShowCurrentNamespaceContext } from "./SqlBaseParser";
import { DescribeFunctionContext } from "./SqlBaseParser";
import { DescribeNamespaceContext } from "./SqlBaseParser";
import { DescribeRelationContext } from "./SqlBaseParser";
import { DescribeQueryContext } from "./SqlBaseParser";
import { CommentNamespaceContext } from "./SqlBaseParser";
import { CommentTableContext } from "./SqlBaseParser";
import { RefreshTableContext } from "./SqlBaseParser";
import { RefreshFunctionContext } from "./SqlBaseParser";
import { RefreshResourceContext } from "./SqlBaseParser";
import { CacheTableContext } from "./SqlBaseParser";
import { UncacheTableContext } from "./SqlBaseParser";
import { ClearCacheContext } from "./SqlBaseParser";
import { LoadDataContext } from "./SqlBaseParser";
import { TruncateTableContext } from "./SqlBaseParser";
import { RepairTableContext } from "./SqlBaseParser";
import { ManageResourceContext } from "./SqlBaseParser";
import { FailNativeCommandContext } from "./SqlBaseParser";
import { SetTimeZoneContext } from "./SqlBaseParser";
import { SetQuotedConfigurationContext } from "./SqlBaseParser";
import { SetConfigurationContext } from "./SqlBaseParser";
import { ResetQuotedConfigurationContext } from "./SqlBaseParser";
import { ResetConfigurationContext } from "./SqlBaseParser";
import { JoinCriteriaOnContext } from "./SqlBaseParser";
import { JoinCriteriaUsingContext } from "./SqlBaseParser";
import { LogicalNotContext } from "./SqlBaseParser";
import { ExistsContext } from "./SqlBaseParser";
import { PredicatedContext } from "./SqlBaseParser";
import { LogicalBinaryContext } from "./SqlBaseParser";
import { SingleStatementContext } from "./SqlBaseParser";
import { SingleExpressionContext } from "./SqlBaseParser";
import { SingleTableIdentifierContext } from "./SqlBaseParser";
import { SingleMultipartIdentifierContext } from "./SqlBaseParser";
import { SingleFunctionIdentifierContext } from "./SqlBaseParser";
import { SingleDataTypeContext } from "./SqlBaseParser";
import { SingleTableSchemaContext } from "./SqlBaseParser";
import { StatementContext } from "./SqlBaseParser";
import { ConfigKeyContext } from "./SqlBaseParser";
import { ConfigValueContext } from "./SqlBaseParser";
import { UnsupportedHiveNativeCommandsContext } from "./SqlBaseParser";
import { CreateTableHeaderContext } from "./SqlBaseParser";
import { ReplaceTableHeaderContext } from "./SqlBaseParser";
import { BucketSpecContext } from "./SqlBaseParser";
import { SkewSpecContext } from "./SqlBaseParser";
import { LocationSpecContext } from "./SqlBaseParser";
import { CommentSpecContext } from "./SqlBaseParser";
import { QueryContext } from "./SqlBaseParser";
import { InsertIntoContext } from "./SqlBaseParser";
import { PartitionSpecLocationContext } from "./SqlBaseParser";
import { PartitionSpecContext } from "./SqlBaseParser";
import { PartitionValContext } from "./SqlBaseParser";
import { NamespaceContext } from "./SqlBaseParser";
import { DescribeFuncNameContext } from "./SqlBaseParser";
import { DescribeColNameContext } from "./SqlBaseParser";
import { CtesContext } from "./SqlBaseParser";
import { NamedQueryContext } from "./SqlBaseParser";
import { TableProviderContext } from "./SqlBaseParser";
import { CreateTableClausesContext } from "./SqlBaseParser";
import { TablePropertyListContext } from "./SqlBaseParser";
import { TablePropertyContext } from "./SqlBaseParser";
import { TablePropertyKeyContext } from "./SqlBaseParser";
import { TablePropertyValueContext } from "./SqlBaseParser";
import { ConstantListContext } from "./SqlBaseParser";
import { NestedConstantListContext } from "./SqlBaseParser";
import { CreateFileFormatContext } from "./SqlBaseParser";
import { FileFormatContext } from "./SqlBaseParser";
import { StorageHandlerContext } from "./SqlBaseParser";
import { ResourceContext } from "./SqlBaseParser";
import { DmlStatementNoWithContext } from "./SqlBaseParser";
import { QueryOrganizationContext } from "./SqlBaseParser";
import { MultiInsertQueryBodyContext } from "./SqlBaseParser";
import { QueryTermContext } from "./SqlBaseParser";
import { QueryPrimaryContext } from "./SqlBaseParser";
import { SortItemContext } from "./SqlBaseParser";
import { FromStatementContext } from "./SqlBaseParser";
import { FromStatementBodyContext } from "./SqlBaseParser";
import { QuerySpecificationContext } from "./SqlBaseParser";
import { TransformClauseContext } from "./SqlBaseParser";
import { SelectClauseContext } from "./SqlBaseParser";
import { SetClauseContext } from "./SqlBaseParser";
import { MatchedClauseContext } from "./SqlBaseParser";
import { NotMatchedClauseContext } from "./SqlBaseParser";
import { MatchedActionContext } from "./SqlBaseParser";
import { NotMatchedActionContext } from "./SqlBaseParser";
import { AssignmentListContext } from "./SqlBaseParser";
import { AssignmentContext } from "./SqlBaseParser";
import { WhereClauseContext } from "./SqlBaseParser";
import { HavingClauseContext } from "./SqlBaseParser";
import { HintContext } from "./SqlBaseParser";
import { HintStatementContext } from "./SqlBaseParser";
import { FromClauseContext } from "./SqlBaseParser";
import { AggregationClauseContext } from "./SqlBaseParser";
import { GroupByClauseContext } from "./SqlBaseParser";
import { GroupingAnalyticsContext } from "./SqlBaseParser";
import { GroupingElementContext } from "./SqlBaseParser";
import { GroupingSetContext } from "./SqlBaseParser";
import { PivotClauseContext } from "./SqlBaseParser";
import { PivotColumnContext } from "./SqlBaseParser";
import { PivotValueContext } from "./SqlBaseParser";
import { LateralViewContext } from "./SqlBaseParser";
import { SetQuantifierContext } from "./SqlBaseParser";
import { RelationContext } from "./SqlBaseParser";
import { JoinRelationContext } from "./SqlBaseParser";
import { JoinTypeContext } from "./SqlBaseParser";
import { JoinCriteriaContext } from "./SqlBaseParser";
import { SampleContext } from "./SqlBaseParser";
import { SampleMethodContext } from "./SqlBaseParser";
import { IdentifierListContext } from "./SqlBaseParser";
import { IdentifierSeqContext } from "./SqlBaseParser";
import { OrderedIdentifierListContext } from "./SqlBaseParser";
import { OrderedIdentifierContext } from "./SqlBaseParser";
import { IdentifierCommentListContext } from "./SqlBaseParser";
import { IdentifierCommentContext } from "./SqlBaseParser";
import { RelationPrimaryContext } from "./SqlBaseParser";
import { InlineTableContext } from "./SqlBaseParser";
import { FunctionTableContext } from "./SqlBaseParser";
import { TableAliasContext } from "./SqlBaseParser";
import { RowFormatContext } from "./SqlBaseParser";
import { MultipartIdentifierListContext } from "./SqlBaseParser";
import { MultipartIdentifierContext } from "./SqlBaseParser";
import { TableIdentifierContext } from "./SqlBaseParser";
import { FunctionIdentifierContext } from "./SqlBaseParser";
import { NamedExpressionContext } from "./SqlBaseParser";
import { NamedExpressionSeqContext } from "./SqlBaseParser";
import { PartitionFieldListContext } from "./SqlBaseParser";
import { PartitionFieldContext } from "./SqlBaseParser";
import { TransformContext } from "./SqlBaseParser";
import { TransformArgumentContext } from "./SqlBaseParser";
import { ExpressionContext } from "./SqlBaseParser";
import { ExpressionSeqContext } from "./SqlBaseParser";
import { BooleanExpressionContext } from "./SqlBaseParser";
import { PredicateContext } from "./SqlBaseParser";
import { ValueExpressionContext } from "./SqlBaseParser";
import { PrimaryExpressionContext } from "./SqlBaseParser";
import { ConstantContext } from "./SqlBaseParser";
import { ComparisonOperatorContext } from "./SqlBaseParser";
import { ArithmeticOperatorContext } from "./SqlBaseParser";
import { PredicateOperatorContext } from "./SqlBaseParser";
import { BooleanValueContext } from "./SqlBaseParser";
import { IntervalContext } from "./SqlBaseParser";
import { ErrorCapturingMultiUnitsIntervalContext } from "./SqlBaseParser";
import { MultiUnitsIntervalContext } from "./SqlBaseParser";
import { ErrorCapturingUnitToUnitIntervalContext } from "./SqlBaseParser";
import { UnitToUnitIntervalContext } from "./SqlBaseParser";
import { IntervalValueContext } from "./SqlBaseParser";
import { ColPositionContext } from "./SqlBaseParser";
import { DataTypeContext } from "./SqlBaseParser";
import { QualifiedColTypeWithPositionListContext } from "./SqlBaseParser";
import { QualifiedColTypeWithPositionContext } from "./SqlBaseParser";
import { ColTypeListContext } from "./SqlBaseParser";
import { ColTypeContext } from "./SqlBaseParser";
import { ComplexColTypeListContext } from "./SqlBaseParser";
import { ComplexColTypeContext } from "./SqlBaseParser";
import { WhenClauseContext } from "./SqlBaseParser";
import { WindowClauseContext } from "./SqlBaseParser";
import { NamedWindowContext } from "./SqlBaseParser";
import { WindowSpecContext } from "./SqlBaseParser";
import { WindowFrameContext } from "./SqlBaseParser";
import { FrameBoundContext } from "./SqlBaseParser";
import { QualifiedNameListContext } from "./SqlBaseParser";
import { FunctionNameContext } from "./SqlBaseParser";
import { QualifiedNameContext } from "./SqlBaseParser";
import { ErrorCapturingIdentifierContext } from "./SqlBaseParser";
import { ErrorCapturingIdentifierExtraContext } from "./SqlBaseParser";
import { IdentifierContext } from "./SqlBaseParser";
import { StrictIdentifierContext } from "./SqlBaseParser";
import { QuotedIdentifierContext } from "./SqlBaseParser";
import { NumberContext } from "./SqlBaseParser";
import { AlterColumnActionContext } from "./SqlBaseParser";
import { AnsiNonReservedContext } from "./SqlBaseParser";
import { StrictNonReservedContext } from "./SqlBaseParser";
import { NonReservedContext } from "./SqlBaseParser";

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SqlBaseParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SqlBaseVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by the `tableName`
   * labeled alternative in `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableName?: (ctx: TableNameContext) => Result;

  /**
   * Visit a parse tree produced by the `aliasedQuery`
   * labeled alternative in `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAliasedQuery?: (ctx: AliasedQueryContext) => Result;

  /**
   * Visit a parse tree produced by the `aliasedRelation`
   * labeled alternative in `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAliasedRelation?: (ctx: AliasedRelationContext) => Result;

  /**
   * Visit a parse tree produced by the `inlineTableDefault2`
   * labeled alternative in `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInlineTableDefault2?: (ctx: InlineTableDefault2Context) => Result;

  /**
   * Visit a parse tree produced by the `tableValuedFunction`
   * labeled alternative in `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableValuedFunction?: (ctx: TableValuedFunctionContext) => Result;

  /**
   * Visit a parse tree produced by the `exponentLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExponentLiteral?: (ctx: ExponentLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `decimalLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDecimalLiteral?: (ctx: DecimalLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `legacyDecimalLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLegacyDecimalLiteral?: (ctx: LegacyDecimalLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `integerLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIntegerLiteral?: (ctx: IntegerLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `bigIntLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBigIntLiteral?: (ctx: BigIntLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `smallIntLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSmallIntLiteral?: (ctx: SmallIntLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `tinyIntLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTinyIntLiteral?: (ctx: TinyIntLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `doubleLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDoubleLiteral?: (ctx: DoubleLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `floatLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFloatLiteral?: (ctx: FloatLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `bigDecimalLiteral`
   * labeled alternative in `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBigDecimalLiteral?: (ctx: BigDecimalLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `queryTermDefault`
   * labeled alternative in `SqlBaseParser.queryTerm`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQueryTermDefault?: (ctx: QueryTermDefaultContext) => Result;

  /**
   * Visit a parse tree produced by the `setOperation`
   * labeled alternative in `SqlBaseParser.queryTerm`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetOperation?: (ctx: SetOperationContext) => Result;

  /**
   * Visit a parse tree produced by the `insertOverwriteTable`
   * labeled alternative in `SqlBaseParser.insertInto`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInsertOverwriteTable?: (ctx: InsertOverwriteTableContext) => Result;

  /**
   * Visit a parse tree produced by the `insertIntoTable`
   * labeled alternative in `SqlBaseParser.insertInto`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInsertIntoTable?: (ctx: InsertIntoTableContext) => Result;

  /**
   * Visit a parse tree produced by the `insertOverwriteHiveDir`
   * labeled alternative in `SqlBaseParser.insertInto`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInsertOverwriteHiveDir?: (ctx: InsertOverwriteHiveDirContext) => Result;

  /**
   * Visit a parse tree produced by the `insertOverwriteDir`
   * labeled alternative in `SqlBaseParser.insertInto`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInsertOverwriteDir?: (ctx: InsertOverwriteDirContext) => Result;

  /**
   * Visit a parse tree produced by the `valueExpressionDefault`
   * labeled alternative in `SqlBaseParser.valueExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitValueExpressionDefault?: (ctx: ValueExpressionDefaultContext) => Result;

  /**
   * Visit a parse tree produced by the `arithmeticUnary`
   * labeled alternative in `SqlBaseParser.valueExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArithmeticUnary?: (ctx: ArithmeticUnaryContext) => Result;

  /**
   * Visit a parse tree produced by the `arithmeticBinary`
   * labeled alternative in `SqlBaseParser.valueExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArithmeticBinary?: (ctx: ArithmeticBinaryContext) => Result;

  /**
   * Visit a parse tree produced by the `comparison`
   * labeled alternative in `SqlBaseParser.valueExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComparison?: (ctx: ComparisonContext) => Result;

  /**
   * Visit a parse tree produced by the `partitionTransform`
   * labeled alternative in `SqlBaseParser.partitionField`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionTransform?: (ctx: PartitionTransformContext) => Result;

  /**
   * Visit a parse tree produced by the `partitionColumn`
   * labeled alternative in `SqlBaseParser.partitionField`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionColumn?: (ctx: PartitionColumnContext) => Result;

  /**
   * Visit a parse tree produced by the `queryPrimaryDefault`
   * labeled alternative in `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQueryPrimaryDefault?: (ctx: QueryPrimaryDefaultContext) => Result;

  /**
   * Visit a parse tree produced by the `fromStmt`
   * labeled alternative in `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFromStmt?: (ctx: FromStmtContext) => Result;

  /**
   * Visit a parse tree produced by the `table`
   * labeled alternative in `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTable?: (ctx: TableContext) => Result;

  /**
   * Visit a parse tree produced by the `inlineTableDefault1`
   * labeled alternative in `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInlineTableDefault1?: (ctx: InlineTableDefault1Context) => Result;

  /**
   * Visit a parse tree produced by the `subquery`
   * labeled alternative in `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSubquery?: (ctx: SubqueryContext) => Result;

  /**
   * Visit a parse tree produced by the `singleInsertQuery`
   * labeled alternative in `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleInsertQuery?: (ctx: SingleInsertQueryContext) => Result;

  /**
   * Visit a parse tree produced by the `multiInsertQuery`
   * labeled alternative in `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiInsertQuery?: (ctx: MultiInsertQueryContext) => Result;

  /**
   * Visit a parse tree produced by the `deleteFromTable`
   * labeled alternative in `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDeleteFromTable?: (ctx: DeleteFromTableContext) => Result;

  /**
   * Visit a parse tree produced by the `updateTable`
   * labeled alternative in `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUpdateTable?: (ctx: UpdateTableContext) => Result;

  /**
   * Visit a parse tree produced by the `mergeIntoTable`
   * labeled alternative in `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMergeIntoTable?: (ctx: MergeIntoTableContext) => Result;

  /**
   * Visit a parse tree produced by the `currentLike`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCurrentLike?: (ctx: CurrentLikeContext) => Result;

  /**
   * Visit a parse tree produced by the `searchedCase`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSearchedCase?: (ctx: SearchedCaseContext) => Result;

  /**
   * Visit a parse tree produced by the `simpleCase`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSimpleCase?: (ctx: SimpleCaseContext) => Result;

  /**
   * Visit a parse tree produced by the `cast`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCast?: (ctx: CastContext) => Result;

  /**
   * Visit a parse tree produced by the `struct`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStruct?: (ctx: StructContext) => Result;

  /**
   * Visit a parse tree produced by the `first`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFirst?: (ctx: FirstContext) => Result;

  /**
   * Visit a parse tree produced by the `last`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLast?: (ctx: LastContext) => Result;

  /**
   * Visit a parse tree produced by the `position`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosition?: (ctx: PositionContext) => Result;

  /**
   * Visit a parse tree produced by the `constantDefault`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstantDefault?: (ctx: ConstantDefaultContext) => Result;

  /**
   * Visit a parse tree produced by the `star`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStar?: (ctx: StarContext) => Result;

  /**
   * Visit a parse tree produced by the `rowConstructor`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRowConstructor?: (ctx: RowConstructorContext) => Result;

  /**
   * Visit a parse tree produced by the `subqueryExpression`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSubqueryExpression?: (ctx: SubqueryExpressionContext) => Result;

  /**
   * Visit a parse tree produced by the `functionCall`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionCall?: (ctx: FunctionCallContext) => Result;

  /**
   * Visit a parse tree produced by the `lambda`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLambda?: (ctx: LambdaContext) => Result;

  /**
   * Visit a parse tree produced by the `subscript`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSubscript?: (ctx: SubscriptContext) => Result;

  /**
   * Visit a parse tree produced by the `columnReference`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitColumnReference?: (ctx: ColumnReferenceContext) => Result;

  /**
   * Visit a parse tree produced by the `dereference`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDereference?: (ctx: DereferenceContext) => Result;

  /**
   * Visit a parse tree produced by the `postgresCast`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPostgresCast?: (ctx: PostgresCastContext) => Result;

  /**
   * Visit a parse tree produced by the `postgresJson`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPostgresJson?: (ctx: PostgresJsonContext) => Result;

  /**
   * Visit a parse tree produced by the `parenthesizedExpression`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitParenthesizedExpression?: (ctx: ParenthesizedExpressionContext) => Result;

  /**
   * Visit a parse tree produced by the `extract`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExtract?: (ctx: ExtractContext) => Result;

  /**
   * Visit a parse tree produced by the `substring`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSubstring?: (ctx: SubstringContext) => Result;

  /**
   * Visit a parse tree produced by the `trim`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTrim?: (ctx: TrimContext) => Result;

  /**
   * Visit a parse tree produced by the `overlay`
   * labeled alternative in `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOverlay?: (ctx: OverlayContext) => Result;

  /**
   * Visit a parse tree produced by the `unquotedIdentifier`
   * labeled alternative in `SqlBaseParser.strictIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnquotedIdentifier?: (ctx: UnquotedIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by the `quotedIdentifierAlternative`
   * labeled alternative in `SqlBaseParser.strictIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuotedIdentifierAlternative?: (ctx: QuotedIdentifierAlternativeContext) => Result;

  /**
   * Visit a parse tree produced by the `tableFileFormat`
   * labeled alternative in `SqlBaseParser.fileFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableFileFormat?: (ctx: TableFileFormatContext) => Result;

  /**
   * Visit a parse tree produced by the `genericFileFormat`
   * labeled alternative in `SqlBaseParser.fileFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGenericFileFormat?: (ctx: GenericFileFormatContext) => Result;

  /**
   * Visit a parse tree produced by the `sampleByPercentile`
   * labeled alternative in `SqlBaseParser.sampleMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSampleByPercentile?: (ctx: SampleByPercentileContext) => Result;

  /**
   * Visit a parse tree produced by the `sampleByRows`
   * labeled alternative in `SqlBaseParser.sampleMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSampleByRows?: (ctx: SampleByRowsContext) => Result;

  /**
   * Visit a parse tree produced by the `sampleByBucket`
   * labeled alternative in `SqlBaseParser.sampleMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSampleByBucket?: (ctx: SampleByBucketContext) => Result;

  /**
   * Visit a parse tree produced by the `sampleByBytes`
   * labeled alternative in `SqlBaseParser.sampleMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSampleByBytes?: (ctx: SampleByBytesContext) => Result;

  /**
   * Visit a parse tree produced by the `nullLiteral`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNullLiteral?: (ctx: NullLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `intervalLiteral`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIntervalLiteral?: (ctx: IntervalLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `typeConstructor`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTypeConstructor?: (ctx: TypeConstructorContext) => Result;

  /**
   * Visit a parse tree produced by the `numericLiteral`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNumericLiteral?: (ctx: NumericLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `booleanLiteral`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `stringLiteral`
   * labeled alternative in `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStringLiteral?: (ctx: StringLiteralContext) => Result;

  /**
   * Visit a parse tree produced by the `rowFormatSerde`
   * labeled alternative in `SqlBaseParser.rowFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRowFormatSerde?: (ctx: RowFormatSerdeContext) => Result;

  /**
   * Visit a parse tree produced by the `rowFormatDelimited`
   * labeled alternative in `SqlBaseParser.rowFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRowFormatDelimited?: (ctx: RowFormatDelimitedContext) => Result;

  /**
   * Visit a parse tree produced by the `complexDataType`
   * labeled alternative in `SqlBaseParser.dataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComplexDataType?: (ctx: ComplexDataTypeContext) => Result;

  /**
   * Visit a parse tree produced by the `yearMonthIntervalDataType`
   * labeled alternative in `SqlBaseParser.dataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitYearMonthIntervalDataType?: (ctx: YearMonthIntervalDataTypeContext) => Result;

  /**
   * Visit a parse tree produced by the `dayTimeIntervalDataType`
   * labeled alternative in `SqlBaseParser.dataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDayTimeIntervalDataType?: (ctx: DayTimeIntervalDataTypeContext) => Result;

  /**
   * Visit a parse tree produced by the `primitiveDataType`
   * labeled alternative in `SqlBaseParser.dataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimitiveDataType?: (ctx: PrimitiveDataTypeContext) => Result;

  /**
   * Visit a parse tree produced by the `transformQuerySpecification`
   * labeled alternative in `SqlBaseParser.querySpecification`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTransformQuerySpecification?: (ctx: TransformQuerySpecificationContext) => Result;

  /**
   * Visit a parse tree produced by the `regularQuerySpecification`
   * labeled alternative in `SqlBaseParser.querySpecification`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRegularQuerySpecification?: (ctx: RegularQuerySpecificationContext) => Result;

  /**
   * Visit a parse tree produced by the `errorIdent`
   * labeled alternative in `SqlBaseParser.errorCapturingIdentifierExtra`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorIdent?: (ctx: ErrorIdentContext) => Result;

  /**
   * Visit a parse tree produced by the `realIdent`
   * labeled alternative in `SqlBaseParser.errorCapturingIdentifierExtra`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRealIdent?: (ctx: RealIdentContext) => Result;

  /**
   * Visit a parse tree produced by the `windowRef`
   * labeled alternative in `SqlBaseParser.windowSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWindowRef?: (ctx: WindowRefContext) => Result;

  /**
   * Visit a parse tree produced by the `windowDef`
   * labeled alternative in `SqlBaseParser.windowSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWindowDef?: (ctx: WindowDefContext) => Result;

  /**
   * Visit a parse tree produced by the `identityTransform`
   * labeled alternative in `SqlBaseParser.transform`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentityTransform?: (ctx: IdentityTransformContext) => Result;

  /**
   * Visit a parse tree produced by the `applyTransform`
   * labeled alternative in `SqlBaseParser.transform`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitApplyTransform?: (ctx: ApplyTransformContext) => Result;

  /**
   * Visit a parse tree produced by the `statementDefault`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatementDefault?: (ctx: StatementDefaultContext) => Result;

  /**
   * Visit a parse tree produced by the `dmlStatement`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDmlStatement?: (ctx: DmlStatementContext) => Result;

  /**
   * Visit a parse tree produced by the `use`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUse?: (ctx: UseContext) => Result;

  /**
   * Visit a parse tree produced by the `createNamespace`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateNamespace?: (ctx: CreateNamespaceContext) => Result;

  /**
   * Visit a parse tree produced by the `setNamespaceProperties`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetNamespaceProperties?: (ctx: SetNamespacePropertiesContext) => Result;

  /**
   * Visit a parse tree produced by the `setNamespaceLocation`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetNamespaceLocation?: (ctx: SetNamespaceLocationContext) => Result;

  /**
   * Visit a parse tree produced by the `dropNamespace`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropNamespace?: (ctx: DropNamespaceContext) => Result;

  /**
   * Visit a parse tree produced by the `showNamespaces`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowNamespaces?: (ctx: ShowNamespacesContext) => Result;

  /**
   * Visit a parse tree produced by the `createTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateTable?: (ctx: CreateTableContext) => Result;

  /**
   * Visit a parse tree produced by the `createTableLike`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateTableLike?: (ctx: CreateTableLikeContext) => Result;

  /**
   * Visit a parse tree produced by the `replaceTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReplaceTable?: (ctx: ReplaceTableContext) => Result;

  /**
   * Visit a parse tree produced by the `analyze`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnalyze?: (ctx: AnalyzeContext) => Result;

  /**
   * Visit a parse tree produced by the `analyzeTables`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnalyzeTables?: (ctx: AnalyzeTablesContext) => Result;

  /**
   * Visit a parse tree produced by the `addTableColumns`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAddTableColumns?: (ctx: AddTableColumnsContext) => Result;

  /**
   * Visit a parse tree produced by the `renameTableColumn`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRenameTableColumn?: (ctx: RenameTableColumnContext) => Result;

  /**
   * Visit a parse tree produced by the `dropTableColumns`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropTableColumns?: (ctx: DropTableColumnsContext) => Result;

  /**
   * Visit a parse tree produced by the `renameTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRenameTable?: (ctx: RenameTableContext) => Result;

  /**
   * Visit a parse tree produced by the `setTableProperties`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetTableProperties?: (ctx: SetTablePropertiesContext) => Result;

  /**
   * Visit a parse tree produced by the `unsetTableProperties`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnsetTableProperties?: (ctx: UnsetTablePropertiesContext) => Result;

  /**
   * Visit a parse tree produced by the `alterTableAlterColumn`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAlterTableAlterColumn?: (ctx: AlterTableAlterColumnContext) => Result;

  /**
   * Visit a parse tree produced by the `hiveChangeColumn`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHiveChangeColumn?: (ctx: HiveChangeColumnContext) => Result;

  /**
   * Visit a parse tree produced by the `hiveReplaceColumns`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHiveReplaceColumns?: (ctx: HiveReplaceColumnsContext) => Result;

  /**
   * Visit a parse tree produced by the `setTableSerDe`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetTableSerDe?: (ctx: SetTableSerDeContext) => Result;

  /**
   * Visit a parse tree produced by the `addTablePartition`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAddTablePartition?: (ctx: AddTablePartitionContext) => Result;

  /**
   * Visit a parse tree produced by the `renameTablePartition`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRenameTablePartition?: (ctx: RenameTablePartitionContext) => Result;

  /**
   * Visit a parse tree produced by the `dropTablePartitions`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropTablePartitions?: (ctx: DropTablePartitionsContext) => Result;

  /**
   * Visit a parse tree produced by the `setTableLocation`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetTableLocation?: (ctx: SetTableLocationContext) => Result;

  /**
   * Visit a parse tree produced by the `recoverPartitions`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRecoverPartitions?: (ctx: RecoverPartitionsContext) => Result;

  /**
   * Visit a parse tree produced by the `dropTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropTable?: (ctx: DropTableContext) => Result;

  /**
   * Visit a parse tree produced by the `dropView`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropView?: (ctx: DropViewContext) => Result;

  /**
   * Visit a parse tree produced by the `createView`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateView?: (ctx: CreateViewContext) => Result;

  /**
   * Visit a parse tree produced by the `createTempViewUsing`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateTempViewUsing?: (ctx: CreateTempViewUsingContext) => Result;

  /**
   * Visit a parse tree produced by the `alterViewQuery`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAlterViewQuery?: (ctx: AlterViewQueryContext) => Result;

  /**
   * Visit a parse tree produced by the `createFunction`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateFunction?: (ctx: CreateFunctionContext) => Result;

  /**
   * Visit a parse tree produced by the `dropFunction`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDropFunction?: (ctx: DropFunctionContext) => Result;

  /**
   * Visit a parse tree produced by the `explain`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExplain?: (ctx: ExplainContext) => Result;

  /**
   * Visit a parse tree produced by the `showTables`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowTables?: (ctx: ShowTablesContext) => Result;

  /**
   * Visit a parse tree produced by the `showTableExtended`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowTableExtended?: (ctx: ShowTableExtendedContext) => Result;

  /**
   * Visit a parse tree produced by the `showTblProperties`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowTblProperties?: (ctx: ShowTblPropertiesContext) => Result;

  /**
   * Visit a parse tree produced by the `showColumns`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowColumns?: (ctx: ShowColumnsContext) => Result;

  /**
   * Visit a parse tree produced by the `showViews`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowViews?: (ctx: ShowViewsContext) => Result;

  /**
   * Visit a parse tree produced by the `showPartitions`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowPartitions?: (ctx: ShowPartitionsContext) => Result;

  /**
   * Visit a parse tree produced by the `showFunctions`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowFunctions?: (ctx: ShowFunctionsContext) => Result;

  /**
   * Visit a parse tree produced by the `showCreateTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowCreateTable?: (ctx: ShowCreateTableContext) => Result;

  /**
   * Visit a parse tree produced by the `showCurrentNamespace`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitShowCurrentNamespace?: (ctx: ShowCurrentNamespaceContext) => Result;

  /**
   * Visit a parse tree produced by the `describeFunction`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeFunction?: (ctx: DescribeFunctionContext) => Result;

  /**
   * Visit a parse tree produced by the `describeNamespace`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeNamespace?: (ctx: DescribeNamespaceContext) => Result;

  /**
   * Visit a parse tree produced by the `describeRelation`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeRelation?: (ctx: DescribeRelationContext) => Result;

  /**
   * Visit a parse tree produced by the `describeQuery`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeQuery?: (ctx: DescribeQueryContext) => Result;

  /**
   * Visit a parse tree produced by the `commentNamespace`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentNamespace?: (ctx: CommentNamespaceContext) => Result;

  /**
   * Visit a parse tree produced by the `commentTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentTable?: (ctx: CommentTableContext) => Result;

  /**
   * Visit a parse tree produced by the `refreshTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefreshTable?: (ctx: RefreshTableContext) => Result;

  /**
   * Visit a parse tree produced by the `refreshFunction`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefreshFunction?: (ctx: RefreshFunctionContext) => Result;

  /**
   * Visit a parse tree produced by the `refreshResource`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefreshResource?: (ctx: RefreshResourceContext) => Result;

  /**
   * Visit a parse tree produced by the `cacheTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCacheTable?: (ctx: CacheTableContext) => Result;

  /**
   * Visit a parse tree produced by the `uncacheTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUncacheTable?: (ctx: UncacheTableContext) => Result;

  /**
   * Visit a parse tree produced by the `clearCache`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitClearCache?: (ctx: ClearCacheContext) => Result;

  /**
   * Visit a parse tree produced by the `loadData`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLoadData?: (ctx: LoadDataContext) => Result;

  /**
   * Visit a parse tree produced by the `truncateTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTruncateTable?: (ctx: TruncateTableContext) => Result;

  /**
   * Visit a parse tree produced by the `repairTable`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRepairTable?: (ctx: RepairTableContext) => Result;

  /**
   * Visit a parse tree produced by the `manageResource`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitManageResource?: (ctx: ManageResourceContext) => Result;

  /**
   * Visit a parse tree produced by the `failNativeCommand`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFailNativeCommand?: (ctx: FailNativeCommandContext) => Result;

  /**
   * Visit a parse tree produced by the `setTimeZone`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetTimeZone?: (ctx: SetTimeZoneContext) => Result;

  /**
   * Visit a parse tree produced by the `setQuotedConfiguration`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetQuotedConfiguration?: (ctx: SetQuotedConfigurationContext) => Result;

  /**
   * Visit a parse tree produced by the `setConfiguration`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetConfiguration?: (ctx: SetConfigurationContext) => Result;

  /**
   * Visit a parse tree produced by the `resetQuotedConfiguration`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitResetQuotedConfiguration?: (ctx: ResetQuotedConfigurationContext) => Result;

  /**
   * Visit a parse tree produced by the `resetConfiguration`
   * labeled alternative in `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitResetConfiguration?: (ctx: ResetConfigurationContext) => Result;

  /**
   * Visit a parse tree produced by the `joinCriteriaOn`
   * labeled alternative in `SqlBaseParser.joinCriteria`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitJoinCriteriaOn?: (ctx: JoinCriteriaOnContext) => Result;

  /**
   * Visit a parse tree produced by the `joinCriteriaUsing`
   * labeled alternative in `SqlBaseParser.joinCriteria`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitJoinCriteriaUsing?: (ctx: JoinCriteriaUsingContext) => Result;

  /**
   * Visit a parse tree produced by the `logicalNot`
   * labeled alternative in `SqlBaseParser.booleanExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLogicalNot?: (ctx: LogicalNotContext) => Result;

  /**
   * Visit a parse tree produced by the `exists`
   * labeled alternative in `SqlBaseParser.booleanExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExists?: (ctx: ExistsContext) => Result;

  /**
   * Visit a parse tree produced by the `predicated`
   * labeled alternative in `SqlBaseParser.booleanExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPredicated?: (ctx: PredicatedContext) => Result;

  /**
   * Visit a parse tree produced by the `logicalBinary`
   * labeled alternative in `SqlBaseParser.booleanExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLogicalBinary?: (ctx: LogicalBinaryContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleStatement?: (ctx: SingleStatementContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleExpression?: (ctx: SingleExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleTableIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleTableIdentifier?: (ctx: SingleTableIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleMultipartIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleMultipartIdentifier?: (ctx: SingleMultipartIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleFunctionIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleFunctionIdentifier?: (ctx: SingleFunctionIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleDataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleDataType?: (ctx: SingleDataTypeContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.singleTableSchema`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSingleTableSchema?: (ctx: SingleTableSchemaContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.statement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStatement?: (ctx: StatementContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.configKey`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConfigKey?: (ctx: ConfigKeyContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.configValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConfigValue?: (ctx: ConfigValueContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.unsupportedHiveNativeCommands`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnsupportedHiveNativeCommands?: (ctx: UnsupportedHiveNativeCommandsContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.createTableHeader`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateTableHeader?: (ctx: CreateTableHeaderContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.replaceTableHeader`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReplaceTableHeader?: (ctx: ReplaceTableHeaderContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.bucketSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBucketSpec?: (ctx: BucketSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.skewSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSkewSpec?: (ctx: SkewSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.locationSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLocationSpec?: (ctx: LocationSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.commentSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCommentSpec?: (ctx: CommentSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.query`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuery?: (ctx: QueryContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.insertInto`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInsertInto?: (ctx: InsertIntoContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.partitionSpecLocation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionSpecLocation?: (ctx: PartitionSpecLocationContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.partitionSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionSpec?: (ctx: PartitionSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.partitionVal`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionVal?: (ctx: PartitionValContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.namespace`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamespace?: (ctx: NamespaceContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.describeFuncName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeFuncName?: (ctx: DescribeFuncNameContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.describeColName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDescribeColName?: (ctx: DescribeColNameContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.ctes`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCtes?: (ctx: CtesContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.namedQuery`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamedQuery?: (ctx: NamedQueryContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tableProvider`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableProvider?: (ctx: TableProviderContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.createTableClauses`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateTableClauses?: (ctx: CreateTableClausesContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tablePropertyList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTablePropertyList?: (ctx: TablePropertyListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tableProperty`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableProperty?: (ctx: TablePropertyContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tablePropertyKey`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTablePropertyKey?: (ctx: TablePropertyKeyContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tablePropertyValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTablePropertyValue?: (ctx: TablePropertyValueContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.constantList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstantList?: (ctx: ConstantListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.nestedConstantList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNestedConstantList?: (ctx: NestedConstantListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.createFileFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCreateFileFormat?: (ctx: CreateFileFormatContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.fileFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFileFormat?: (ctx: FileFormatContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.storageHandler`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStorageHandler?: (ctx: StorageHandlerContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.resource`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitResource?: (ctx: ResourceContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.dmlStatementNoWith`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDmlStatementNoWith?: (ctx: DmlStatementNoWithContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.queryOrganization`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQueryOrganization?: (ctx: QueryOrganizationContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.multiInsertQueryBody`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiInsertQueryBody?: (ctx: MultiInsertQueryBodyContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.queryTerm`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQueryTerm?: (ctx: QueryTermContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.queryPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQueryPrimary?: (ctx: QueryPrimaryContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.sortItem`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSortItem?: (ctx: SortItemContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.fromStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFromStatement?: (ctx: FromStatementContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.fromStatementBody`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFromStatementBody?: (ctx: FromStatementBodyContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.querySpecification`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuerySpecification?: (ctx: QuerySpecificationContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.transformClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTransformClause?: (ctx: TransformClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.selectClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSelectClause?: (ctx: SelectClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.setClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetClause?: (ctx: SetClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.matchedClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMatchedClause?: (ctx: MatchedClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.notMatchedClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNotMatchedClause?: (ctx: NotMatchedClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.matchedAction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMatchedAction?: (ctx: MatchedActionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.notMatchedAction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNotMatchedAction?: (ctx: NotMatchedActionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.assignmentList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignmentList?: (ctx: AssignmentListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.assignment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAssignment?: (ctx: AssignmentContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.whereClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhereClause?: (ctx: WhereClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.havingClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHavingClause?: (ctx: HavingClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.hint`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHint?: (ctx: HintContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.hintStatement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitHintStatement?: (ctx: HintStatementContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.fromClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFromClause?: (ctx: FromClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.aggregationClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAggregationClause?: (ctx: AggregationClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.groupByClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGroupByClause?: (ctx: GroupByClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.groupingAnalytics`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGroupingAnalytics?: (ctx: GroupingAnalyticsContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.groupingElement`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGroupingElement?: (ctx: GroupingElementContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.groupingSet`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitGroupingSet?: (ctx: GroupingSetContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.pivotClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPivotClause?: (ctx: PivotClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.pivotColumn`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPivotColumn?: (ctx: PivotColumnContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.pivotValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPivotValue?: (ctx: PivotValueContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.lateralView`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitLateralView?: (ctx: LateralViewContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.setQuantifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSetQuantifier?: (ctx: SetQuantifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.relation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRelation?: (ctx: RelationContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.joinRelation`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitJoinRelation?: (ctx: JoinRelationContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.joinType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitJoinType?: (ctx: JoinTypeContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.joinCriteria`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitJoinCriteria?: (ctx: JoinCriteriaContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.sample`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSample?: (ctx: SampleContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.sampleMethod`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSampleMethod?: (ctx: SampleMethodContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.identifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierList?: (ctx: IdentifierListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.identifierSeq`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierSeq?: (ctx: IdentifierSeqContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.orderedIdentifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrderedIdentifierList?: (ctx: OrderedIdentifierListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.orderedIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOrderedIdentifier?: (ctx: OrderedIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.identifierCommentList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierCommentList?: (ctx: IdentifierCommentListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.identifierComment`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifierComment?: (ctx: IdentifierCommentContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.relationPrimary`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRelationPrimary?: (ctx: RelationPrimaryContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.inlineTable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInlineTable?: (ctx: InlineTableContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.functionTable`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionTable?: (ctx: FunctionTableContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tableAlias`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableAlias?: (ctx: TableAliasContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.rowFormat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRowFormat?: (ctx: RowFormatContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.multipartIdentifierList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultipartIdentifierList?: (ctx: MultipartIdentifierListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.multipartIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultipartIdentifier?: (ctx: MultipartIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.tableIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTableIdentifier?: (ctx: TableIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.functionIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionIdentifier?: (ctx: FunctionIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.namedExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamedExpression?: (ctx: NamedExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.namedExpressionSeq`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamedExpressionSeq?: (ctx: NamedExpressionSeqContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.partitionFieldList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionFieldList?: (ctx: PartitionFieldListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.partitionField`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPartitionField?: (ctx: PartitionFieldContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.transform`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTransform?: (ctx: TransformContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.transformArgument`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTransformArgument?: (ctx: TransformArgumentContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpression?: (ctx: ExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.expressionSeq`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExpressionSeq?: (ctx: ExpressionSeqContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.booleanExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBooleanExpression?: (ctx: BooleanExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.predicate`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPredicate?: (ctx: PredicateContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.valueExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitValueExpression?: (ctx: ValueExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.primaryExpression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.constant`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitConstant?: (ctx: ConstantContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.comparisonOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComparisonOperator?: (ctx: ComparisonOperatorContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.arithmeticOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitArithmeticOperator?: (ctx: ArithmeticOperatorContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.predicateOperator`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPredicateOperator?: (ctx: PredicateOperatorContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.booleanValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitBooleanValue?: (ctx: BooleanValueContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.interval`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitInterval?: (ctx: IntervalContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.errorCapturingMultiUnitsInterval`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorCapturingMultiUnitsInterval?: (ctx: ErrorCapturingMultiUnitsIntervalContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.multiUnitsInterval`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitMultiUnitsInterval?: (ctx: MultiUnitsIntervalContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.errorCapturingUnitToUnitInterval`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorCapturingUnitToUnitInterval?: (ctx: ErrorCapturingUnitToUnitIntervalContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.unitToUnitInterval`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitUnitToUnitInterval?: (ctx: UnitToUnitIntervalContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.intervalValue`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIntervalValue?: (ctx: IntervalValueContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.colPosition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitColPosition?: (ctx: ColPositionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.dataType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDataType?: (ctx: DataTypeContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.qualifiedColTypeWithPositionList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedColTypeWithPositionList?: (ctx: QualifiedColTypeWithPositionListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.qualifiedColTypeWithPosition`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedColTypeWithPosition?: (ctx: QualifiedColTypeWithPositionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.colTypeList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitColTypeList?: (ctx: ColTypeListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.colType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitColType?: (ctx: ColTypeContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.complexColTypeList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComplexColTypeList?: (ctx: ComplexColTypeListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.complexColType`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitComplexColType?: (ctx: ComplexColTypeContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.whenClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWhenClause?: (ctx: WhenClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.windowClause`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWindowClause?: (ctx: WindowClauseContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.namedWindow`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNamedWindow?: (ctx: NamedWindowContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.windowSpec`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWindowSpec?: (ctx: WindowSpecContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.windowFrame`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitWindowFrame?: (ctx: WindowFrameContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.frameBound`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFrameBound?: (ctx: FrameBoundContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.qualifiedNameList`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedNameList?: (ctx: QualifiedNameListContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.functionName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitFunctionName?: (ctx: FunctionNameContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.qualifiedName`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQualifiedName?: (ctx: QualifiedNameContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.errorCapturingIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorCapturingIdentifier?: (ctx: ErrorCapturingIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.errorCapturingIdentifierExtra`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitErrorCapturingIdentifierExtra?: (ctx: ErrorCapturingIdentifierExtraContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.identifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIdentifier?: (ctx: IdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.strictIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStrictIdentifier?: (ctx: StrictIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.quotedIdentifier`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitQuotedIdentifier?: (ctx: QuotedIdentifierContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.number`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNumber?: (ctx: NumberContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.alterColumnAction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAlterColumnAction?: (ctx: AlterColumnActionContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.ansiNonReserved`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnsiNonReserved?: (ctx: AnsiNonReservedContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.strictNonReserved`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStrictNonReserved?: (ctx: StrictNonReservedContext) => Result;

  /**
   * Visit a parse tree produced by `SqlBaseParser.nonReserved`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNonReserved?: (ctx: NonReservedContext) => Result;
}
