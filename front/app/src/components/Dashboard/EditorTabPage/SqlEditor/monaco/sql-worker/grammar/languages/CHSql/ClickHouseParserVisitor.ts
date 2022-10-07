// Generated from grammar/clickhouse/ClickHouseParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { ExistsDatabaseStmtContext } from "./ClickHouseParser";
import { ExistsTableStmtContext } from "./ClickHouseParser";
import { ColumnExprCaseContext } from "./ClickHouseParser";
import { ColumnExprCastContext } from "./ClickHouseParser";
import { ColumnExprDateContext } from "./ClickHouseParser";
import { ColumnExprExtractContext } from "./ClickHouseParser";
import { ColumnExprIntervalContext } from "./ClickHouseParser";
import { ColumnExprSubstringContext } from "./ClickHouseParser";
import { ColumnExprTimestampContext } from "./ClickHouseParser";
import { ColumnExprTrimContext } from "./ClickHouseParser";
import { ColumnExprWinFunctionContext } from "./ClickHouseParser";
import { ColumnExprWinFunctionTargetContext } from "./ClickHouseParser";
import { ColumnExprFunctionContext } from "./ClickHouseParser";
import { ColumnExprLiteralContext } from "./ClickHouseParser";
import { ColumnExprArrayAccessContext } from "./ClickHouseParser";
import { ColumnExprTupleAccessContext } from "./ClickHouseParser";
import { ColumnExprNegateContext } from "./ClickHouseParser";
import { ColumnExprPrecedence1Context } from "./ClickHouseParser";
import { ColumnExprPrecedence2Context } from "./ClickHouseParser";
import { ColumnExprPrecedence3Context } from "./ClickHouseParser";
import { ColumnExprIsNullContext } from "./ClickHouseParser";
import { ColumnExprNotContext } from "./ClickHouseParser";
import { ColumnExprAndContext } from "./ClickHouseParser";
import { ColumnExprOrContext } from "./ClickHouseParser";
import { ColumnExprBetweenContext } from "./ClickHouseParser";
import { ColumnExprTernaryOpContext } from "./ClickHouseParser";
import { ColumnExprAliasContext } from "./ClickHouseParser";
import { ColumnExprAsteriskContext } from "./ClickHouseParser";
import { ColumnExprSubqueryContext } from "./ClickHouseParser";
import { ColumnExprParensContext } from "./ClickHouseParser";
import { ColumnExprTupleContext } from "./ClickHouseParser";
import { ColumnExprArrayContext } from "./ClickHouseParser";
import { ColumnExprIdentifierContext } from "./ClickHouseParser";
import { ColumnsExprAsteriskContext } from "./ClickHouseParser";
import { ColumnsExprSubqueryContext } from "./ClickHouseParser";
import { ColumnsExprColumnContext } from "./ClickHouseParser";
import { AttachDictionaryStmtContext } from "./ClickHouseParser";
import { JoinExprOpContext } from "./ClickHouseParser";
import { JoinExprCrossOpContext } from "./ClickHouseParser";
import { JoinExprTableContext } from "./ClickHouseParser";
import { JoinExprParensContext } from "./ClickHouseParser";
import { DropDatabaseStmtContext } from "./ClickHouseParser";
import { DropTableStmtContext } from "./ClickHouseParser";
import { ExplainASTStmtContext } from "./ClickHouseParser";
import { ExplainSyntaxStmtContext } from "./ClickHouseParser";
import { TableElementExprColumnContext } from "./ClickHouseParser";
import { TableElementExprConstraintContext } from "./ClickHouseParser";
import { TableElementExprIndexContext } from "./ClickHouseParser";
import { TableElementExprProjectionContext } from "./ClickHouseParser";
import { CreateDatabaseStmtContext } from "./ClickHouseParser";
import { CreateDictionaryStmtContext } from "./ClickHouseParser";
import { CreateLiveViewStmtContext } from "./ClickHouseParser";
import { CreateMaterializedViewStmtContext } from "./ClickHouseParser";
import { CreateTableStmtContext } from "./ClickHouseParser";
import { CreateViewStmtContext } from "./ClickHouseParser";
import { JoinOpInnerContext } from "./ClickHouseParser";
import { JoinOpLeftRightContext } from "./ClickHouseParser";
import { JoinOpFullContext } from "./ClickHouseParser";
import { TableExprIdentifierContext } from "./ClickHouseParser";
import { TableExprFunctionContext } from "./ClickHouseParser";
import { TableExprSubqueryContext } from "./ClickHouseParser";
import { TableExprAliasContext } from "./ClickHouseParser";
import { AlterTableClauseAddColumnContext } from "./ClickHouseParser";
import { AlterTableClauseAddIndexContext } from "./ClickHouseParser";
import { AlterTableClauseAddProjectionContext } from "./ClickHouseParser";
import { AlterTableClauseAttachContext } from "./ClickHouseParser";
import { AlterTableClauseClearColumnContext } from "./ClickHouseParser";
import { AlterTableClauseClearIndexContext } from "./ClickHouseParser";
import { AlterTableClauseClearProjectionContext } from "./ClickHouseParser";
import { AlterTableClauseCommentContext } from "./ClickHouseParser";
import { AlterTableClauseDeleteContext } from "./ClickHouseParser";
import { AlterTableClauseDetachContext } from "./ClickHouseParser";
import { AlterTableClauseDropColumnContext } from "./ClickHouseParser";
import { AlterTableClauseDropIndexContext } from "./ClickHouseParser";
import { AlterTableClauseDropProjectionContext } from "./ClickHouseParser";
import { AlterTableClauseDropPartitionContext } from "./ClickHouseParser";
import { AlterTableClauseFreezePartitionContext } from "./ClickHouseParser";
import { AlterTableClauseMaterializeIndexContext } from "./ClickHouseParser";
import { AlterTableClauseMaterializeProjectionContext } from "./ClickHouseParser";
import { AlterTableClauseModifyCodecContext } from "./ClickHouseParser";
import { AlterTableClauseModifyCommentContext } from "./ClickHouseParser";
import { AlterTableClauseModifyRemoveContext } from "./ClickHouseParser";
import { AlterTableClauseModifyContext } from "./ClickHouseParser";
import { AlterTableClauseModifyOrderByContext } from "./ClickHouseParser";
import { AlterTableClauseModifyTTLContext } from "./ClickHouseParser";
import { AlterTableClauseMovePartitionContext } from "./ClickHouseParser";
import { AlterTableClauseRemoveTTLContext } from "./ClickHouseParser";
import { AlterTableClauseRenameContext } from "./ClickHouseParser";
import { AlterTableClauseReplaceContext } from "./ClickHouseParser";
import { AlterTableClauseUpdateContext } from "./ClickHouseParser";
import { ShowCreateDatabaseStmtContext } from "./ClickHouseParser";
import { ShowCreateDictionaryStmtContext } from "./ClickHouseParser";
import { ShowCreateTableStmtContext } from "./ClickHouseParser";
import { ShowDatabasesStmtContext } from "./ClickHouseParser";
import { ShowDictionariesStmtContext } from "./ClickHouseParser";
import { ShowTablesStmtContext } from "./ClickHouseParser";
import { RegularQuerySpecificationContext } from "./ClickHouseParser";
import { SchemaDescriptionClauseContext } from "./ClickHouseParser";
import { SchemaAsTableClauseContext } from "./ClickHouseParser";
import { SchemaAsFunctionClauseContext } from "./ClickHouseParser";
import { KillMutationStmtContext } from "./ClickHouseParser";
import { DataClauseFormatContext } from "./ClickHouseParser";
import { DataClauseValuesContext } from "./ClickHouseParser";
import { DataClauseSelectContext } from "./ClickHouseParser";
import { FrameStartContext } from "./ClickHouseParser";
import { FrameBetweenContext } from "./ClickHouseParser";
import { ColumnTypeExprSimpleContext } from "./ClickHouseParser";
import { ColumnTypeExprNestedContext } from "./ClickHouseParser";
import { ColumnTypeExprEnumContext } from "./ClickHouseParser";
import { ColumnTypeExprComplexContext } from "./ClickHouseParser";
import { ColumnTypeExprParamContext } from "./ClickHouseParser";
import { AlterTableStmtContext } from "./ClickHouseParser";
import { SqlContext } from "./ClickHouseParser";
import { QueryStmtContext } from "./ClickHouseParser";
import { QueryContext } from "./ClickHouseParser";
import { AlterStmtContext } from "./ClickHouseParser";
import { AlterTableClauseContext } from "./ClickHouseParser";
import { AssignmentExprListContext } from "./ClickHouseParser";
import { AssignmentExprContext } from "./ClickHouseParser";
import { TableColumnPropertyTypeContext } from "./ClickHouseParser";
import { PartitionClauseContext } from "./ClickHouseParser";
import { AttachStmtContext } from "./ClickHouseParser";
import { CheckStmtContext } from "./ClickHouseParser";
import { CreateStmtContext } from "./ClickHouseParser";
import { DictionarySchemaClauseContext } from "./ClickHouseParser";
import { DictionaryAttrDfntContext } from "./ClickHouseParser";
import { DictionaryEngineClauseContext } from "./ClickHouseParser";
import { DictionaryPrimaryKeyClauseContext } from "./ClickHouseParser";
import { DictionaryArgExprContext } from "./ClickHouseParser";
import { SourceClauseContext } from "./ClickHouseParser";
import { LifetimeClauseContext } from "./ClickHouseParser";
import { LayoutClauseContext } from "./ClickHouseParser";
import { RangeClauseContext } from "./ClickHouseParser";
import { DictionarySettingsClauseContext } from "./ClickHouseParser";
import { ClusterClauseContext } from "./ClickHouseParser";
import { UuidClauseContext } from "./ClickHouseParser";
import { DestinationClauseContext } from "./ClickHouseParser";
import { SubqueryClauseContext } from "./ClickHouseParser";
import { TableSchemaClauseContext } from "./ClickHouseParser";
import { EngineClauseContext } from "./ClickHouseParser";
import { PartitionByClauseContext } from "./ClickHouseParser";
import { PrimaryKeyClauseContext } from "./ClickHouseParser";
import { SampleByClauseContext } from "./ClickHouseParser";
import { TtlClauseContext } from "./ClickHouseParser";
import { EngineExprContext } from "./ClickHouseParser";
import { TableElementExprContext } from "./ClickHouseParser";
import { TableColumnDfntContext } from "./ClickHouseParser";
import { TableColumnPropertyExprContext } from "./ClickHouseParser";
import { TableIndexDfntContext } from "./ClickHouseParser";
import { TableProjectionDfntContext } from "./ClickHouseParser";
import { CodecExprContext } from "./ClickHouseParser";
import { CodecArgExprContext } from "./ClickHouseParser";
import { TtlExprContext } from "./ClickHouseParser";
import { DescribeStmtContext } from "./ClickHouseParser";
import { DropStmtContext } from "./ClickHouseParser";
import { ExistsStmtContext } from "./ClickHouseParser";
import { ExplainStmtContext } from "./ClickHouseParser";
import { InsertStmtContext } from "./ClickHouseParser";
import { ColumnsClauseContext } from "./ClickHouseParser";
import { DataClauseContext } from "./ClickHouseParser";
import { KillStmtContext } from "./ClickHouseParser";
import { OptimizeStmtContext } from "./ClickHouseParser";
import { RenameStmtContext } from "./ClickHouseParser";
import { ProjectionSelectStmtContext } from "./ClickHouseParser";
import { SelectUnionStmtContext } from "./ClickHouseParser";
import { SelectStmtWithParensContext } from "./ClickHouseParser";
import { SelectStmtContext } from "./ClickHouseParser";
import { WithClauseContext } from "./ClickHouseParser";
import { TopClauseContext } from "./ClickHouseParser";
import { FromClauseContext } from "./ClickHouseParser";
import { ArrayJoinClauseContext } from "./ClickHouseParser";
import { WindowClauseContext } from "./ClickHouseParser";
import { PrewhereClauseContext } from "./ClickHouseParser";
import { WhereClauseContext } from "./ClickHouseParser";
import { GroupByClauseContext } from "./ClickHouseParser";
import { HavingClauseContext } from "./ClickHouseParser";
import { OrderByClauseContext } from "./ClickHouseParser";
import { ProjectionOrderByClauseContext } from "./ClickHouseParser";
import { LimitByClauseContext } from "./ClickHouseParser";
import { LimitClauseContext } from "./ClickHouseParser";
import { SettingsClauseContext } from "./ClickHouseParser";
import { JoinExprContext } from "./ClickHouseParser";
import { JoinOpContext } from "./ClickHouseParser";
import { JoinOpCrossContext } from "./ClickHouseParser";
import { JoinConstraintClauseContext } from "./ClickHouseParser";
import { SampleClauseContext } from "./ClickHouseParser";
import { LimitExprContext } from "./ClickHouseParser";
import { OrderExprListContext } from "./ClickHouseParser";
import { OrderExprContext } from "./ClickHouseParser";
import { RatioExprContext } from "./ClickHouseParser";
import { SettingExprListContext } from "./ClickHouseParser";
import { SettingExprContext } from "./ClickHouseParser";
import { WindowExprContext } from "./ClickHouseParser";
import { WinPartitionByClauseContext } from "./ClickHouseParser";
import { WinOrderByClauseContext } from "./ClickHouseParser";
import { WinFrameClauseContext } from "./ClickHouseParser";
import { WinFrameExtendContext } from "./ClickHouseParser";
import { WinFrameBoundContext } from "./ClickHouseParser";
import { SetStmtContext } from "./ClickHouseParser";
import { ShowStmtContext } from "./ClickHouseParser";
import { SystemStmtContext } from "./ClickHouseParser";
import { TruncateStmtContext } from "./ClickHouseParser";
import { UseStmtContext } from "./ClickHouseParser";
import { WatchStmtContext } from "./ClickHouseParser";
import { ColumnTypeExprContext } from "./ClickHouseParser";
import { ColumnExprListContext } from "./ClickHouseParser";
import { ColumnsExprContext } from "./ClickHouseParser";
import { ColumnExprContext } from "./ClickHouseParser";
import { ColumnArgListContext } from "./ClickHouseParser";
import { ColumnArgExprContext } from "./ClickHouseParser";
import { ColumnLambdaExprContext } from "./ClickHouseParser";
import { ColumnIdentifierContext } from "./ClickHouseParser";
import { NestedIdentifierContext } from "./ClickHouseParser";
import { TableExprContext } from "./ClickHouseParser";
import { TableFunctionExprContext } from "./ClickHouseParser";
import { TableIdentifierContext } from "./ClickHouseParser";
import { TableArgListContext } from "./ClickHouseParser";
import { TableArgExprContext } from "./ClickHouseParser";
import { DatabaseIdentifierContext } from "./ClickHouseParser";
import { FloatingLiteralContext } from "./ClickHouseParser";
import { NumberLiteralContext } from "./ClickHouseParser";
import { LiteralContext } from "./ClickHouseParser";
import { IntervalContext } from "./ClickHouseParser";
import { KeywordContext } from "./ClickHouseParser";
import { KeywordForAliasContext } from "./ClickHouseParser";
import { AliasContext } from "./ClickHouseParser";
import { IdentifierContext } from "./ClickHouseParser";
import { IdentifierOrNullContext } from "./ClickHouseParser";
import { EnumValueContext } from "./ClickHouseParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ClickHouseParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ClickHouseParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `ExistsDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExistsDatabaseStmt?: (ctx: ExistsDatabaseStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExistsTableStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExistsTableStmt?: (ctx: ExistsTableStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprCase`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprCase?: (ctx: ColumnExprCaseContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprCast`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprCast?: (ctx: ColumnExprCastContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprDate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprDate?: (ctx: ColumnExprDateContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprExtract`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprExtract?: (ctx: ColumnExprExtractContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprInterval`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprInterval?: (ctx: ColumnExprIntervalContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprSubstring`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprSubstring?: (ctx: ColumnExprSubstringContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprTimestamp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprTimestamp?: (ctx: ColumnExprTimestampContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprTrim`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprTrim?: (ctx: ColumnExprTrimContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprWinFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprWinFunction?: (ctx: ColumnExprWinFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprWinFunctionTarget`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprWinFunctionTarget?: (ctx: ColumnExprWinFunctionTargetContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprFunction?: (ctx: ColumnExprFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprLiteral`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprLiteral?: (ctx: ColumnExprLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprArrayAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprArrayAccess?: (ctx: ColumnExprArrayAccessContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprTupleAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprTupleAccess?: (ctx: ColumnExprTupleAccessContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprNegate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprNegate?: (ctx: ColumnExprNegateContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprPrecedence1`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprPrecedence1?: (ctx: ColumnExprPrecedence1Context) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprPrecedence2`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprPrecedence2?: (ctx: ColumnExprPrecedence2Context) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprPrecedence3`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprPrecedence3?: (ctx: ColumnExprPrecedence3Context) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprIsNull`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprIsNull?: (ctx: ColumnExprIsNullContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprNot`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprNot?: (ctx: ColumnExprNotContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprAnd`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprAnd?: (ctx: ColumnExprAndContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprOr`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprOr?: (ctx: ColumnExprOrContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprBetween`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprBetween?: (ctx: ColumnExprBetweenContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprTernaryOp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprTernaryOp?: (ctx: ColumnExprTernaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprAlias`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprAlias?: (ctx: ColumnExprAliasContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprAsterisk?: (ctx: ColumnExprAsteriskContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprSubquery?: (ctx: ColumnExprSubqueryContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprParens`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprParens?: (ctx: ColumnExprParensContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprTuple`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprTuple?: (ctx: ColumnExprTupleContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprArray`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprArray?: (ctx: ColumnExprArrayContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnExprIdentifier`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprIdentifier?: (ctx: ColumnExprIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnsExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnsExprAsterisk?: (ctx: ColumnsExprAsteriskContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnsExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnsExprSubquery?: (ctx: ColumnsExprSubqueryContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnsExprColumn`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnsExprColumn?: (ctx: ColumnsExprColumnContext) => Result;

	/**
	 * Visit a parse tree produced by the `AttachDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttachDictionaryStmt?: (ctx: AttachDictionaryStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinExprOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinExprOp?: (ctx: JoinExprOpContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinExprCrossOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinExprCrossOp?: (ctx: JoinExprCrossOpContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinExprTable`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinExprTable?: (ctx: JoinExprTableContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinExprParens`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinExprParens?: (ctx: JoinExprParensContext) => Result;

	/**
	 * Visit a parse tree produced by the `DropDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropDatabaseStmt?: (ctx: DropDatabaseStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `DropTableStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropTableStmt?: (ctx: DropTableStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExplainASTStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplainASTStmt?: (ctx: ExplainASTStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `ExplainSyntaxStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplainSyntaxStmt?: (ctx: ExplainSyntaxStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableElementExprColumn`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementExprColumn?: (ctx: TableElementExprColumnContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableElementExprConstraint`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementExprConstraint?: (ctx: TableElementExprConstraintContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableElementExprIndex`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementExprIndex?: (ctx: TableElementExprIndexContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableElementExprProjection`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementExprProjection?: (ctx: TableElementExprProjectionContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateDatabaseStmt?: (ctx: CreateDatabaseStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateDictionaryStmt?: (ctx: CreateDictionaryStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateLiveViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateLiveViewStmt?: (ctx: CreateLiveViewStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateMaterializedViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateMaterializedViewStmt?: (ctx: CreateMaterializedViewStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateTableStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTableStmt?: (ctx: CreateTableStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `CreateViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateViewStmt?: (ctx: CreateViewStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinOpInner`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinOpInner?: (ctx: JoinOpInnerContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinOpLeftRight`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinOpLeftRight?: (ctx: JoinOpLeftRightContext) => Result;

	/**
	 * Visit a parse tree produced by the `JoinOpFull`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinOpFull?: (ctx: JoinOpFullContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableExprIdentifier`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableExprIdentifier?: (ctx: TableExprIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableExprFunction`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableExprFunction?: (ctx: TableExprFunctionContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableExprSubquery`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableExprSubquery?: (ctx: TableExprSubqueryContext) => Result;

	/**
	 * Visit a parse tree produced by the `TableExprAlias`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableExprAlias?: (ctx: TableExprAliasContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseAddColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseAddColumn?: (ctx: AlterTableClauseAddColumnContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseAddIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseAddIndex?: (ctx: AlterTableClauseAddIndexContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseAddProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseAddProjection?: (ctx: AlterTableClauseAddProjectionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseAttach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseAttach?: (ctx: AlterTableClauseAttachContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseClearColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseClearColumn?: (ctx: AlterTableClauseClearColumnContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseClearIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseClearIndex?: (ctx: AlterTableClauseClearIndexContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseClearProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseClearProjection?: (ctx: AlterTableClauseClearProjectionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseComment?: (ctx: AlterTableClauseCommentContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDelete`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDelete?: (ctx: AlterTableClauseDeleteContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDetach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDetach?: (ctx: AlterTableClauseDetachContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDropColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDropColumn?: (ctx: AlterTableClauseDropColumnContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDropIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDropIndex?: (ctx: AlterTableClauseDropIndexContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDropProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDropProjection?: (ctx: AlterTableClauseDropProjectionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseDropPartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseDropPartition?: (ctx: AlterTableClauseDropPartitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseFreezePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseFreezePartition?: (ctx: AlterTableClauseFreezePartitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseMaterializeIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseMaterializeIndex?: (ctx: AlterTableClauseMaterializeIndexContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseMaterializeProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseMaterializeProjection?: (ctx: AlterTableClauseMaterializeProjectionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModifyCodec`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModifyCodec?: (ctx: AlterTableClauseModifyCodecContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModifyComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModifyComment?: (ctx: AlterTableClauseModifyCommentContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModifyRemove`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModifyRemove?: (ctx: AlterTableClauseModifyRemoveContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModify`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModify?: (ctx: AlterTableClauseModifyContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModifyOrderBy`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModifyOrderBy?: (ctx: AlterTableClauseModifyOrderByContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseModifyTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseModifyTTL?: (ctx: AlterTableClauseModifyTTLContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseMovePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseMovePartition?: (ctx: AlterTableClauseMovePartitionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseRemoveTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseRemoveTTL?: (ctx: AlterTableClauseRemoveTTLContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseRename`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseRename?: (ctx: AlterTableClauseRenameContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseReplace`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseReplace?: (ctx: AlterTableClauseReplaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableClauseUpdate`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClauseUpdate?: (ctx: AlterTableClauseUpdateContext) => Result;

	/**
	 * Visit a parse tree produced by the `showCreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowCreateDatabaseStmt?: (ctx: ShowCreateDatabaseStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `showCreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowCreateDictionaryStmt?: (ctx: ShowCreateDictionaryStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `showCreateTableStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowCreateTableStmt?: (ctx: ShowCreateTableStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `showDatabasesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowDatabasesStmt?: (ctx: ShowDatabasesStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `showDictionariesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowDictionariesStmt?: (ctx: ShowDictionariesStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `showTablesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowTablesStmt?: (ctx: ShowTablesStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `regularQuerySpecification`
	 * labeled alternative in `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularQuerySpecification?: (ctx: RegularQuerySpecificationContext) => Result;

	/**
	 * Visit a parse tree produced by the `SchemaDescriptionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaDescriptionClause?: (ctx: SchemaDescriptionClauseContext) => Result;

	/**
	 * Visit a parse tree produced by the `SchemaAsTableClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaAsTableClause?: (ctx: SchemaAsTableClauseContext) => Result;

	/**
	 * Visit a parse tree produced by the `SchemaAsFunctionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSchemaAsFunctionClause?: (ctx: SchemaAsFunctionClauseContext) => Result;

	/**
	 * Visit a parse tree produced by the `KillMutationStmt`
	 * labeled alternative in `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKillMutationStmt?: (ctx: KillMutationStmtContext) => Result;

	/**
	 * Visit a parse tree produced by the `DataClauseFormat`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataClauseFormat?: (ctx: DataClauseFormatContext) => Result;

	/**
	 * Visit a parse tree produced by the `DataClauseValues`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataClauseValues?: (ctx: DataClauseValuesContext) => Result;

	/**
	 * Visit a parse tree produced by the `DataClauseSelect`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataClauseSelect?: (ctx: DataClauseSelectContext) => Result;

	/**
	 * Visit a parse tree produced by the `frameStart`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrameStart?: (ctx: FrameStartContext) => Result;

	/**
	 * Visit a parse tree produced by the `frameBetween`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrameBetween?: (ctx: FrameBetweenContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnTypeExprSimple`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExprSimple?: (ctx: ColumnTypeExprSimpleContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnTypeExprNested`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExprNested?: (ctx: ColumnTypeExprNestedContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnTypeExprEnum`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExprEnum?: (ctx: ColumnTypeExprEnumContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnTypeExprComplex`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExprComplex?: (ctx: ColumnTypeExprComplexContext) => Result;

	/**
	 * Visit a parse tree produced by the `ColumnTypeExprParam`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExprParam?: (ctx: ColumnTypeExprParamContext) => Result;

	/**
	 * Visit a parse tree produced by the `AlterTableStmt`
	 * labeled alternative in `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableStmt?: (ctx: AlterTableStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.sql`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql?: (ctx: SqlContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.queryStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryStmt?: (ctx: QueryStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery?: (ctx: QueryContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStmt?: (ctx: AlterStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableClause?: (ctx: AlterTableClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.assignmentExprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExprList?: (ctx: AssignmentExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.assignmentExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableColumnPropertyType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableColumnPropertyType?: (ctx: TableColumnPropertyTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.partitionClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionClause?: (ctx: PartitionClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttachStmt?: (ctx: AttachStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.checkStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCheckStmt?: (ctx: CheckStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateStmt?: (ctx: CreateStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionarySchemaClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionarySchemaClause?: (ctx: DictionarySchemaClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionaryAttrDfnt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryAttrDfnt?: (ctx: DictionaryAttrDfntContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionaryEngineClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryEngineClause?: (ctx: DictionaryEngineClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionaryPrimaryKeyClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryPrimaryKeyClause?: (ctx: DictionaryPrimaryKeyClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionaryArgExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionaryArgExpr?: (ctx: DictionaryArgExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.sourceClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceClause?: (ctx: SourceClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.lifetimeClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLifetimeClause?: (ctx: LifetimeClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.layoutClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLayoutClause?: (ctx: LayoutClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.rangeClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeClause?: (ctx: RangeClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dictionarySettingsClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDictionarySettingsClause?: (ctx: DictionarySettingsClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.clusterClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClusterClause?: (ctx: ClusterClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.uuidClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUuidClause?: (ctx: UuidClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.destinationClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDestinationClause?: (ctx: DestinationClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.subqueryClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubqueryClause?: (ctx: SubqueryClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableSchemaClause?: (ctx: TableSchemaClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.engineClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEngineClause?: (ctx: EngineClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.partitionByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionByClause?: (ctx: PartitionByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.primaryKeyClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryKeyClause?: (ctx: PrimaryKeyClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.sampleByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSampleByClause?: (ctx: SampleByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.ttlClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTtlClause?: (ctx: TtlClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.engineExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEngineExpr?: (ctx: EngineExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableElementExpr?: (ctx: TableElementExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableColumnDfnt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableColumnDfnt?: (ctx: TableColumnDfntContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableColumnPropertyExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableColumnPropertyExpr?: (ctx: TableColumnPropertyExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableIndexDfnt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableIndexDfnt?: (ctx: TableIndexDfntContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableProjectionDfnt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableProjectionDfnt?: (ctx: TableProjectionDfntContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.codecExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodecExpr?: (ctx: CodecExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.codecArgExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodecArgExpr?: (ctx: CodecArgExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.ttlExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTtlExpr?: (ctx: TtlExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.describeStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescribeStmt?: (ctx: DescribeStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropStmt?: (ctx: DropStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExistsStmt?: (ctx: ExistsStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplainStmt?: (ctx: ExplainStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.insertStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertStmt?: (ctx: InsertStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnsClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnsClause?: (ctx: ColumnsClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataClause?: (ctx: DataClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKillStmt?: (ctx: KillStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.optimizeStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptimizeStmt?: (ctx: OptimizeStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.renameStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRenameStmt?: (ctx: RenameStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.projectionSelectStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProjectionSelectStmt?: (ctx: ProjectionSelectStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.selectUnionStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectUnionStmt?: (ctx: SelectUnionStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.selectStmtWithParens`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectStmtWithParens?: (ctx: SelectStmtWithParensContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectStmt?: (ctx: SelectStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.withClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithClause?: (ctx: WithClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.topClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTopClause?: (ctx: TopClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.fromClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromClause?: (ctx: FromClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.arrayJoinClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayJoinClause?: (ctx: ArrayJoinClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.windowClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindowClause?: (ctx: WindowClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.prewhereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrewhereClause?: (ctx: PrewhereClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.whereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereClause?: (ctx: WhereClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.groupByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByClause?: (ctx: GroupByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.havingClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHavingClause?: (ctx: HavingClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.orderByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderByClause?: (ctx: OrderByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.projectionOrderByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProjectionOrderByClause?: (ctx: ProjectionOrderByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.limitByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitByClause?: (ctx: LimitByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.limitClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitClause?: (ctx: LimitClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.settingsClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSettingsClause?: (ctx: SettingsClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinExpr?: (ctx: JoinExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinOp?: (ctx: JoinOpContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.joinOpCross`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinOpCross?: (ctx: JoinOpCrossContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.joinConstraintClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinConstraintClause?: (ctx: JoinConstraintClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.sampleClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSampleClause?: (ctx: SampleClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.limitExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitExpr?: (ctx: LimitExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.orderExprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderExprList?: (ctx: OrderExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.orderExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderExpr?: (ctx: OrderExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.ratioExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRatioExpr?: (ctx: RatioExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.settingExprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSettingExprList?: (ctx: SettingExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.settingExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSettingExpr?: (ctx: SettingExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.windowExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindowExpr?: (ctx: WindowExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.winPartitionByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWinPartitionByClause?: (ctx: WinPartitionByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.winOrderByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWinOrderByClause?: (ctx: WinOrderByClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.winFrameClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWinFrameClause?: (ctx: WinFrameClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWinFrameExtend?: (ctx: WinFrameExtendContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.winFrameBound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWinFrameBound?: (ctx: WinFrameBoundContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.setStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetStmt?: (ctx: SetStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowStmt?: (ctx: ShowStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.systemStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSystemStmt?: (ctx: SystemStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.truncateStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTruncateStmt?: (ctx: TruncateStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.useStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUseStmt?: (ctx: UseStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.watchStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWatchStmt?: (ctx: WatchStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnTypeExpr?: (ctx: ColumnTypeExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnExprList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExprList?: (ctx: ColumnExprListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnsExpr?: (ctx: ColumnsExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnExpr?: (ctx: ColumnExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnArgList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnArgList?: (ctx: ColumnArgListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnArgExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnArgExpr?: (ctx: ColumnArgExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnLambdaExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnLambdaExpr?: (ctx: ColumnLambdaExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.columnIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnIdentifier?: (ctx: ColumnIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.nestedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedIdentifier?: (ctx: NestedIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableExpr?: (ctx: TableExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableFunctionExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableFunctionExpr?: (ctx: TableFunctionExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableIdentifier?: (ctx: TableIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableArgList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableArgList?: (ctx: TableArgListContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.tableArgExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableArgExpr?: (ctx: TableArgExprContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.databaseIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabaseIdentifier?: (ctx: DatabaseIdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.floatingLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatingLiteral?: (ctx: FloatingLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.numberLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.interval`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterval?: (ctx: IntervalContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeyword?: (ctx: KeywordContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.keywordForAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeywordForAlias?: (ctx: KeywordForAliasContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias?: (ctx: AliasContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.identifierOrNull`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierOrNull?: (ctx: IdentifierOrNullContext) => Result;

	/**
	 * Visit a parse tree produced by `ClickHouseParser.enumValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumValue?: (ctx: EnumValueContext) => Result;
}

