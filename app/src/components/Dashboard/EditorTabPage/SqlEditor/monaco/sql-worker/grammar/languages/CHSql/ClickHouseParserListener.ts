// Generated from grammar/clickhouse/ClickHouseParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `ClickHouseParser`.
 */
export interface ClickHouseParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `ExistsDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	enterExistsDatabaseStmt?: (ctx: ExistsDatabaseStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `ExistsDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	exitExistsDatabaseStmt?: (ctx: ExistsDatabaseStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `ExistsTableStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	enterExistsTableStmt?: (ctx: ExistsTableStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `ExistsTableStmt`
	 * labeled alternative in `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	exitExistsTableStmt?: (ctx: ExistsTableStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprCase`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprCase?: (ctx: ColumnExprCaseContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprCase`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprCase?: (ctx: ColumnExprCaseContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprCast`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprCast?: (ctx: ColumnExprCastContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprCast`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprCast?: (ctx: ColumnExprCastContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprDate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprDate?: (ctx: ColumnExprDateContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprDate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprDate?: (ctx: ColumnExprDateContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprExtract`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprExtract?: (ctx: ColumnExprExtractContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprExtract`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprExtract?: (ctx: ColumnExprExtractContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprInterval`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprInterval?: (ctx: ColumnExprIntervalContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprInterval`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprInterval?: (ctx: ColumnExprIntervalContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprSubstring`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprSubstring?: (ctx: ColumnExprSubstringContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprSubstring`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprSubstring?: (ctx: ColumnExprSubstringContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprTimestamp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprTimestamp?: (ctx: ColumnExprTimestampContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprTimestamp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprTimestamp?: (ctx: ColumnExprTimestampContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprTrim`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprTrim?: (ctx: ColumnExprTrimContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprTrim`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprTrim?: (ctx: ColumnExprTrimContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprWinFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprWinFunction?: (ctx: ColumnExprWinFunctionContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprWinFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprWinFunction?: (ctx: ColumnExprWinFunctionContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprWinFunctionTarget`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprWinFunctionTarget?: (ctx: ColumnExprWinFunctionTargetContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprWinFunctionTarget`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprWinFunctionTarget?: (ctx: ColumnExprWinFunctionTargetContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprFunction?: (ctx: ColumnExprFunctionContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprFunction`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprFunction?: (ctx: ColumnExprFunctionContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprLiteral`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprLiteral?: (ctx: ColumnExprLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprLiteral`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprLiteral?: (ctx: ColumnExprLiteralContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprArrayAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprArrayAccess?: (ctx: ColumnExprArrayAccessContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprArrayAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprArrayAccess?: (ctx: ColumnExprArrayAccessContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprTupleAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprTupleAccess?: (ctx: ColumnExprTupleAccessContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprTupleAccess`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprTupleAccess?: (ctx: ColumnExprTupleAccessContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprNegate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprNegate?: (ctx: ColumnExprNegateContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprNegate`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprNegate?: (ctx: ColumnExprNegateContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprPrecedence1`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprPrecedence1?: (ctx: ColumnExprPrecedence1Context) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprPrecedence1`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprPrecedence1?: (ctx: ColumnExprPrecedence1Context) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprPrecedence2`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprPrecedence2?: (ctx: ColumnExprPrecedence2Context) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprPrecedence2`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprPrecedence2?: (ctx: ColumnExprPrecedence2Context) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprPrecedence3`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprPrecedence3?: (ctx: ColumnExprPrecedence3Context) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprPrecedence3`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprPrecedence3?: (ctx: ColumnExprPrecedence3Context) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprIsNull`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprIsNull?: (ctx: ColumnExprIsNullContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprIsNull`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprIsNull?: (ctx: ColumnExprIsNullContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprNot`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprNot?: (ctx: ColumnExprNotContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprNot`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprNot?: (ctx: ColumnExprNotContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprAnd`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprAnd?: (ctx: ColumnExprAndContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprAnd`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprAnd?: (ctx: ColumnExprAndContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprOr`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprOr?: (ctx: ColumnExprOrContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprOr`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprOr?: (ctx: ColumnExprOrContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprBetween`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprBetween?: (ctx: ColumnExprBetweenContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprBetween`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprBetween?: (ctx: ColumnExprBetweenContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprTernaryOp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprTernaryOp?: (ctx: ColumnExprTernaryOpContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprTernaryOp`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprTernaryOp?: (ctx: ColumnExprTernaryOpContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprAlias`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprAlias?: (ctx: ColumnExprAliasContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprAlias`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprAlias?: (ctx: ColumnExprAliasContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprAsterisk?: (ctx: ColumnExprAsteriskContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprAsterisk?: (ctx: ColumnExprAsteriskContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprSubquery?: (ctx: ColumnExprSubqueryContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprSubquery?: (ctx: ColumnExprSubqueryContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprParens`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprParens?: (ctx: ColumnExprParensContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprParens`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprParens?: (ctx: ColumnExprParensContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprTuple`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprTuple?: (ctx: ColumnExprTupleContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprTuple`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprTuple?: (ctx: ColumnExprTupleContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprArray`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprArray?: (ctx: ColumnExprArrayContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprArray`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprArray?: (ctx: ColumnExprArrayContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnExprIdentifier`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExprIdentifier?: (ctx: ColumnExprIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnExprIdentifier`
	 * labeled alternative in `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExprIdentifier?: (ctx: ColumnExprIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnsExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnsExprAsterisk?: (ctx: ColumnsExprAsteriskContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnsExprAsterisk`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnsExprAsterisk?: (ctx: ColumnsExprAsteriskContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnsExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnsExprSubquery?: (ctx: ColumnsExprSubqueryContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnsExprSubquery`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnsExprSubquery?: (ctx: ColumnsExprSubqueryContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnsExprColumn`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnsExprColumn?: (ctx: ColumnsExprColumnContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnsExprColumn`
	 * labeled alternative in `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnsExprColumn?: (ctx: ColumnsExprColumnContext) => void;

	/**
	 * Enter a parse tree produced by the `AttachDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 */
	enterAttachDictionaryStmt?: (ctx: AttachDictionaryStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `AttachDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 */
	exitAttachDictionaryStmt?: (ctx: AttachDictionaryStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinExprOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinExprOp?: (ctx: JoinExprOpContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinExprOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinExprOp?: (ctx: JoinExprOpContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinExprCrossOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinExprCrossOp?: (ctx: JoinExprCrossOpContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinExprCrossOp`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinExprCrossOp?: (ctx: JoinExprCrossOpContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinExprTable`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinExprTable?: (ctx: JoinExprTableContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinExprTable`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinExprTable?: (ctx: JoinExprTableContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinExprParens`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinExprParens?: (ctx: JoinExprParensContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinExprParens`
	 * labeled alternative in `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinExprParens?: (ctx: JoinExprParensContext) => void;

	/**
	 * Enter a parse tree produced by the `DropDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	enterDropDatabaseStmt?: (ctx: DropDatabaseStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `DropDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	exitDropDatabaseStmt?: (ctx: DropDatabaseStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `DropTableStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	enterDropTableStmt?: (ctx: DropTableStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `DropTableStmt`
	 * labeled alternative in `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	exitDropTableStmt?: (ctx: DropTableStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `ExplainASTStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	enterExplainASTStmt?: (ctx: ExplainASTStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `ExplainASTStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	exitExplainASTStmt?: (ctx: ExplainASTStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `ExplainSyntaxStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	enterExplainSyntaxStmt?: (ctx: ExplainSyntaxStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `ExplainSyntaxStmt`
	 * labeled alternative in `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	exitExplainSyntaxStmt?: (ctx: ExplainSyntaxStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `TableElementExprColumn`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	enterTableElementExprColumn?: (ctx: TableElementExprColumnContext) => void;
	/**
	 * Exit a parse tree produced by the `TableElementExprColumn`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	exitTableElementExprColumn?: (ctx: TableElementExprColumnContext) => void;

	/**
	 * Enter a parse tree produced by the `TableElementExprConstraint`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	enterTableElementExprConstraint?: (ctx: TableElementExprConstraintContext) => void;
	/**
	 * Exit a parse tree produced by the `TableElementExprConstraint`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	exitTableElementExprConstraint?: (ctx: TableElementExprConstraintContext) => void;

	/**
	 * Enter a parse tree produced by the `TableElementExprIndex`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	enterTableElementExprIndex?: (ctx: TableElementExprIndexContext) => void;
	/**
	 * Exit a parse tree produced by the `TableElementExprIndex`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	exitTableElementExprIndex?: (ctx: TableElementExprIndexContext) => void;

	/**
	 * Enter a parse tree produced by the `TableElementExprProjection`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	enterTableElementExprProjection?: (ctx: TableElementExprProjectionContext) => void;
	/**
	 * Exit a parse tree produced by the `TableElementExprProjection`
	 * labeled alternative in `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	exitTableElementExprProjection?: (ctx: TableElementExprProjectionContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateDatabaseStmt?: (ctx: CreateDatabaseStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateDatabaseStmt?: (ctx: CreateDatabaseStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateDictionaryStmt?: (ctx: CreateDictionaryStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateDictionaryStmt?: (ctx: CreateDictionaryStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateLiveViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateLiveViewStmt?: (ctx: CreateLiveViewStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateLiveViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateLiveViewStmt?: (ctx: CreateLiveViewStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateMaterializedViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateMaterializedViewStmt?: (ctx: CreateMaterializedViewStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateMaterializedViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateMaterializedViewStmt?: (ctx: CreateMaterializedViewStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateTableStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateTableStmt?: (ctx: CreateTableStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateTableStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateTableStmt?: (ctx: CreateTableStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `CreateViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateViewStmt?: (ctx: CreateViewStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `CreateViewStmt`
	 * labeled alternative in `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateViewStmt?: (ctx: CreateViewStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinOpInner`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	enterJoinOpInner?: (ctx: JoinOpInnerContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinOpInner`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	exitJoinOpInner?: (ctx: JoinOpInnerContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinOpLeftRight`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	enterJoinOpLeftRight?: (ctx: JoinOpLeftRightContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinOpLeftRight`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	exitJoinOpLeftRight?: (ctx: JoinOpLeftRightContext) => void;

	/**
	 * Enter a parse tree produced by the `JoinOpFull`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	enterJoinOpFull?: (ctx: JoinOpFullContext) => void;
	/**
	 * Exit a parse tree produced by the `JoinOpFull`
	 * labeled alternative in `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	exitJoinOpFull?: (ctx: JoinOpFullContext) => void;

	/**
	 * Enter a parse tree produced by the `TableExprIdentifier`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	enterTableExprIdentifier?: (ctx: TableExprIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `TableExprIdentifier`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	exitTableExprIdentifier?: (ctx: TableExprIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by the `TableExprFunction`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	enterTableExprFunction?: (ctx: TableExprFunctionContext) => void;
	/**
	 * Exit a parse tree produced by the `TableExprFunction`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	exitTableExprFunction?: (ctx: TableExprFunctionContext) => void;

	/**
	 * Enter a parse tree produced by the `TableExprSubquery`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	enterTableExprSubquery?: (ctx: TableExprSubqueryContext) => void;
	/**
	 * Exit a parse tree produced by the `TableExprSubquery`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	exitTableExprSubquery?: (ctx: TableExprSubqueryContext) => void;

	/**
	 * Enter a parse tree produced by the `TableExprAlias`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	enterTableExprAlias?: (ctx: TableExprAliasContext) => void;
	/**
	 * Exit a parse tree produced by the `TableExprAlias`
	 * labeled alternative in `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	exitTableExprAlias?: (ctx: TableExprAliasContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseAddColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseAddColumn?: (ctx: AlterTableClauseAddColumnContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseAddColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseAddColumn?: (ctx: AlterTableClauseAddColumnContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseAddIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseAddIndex?: (ctx: AlterTableClauseAddIndexContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseAddIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseAddIndex?: (ctx: AlterTableClauseAddIndexContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseAddProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseAddProjection?: (ctx: AlterTableClauseAddProjectionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseAddProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseAddProjection?: (ctx: AlterTableClauseAddProjectionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseAttach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseAttach?: (ctx: AlterTableClauseAttachContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseAttach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseAttach?: (ctx: AlterTableClauseAttachContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseClearColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseClearColumn?: (ctx: AlterTableClauseClearColumnContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseClearColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseClearColumn?: (ctx: AlterTableClauseClearColumnContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseClearIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseClearIndex?: (ctx: AlterTableClauseClearIndexContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseClearIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseClearIndex?: (ctx: AlterTableClauseClearIndexContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseClearProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseClearProjection?: (ctx: AlterTableClauseClearProjectionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseClearProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseClearProjection?: (ctx: AlterTableClauseClearProjectionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseComment?: (ctx: AlterTableClauseCommentContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseComment?: (ctx: AlterTableClauseCommentContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDelete`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDelete?: (ctx: AlterTableClauseDeleteContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDelete`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDelete?: (ctx: AlterTableClauseDeleteContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDetach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDetach?: (ctx: AlterTableClauseDetachContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDetach`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDetach?: (ctx: AlterTableClauseDetachContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDropColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDropColumn?: (ctx: AlterTableClauseDropColumnContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDropColumn`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDropColumn?: (ctx: AlterTableClauseDropColumnContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDropIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDropIndex?: (ctx: AlterTableClauseDropIndexContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDropIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDropIndex?: (ctx: AlterTableClauseDropIndexContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDropProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDropProjection?: (ctx: AlterTableClauseDropProjectionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDropProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDropProjection?: (ctx: AlterTableClauseDropProjectionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseDropPartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseDropPartition?: (ctx: AlterTableClauseDropPartitionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseDropPartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseDropPartition?: (ctx: AlterTableClauseDropPartitionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseFreezePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseFreezePartition?: (ctx: AlterTableClauseFreezePartitionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseFreezePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseFreezePartition?: (ctx: AlterTableClauseFreezePartitionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseMaterializeIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseMaterializeIndex?: (ctx: AlterTableClauseMaterializeIndexContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseMaterializeIndex`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseMaterializeIndex?: (ctx: AlterTableClauseMaterializeIndexContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseMaterializeProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseMaterializeProjection?: (ctx: AlterTableClauseMaterializeProjectionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseMaterializeProjection`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseMaterializeProjection?: (ctx: AlterTableClauseMaterializeProjectionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModifyCodec`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModifyCodec?: (ctx: AlterTableClauseModifyCodecContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModifyCodec`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModifyCodec?: (ctx: AlterTableClauseModifyCodecContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModifyComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModifyComment?: (ctx: AlterTableClauseModifyCommentContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModifyComment`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModifyComment?: (ctx: AlterTableClauseModifyCommentContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModifyRemove`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModifyRemove?: (ctx: AlterTableClauseModifyRemoveContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModifyRemove`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModifyRemove?: (ctx: AlterTableClauseModifyRemoveContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModify`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModify?: (ctx: AlterTableClauseModifyContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModify`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModify?: (ctx: AlterTableClauseModifyContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModifyOrderBy`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModifyOrderBy?: (ctx: AlterTableClauseModifyOrderByContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModifyOrderBy`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModifyOrderBy?: (ctx: AlterTableClauseModifyOrderByContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseModifyTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseModifyTTL?: (ctx: AlterTableClauseModifyTTLContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseModifyTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseModifyTTL?: (ctx: AlterTableClauseModifyTTLContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseMovePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseMovePartition?: (ctx: AlterTableClauseMovePartitionContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseMovePartition`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseMovePartition?: (ctx: AlterTableClauseMovePartitionContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseRemoveTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseRemoveTTL?: (ctx: AlterTableClauseRemoveTTLContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseRemoveTTL`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseRemoveTTL?: (ctx: AlterTableClauseRemoveTTLContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseRename`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseRename?: (ctx: AlterTableClauseRenameContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseRename`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseRename?: (ctx: AlterTableClauseRenameContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseReplace`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseReplace?: (ctx: AlterTableClauseReplaceContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseReplace`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseReplace?: (ctx: AlterTableClauseReplaceContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableClauseUpdate`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClauseUpdate?: (ctx: AlterTableClauseUpdateContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableClauseUpdate`
	 * labeled alternative in `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClauseUpdate?: (ctx: AlterTableClauseUpdateContext) => void;

	/**
	 * Enter a parse tree produced by the `showCreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowCreateDatabaseStmt?: (ctx: ShowCreateDatabaseStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showCreateDatabaseStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowCreateDatabaseStmt?: (ctx: ShowCreateDatabaseStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `showCreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowCreateDictionaryStmt?: (ctx: ShowCreateDictionaryStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showCreateDictionaryStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowCreateDictionaryStmt?: (ctx: ShowCreateDictionaryStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `showCreateTableStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowCreateTableStmt?: (ctx: ShowCreateTableStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showCreateTableStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowCreateTableStmt?: (ctx: ShowCreateTableStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `showDatabasesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowDatabasesStmt?: (ctx: ShowDatabasesStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showDatabasesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowDatabasesStmt?: (ctx: ShowDatabasesStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `showDictionariesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowDictionariesStmt?: (ctx: ShowDictionariesStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showDictionariesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowDictionariesStmt?: (ctx: ShowDictionariesStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `showTablesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowTablesStmt?: (ctx: ShowTablesStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `showTablesStmt`
	 * labeled alternative in `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowTablesStmt?: (ctx: ShowTablesStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `regularQuerySpecification`
	 * labeled alternative in `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	enterRegularQuerySpecification?: (ctx: RegularQuerySpecificationContext) => void;
	/**
	 * Exit a parse tree produced by the `regularQuerySpecification`
	 * labeled alternative in `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	exitRegularQuerySpecification?: (ctx: RegularQuerySpecificationContext) => void;

	/**
	 * Enter a parse tree produced by the `SchemaDescriptionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	enterSchemaDescriptionClause?: (ctx: SchemaDescriptionClauseContext) => void;
	/**
	 * Exit a parse tree produced by the `SchemaDescriptionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	exitSchemaDescriptionClause?: (ctx: SchemaDescriptionClauseContext) => void;

	/**
	 * Enter a parse tree produced by the `SchemaAsTableClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	enterSchemaAsTableClause?: (ctx: SchemaAsTableClauseContext) => void;
	/**
	 * Exit a parse tree produced by the `SchemaAsTableClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	exitSchemaAsTableClause?: (ctx: SchemaAsTableClauseContext) => void;

	/**
	 * Enter a parse tree produced by the `SchemaAsFunctionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	enterSchemaAsFunctionClause?: (ctx: SchemaAsFunctionClauseContext) => void;
	/**
	 * Exit a parse tree produced by the `SchemaAsFunctionClause`
	 * labeled alternative in `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	exitSchemaAsFunctionClause?: (ctx: SchemaAsFunctionClauseContext) => void;

	/**
	 * Enter a parse tree produced by the `KillMutationStmt`
	 * labeled alternative in `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 */
	enterKillMutationStmt?: (ctx: KillMutationStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `KillMutationStmt`
	 * labeled alternative in `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 */
	exitKillMutationStmt?: (ctx: KillMutationStmtContext) => void;

	/**
	 * Enter a parse tree produced by the `DataClauseFormat`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	enterDataClauseFormat?: (ctx: DataClauseFormatContext) => void;
	/**
	 * Exit a parse tree produced by the `DataClauseFormat`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	exitDataClauseFormat?: (ctx: DataClauseFormatContext) => void;

	/**
	 * Enter a parse tree produced by the `DataClauseValues`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	enterDataClauseValues?: (ctx: DataClauseValuesContext) => void;
	/**
	 * Exit a parse tree produced by the `DataClauseValues`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	exitDataClauseValues?: (ctx: DataClauseValuesContext) => void;

	/**
	 * Enter a parse tree produced by the `DataClauseSelect`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	enterDataClauseSelect?: (ctx: DataClauseSelectContext) => void;
	/**
	 * Exit a parse tree produced by the `DataClauseSelect`
	 * labeled alternative in `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	exitDataClauseSelect?: (ctx: DataClauseSelectContext) => void;

	/**
	 * Enter a parse tree produced by the `frameStart`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	enterFrameStart?: (ctx: FrameStartContext) => void;
	/**
	 * Exit a parse tree produced by the `frameStart`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	exitFrameStart?: (ctx: FrameStartContext) => void;

	/**
	 * Enter a parse tree produced by the `frameBetween`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	enterFrameBetween?: (ctx: FrameBetweenContext) => void;
	/**
	 * Exit a parse tree produced by the `frameBetween`
	 * labeled alternative in `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	exitFrameBetween?: (ctx: FrameBetweenContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnTypeExprSimple`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExprSimple?: (ctx: ColumnTypeExprSimpleContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnTypeExprSimple`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExprSimple?: (ctx: ColumnTypeExprSimpleContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnTypeExprNested`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExprNested?: (ctx: ColumnTypeExprNestedContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnTypeExprNested`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExprNested?: (ctx: ColumnTypeExprNestedContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnTypeExprEnum`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExprEnum?: (ctx: ColumnTypeExprEnumContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnTypeExprEnum`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExprEnum?: (ctx: ColumnTypeExprEnumContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnTypeExprComplex`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExprComplex?: (ctx: ColumnTypeExprComplexContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnTypeExprComplex`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExprComplex?: (ctx: ColumnTypeExprComplexContext) => void;

	/**
	 * Enter a parse tree produced by the `ColumnTypeExprParam`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExprParam?: (ctx: ColumnTypeExprParamContext) => void;
	/**
	 * Exit a parse tree produced by the `ColumnTypeExprParam`
	 * labeled alternative in `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExprParam?: (ctx: ColumnTypeExprParamContext) => void;

	/**
	 * Enter a parse tree produced by the `AlterTableStmt`
	 * labeled alternative in `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 */
	enterAlterTableStmt?: (ctx: AlterTableStmtContext) => void;
	/**
	 * Exit a parse tree produced by the `AlterTableStmt`
	 * labeled alternative in `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 */
	exitAlterTableStmt?: (ctx: AlterTableStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.sql`.
	 * @param ctx the parse tree
	 */
	enterSql?: (ctx: SqlContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.sql`.
	 * @param ctx the parse tree
	 */
	exitSql?: (ctx: SqlContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.queryStmt`.
	 * @param ctx the parse tree
	 */
	enterQueryStmt?: (ctx: QueryStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.queryStmt`.
	 * @param ctx the parse tree
	 */
	exitQueryStmt?: (ctx: QueryStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 */
	enterAlterStmt?: (ctx: AlterStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.alterStmt`.
	 * @param ctx the parse tree
	 */
	exitAlterStmt?: (ctx: AlterStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	enterAlterTableClause?: (ctx: AlterTableClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.alterTableClause`.
	 * @param ctx the parse tree
	 */
	exitAlterTableClause?: (ctx: AlterTableClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.assignmentExprList`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExprList?: (ctx: AssignmentExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.assignmentExprList`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExprList?: (ctx: AssignmentExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.assignmentExpr`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.assignmentExpr`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableColumnPropertyType`.
	 * @param ctx the parse tree
	 */
	enterTableColumnPropertyType?: (ctx: TableColumnPropertyTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableColumnPropertyType`.
	 * @param ctx the parse tree
	 */
	exitTableColumnPropertyType?: (ctx: TableColumnPropertyTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.partitionClause`.
	 * @param ctx the parse tree
	 */
	enterPartitionClause?: (ctx: PartitionClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.partitionClause`.
	 * @param ctx the parse tree
	 */
	exitPartitionClause?: (ctx: PartitionClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 */
	enterAttachStmt?: (ctx: AttachStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.attachStmt`.
	 * @param ctx the parse tree
	 */
	exitAttachStmt?: (ctx: AttachStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.checkStmt`.
	 * @param ctx the parse tree
	 */
	enterCheckStmt?: (ctx: CheckStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.checkStmt`.
	 * @param ctx the parse tree
	 */
	exitCheckStmt?: (ctx: CheckStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	enterCreateStmt?: (ctx: CreateStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.createStmt`.
	 * @param ctx the parse tree
	 */
	exitCreateStmt?: (ctx: CreateStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionarySchemaClause`.
	 * @param ctx the parse tree
	 */
	enterDictionarySchemaClause?: (ctx: DictionarySchemaClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionarySchemaClause`.
	 * @param ctx the parse tree
	 */
	exitDictionarySchemaClause?: (ctx: DictionarySchemaClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionaryAttrDfnt`.
	 * @param ctx the parse tree
	 */
	enterDictionaryAttrDfnt?: (ctx: DictionaryAttrDfntContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionaryAttrDfnt`.
	 * @param ctx the parse tree
	 */
	exitDictionaryAttrDfnt?: (ctx: DictionaryAttrDfntContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionaryEngineClause`.
	 * @param ctx the parse tree
	 */
	enterDictionaryEngineClause?: (ctx: DictionaryEngineClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionaryEngineClause`.
	 * @param ctx the parse tree
	 */
	exitDictionaryEngineClause?: (ctx: DictionaryEngineClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionaryPrimaryKeyClause`.
	 * @param ctx the parse tree
	 */
	enterDictionaryPrimaryKeyClause?: (ctx: DictionaryPrimaryKeyClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionaryPrimaryKeyClause`.
	 * @param ctx the parse tree
	 */
	exitDictionaryPrimaryKeyClause?: (ctx: DictionaryPrimaryKeyClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionaryArgExpr`.
	 * @param ctx the parse tree
	 */
	enterDictionaryArgExpr?: (ctx: DictionaryArgExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionaryArgExpr`.
	 * @param ctx the parse tree
	 */
	exitDictionaryArgExpr?: (ctx: DictionaryArgExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.sourceClause`.
	 * @param ctx the parse tree
	 */
	enterSourceClause?: (ctx: SourceClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.sourceClause`.
	 * @param ctx the parse tree
	 */
	exitSourceClause?: (ctx: SourceClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.lifetimeClause`.
	 * @param ctx the parse tree
	 */
	enterLifetimeClause?: (ctx: LifetimeClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.lifetimeClause`.
	 * @param ctx the parse tree
	 */
	exitLifetimeClause?: (ctx: LifetimeClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.layoutClause`.
	 * @param ctx the parse tree
	 */
	enterLayoutClause?: (ctx: LayoutClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.layoutClause`.
	 * @param ctx the parse tree
	 */
	exitLayoutClause?: (ctx: LayoutClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.rangeClause`.
	 * @param ctx the parse tree
	 */
	enterRangeClause?: (ctx: RangeClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.rangeClause`.
	 * @param ctx the parse tree
	 */
	exitRangeClause?: (ctx: RangeClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dictionarySettingsClause`.
	 * @param ctx the parse tree
	 */
	enterDictionarySettingsClause?: (ctx: DictionarySettingsClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dictionarySettingsClause`.
	 * @param ctx the parse tree
	 */
	exitDictionarySettingsClause?: (ctx: DictionarySettingsClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.clusterClause`.
	 * @param ctx the parse tree
	 */
	enterClusterClause?: (ctx: ClusterClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.clusterClause`.
	 * @param ctx the parse tree
	 */
	exitClusterClause?: (ctx: ClusterClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.uuidClause`.
	 * @param ctx the parse tree
	 */
	enterUuidClause?: (ctx: UuidClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.uuidClause`.
	 * @param ctx the parse tree
	 */
	exitUuidClause?: (ctx: UuidClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.destinationClause`.
	 * @param ctx the parse tree
	 */
	enterDestinationClause?: (ctx: DestinationClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.destinationClause`.
	 * @param ctx the parse tree
	 */
	exitDestinationClause?: (ctx: DestinationClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.subqueryClause`.
	 * @param ctx the parse tree
	 */
	enterSubqueryClause?: (ctx: SubqueryClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.subqueryClause`.
	 * @param ctx the parse tree
	 */
	exitSubqueryClause?: (ctx: SubqueryClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	enterTableSchemaClause?: (ctx: TableSchemaClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableSchemaClause`.
	 * @param ctx the parse tree
	 */
	exitTableSchemaClause?: (ctx: TableSchemaClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.engineClause`.
	 * @param ctx the parse tree
	 */
	enterEngineClause?: (ctx: EngineClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.engineClause`.
	 * @param ctx the parse tree
	 */
	exitEngineClause?: (ctx: EngineClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.partitionByClause`.
	 * @param ctx the parse tree
	 */
	enterPartitionByClause?: (ctx: PartitionByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.partitionByClause`.
	 * @param ctx the parse tree
	 */
	exitPartitionByClause?: (ctx: PartitionByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.primaryKeyClause`.
	 * @param ctx the parse tree
	 */
	enterPrimaryKeyClause?: (ctx: PrimaryKeyClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.primaryKeyClause`.
	 * @param ctx the parse tree
	 */
	exitPrimaryKeyClause?: (ctx: PrimaryKeyClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.sampleByClause`.
	 * @param ctx the parse tree
	 */
	enterSampleByClause?: (ctx: SampleByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.sampleByClause`.
	 * @param ctx the parse tree
	 */
	exitSampleByClause?: (ctx: SampleByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.ttlClause`.
	 * @param ctx the parse tree
	 */
	enterTtlClause?: (ctx: TtlClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.ttlClause`.
	 * @param ctx the parse tree
	 */
	exitTtlClause?: (ctx: TtlClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.engineExpr`.
	 * @param ctx the parse tree
	 */
	enterEngineExpr?: (ctx: EngineExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.engineExpr`.
	 * @param ctx the parse tree
	 */
	exitEngineExpr?: (ctx: EngineExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	enterTableElementExpr?: (ctx: TableElementExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableElementExpr`.
	 * @param ctx the parse tree
	 */
	exitTableElementExpr?: (ctx: TableElementExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableColumnDfnt`.
	 * @param ctx the parse tree
	 */
	enterTableColumnDfnt?: (ctx: TableColumnDfntContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableColumnDfnt`.
	 * @param ctx the parse tree
	 */
	exitTableColumnDfnt?: (ctx: TableColumnDfntContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableColumnPropertyExpr`.
	 * @param ctx the parse tree
	 */
	enterTableColumnPropertyExpr?: (ctx: TableColumnPropertyExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableColumnPropertyExpr`.
	 * @param ctx the parse tree
	 */
	exitTableColumnPropertyExpr?: (ctx: TableColumnPropertyExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableIndexDfnt`.
	 * @param ctx the parse tree
	 */
	enterTableIndexDfnt?: (ctx: TableIndexDfntContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableIndexDfnt`.
	 * @param ctx the parse tree
	 */
	exitTableIndexDfnt?: (ctx: TableIndexDfntContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableProjectionDfnt`.
	 * @param ctx the parse tree
	 */
	enterTableProjectionDfnt?: (ctx: TableProjectionDfntContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableProjectionDfnt`.
	 * @param ctx the parse tree
	 */
	exitTableProjectionDfnt?: (ctx: TableProjectionDfntContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.codecExpr`.
	 * @param ctx the parse tree
	 */
	enterCodecExpr?: (ctx: CodecExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.codecExpr`.
	 * @param ctx the parse tree
	 */
	exitCodecExpr?: (ctx: CodecExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.codecArgExpr`.
	 * @param ctx the parse tree
	 */
	enterCodecArgExpr?: (ctx: CodecArgExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.codecArgExpr`.
	 * @param ctx the parse tree
	 */
	exitCodecArgExpr?: (ctx: CodecArgExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.ttlExpr`.
	 * @param ctx the parse tree
	 */
	enterTtlExpr?: (ctx: TtlExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.ttlExpr`.
	 * @param ctx the parse tree
	 */
	exitTtlExpr?: (ctx: TtlExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.describeStmt`.
	 * @param ctx the parse tree
	 */
	enterDescribeStmt?: (ctx: DescribeStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.describeStmt`.
	 * @param ctx the parse tree
	 */
	exitDescribeStmt?: (ctx: DescribeStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	enterDropStmt?: (ctx: DropStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dropStmt`.
	 * @param ctx the parse tree
	 */
	exitDropStmt?: (ctx: DropStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	enterExistsStmt?: (ctx: ExistsStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.existsStmt`.
	 * @param ctx the parse tree
	 */
	exitExistsStmt?: (ctx: ExistsStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	enterExplainStmt?: (ctx: ExplainStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.explainStmt`.
	 * @param ctx the parse tree
	 */
	exitExplainStmt?: (ctx: ExplainStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.insertStmt`.
	 * @param ctx the parse tree
	 */
	enterInsertStmt?: (ctx: InsertStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.insertStmt`.
	 * @param ctx the parse tree
	 */
	exitInsertStmt?: (ctx: InsertStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnsClause`.
	 * @param ctx the parse tree
	 */
	enterColumnsClause?: (ctx: ColumnsClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnsClause`.
	 * @param ctx the parse tree
	 */
	exitColumnsClause?: (ctx: ColumnsClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	enterDataClause?: (ctx: DataClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.dataClause`.
	 * @param ctx the parse tree
	 */
	exitDataClause?: (ctx: DataClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 */
	enterKillStmt?: (ctx: KillStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.killStmt`.
	 * @param ctx the parse tree
	 */
	exitKillStmt?: (ctx: KillStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.optimizeStmt`.
	 * @param ctx the parse tree
	 */
	enterOptimizeStmt?: (ctx: OptimizeStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.optimizeStmt`.
	 * @param ctx the parse tree
	 */
	exitOptimizeStmt?: (ctx: OptimizeStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.renameStmt`.
	 * @param ctx the parse tree
	 */
	enterRenameStmt?: (ctx: RenameStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.renameStmt`.
	 * @param ctx the parse tree
	 */
	exitRenameStmt?: (ctx: RenameStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.projectionSelectStmt`.
	 * @param ctx the parse tree
	 */
	enterProjectionSelectStmt?: (ctx: ProjectionSelectStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.projectionSelectStmt`.
	 * @param ctx the parse tree
	 */
	exitProjectionSelectStmt?: (ctx: ProjectionSelectStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.selectUnionStmt`.
	 * @param ctx the parse tree
	 */
	enterSelectUnionStmt?: (ctx: SelectUnionStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.selectUnionStmt`.
	 * @param ctx the parse tree
	 */
	exitSelectUnionStmt?: (ctx: SelectUnionStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.selectStmtWithParens`.
	 * @param ctx the parse tree
	 */
	enterSelectStmtWithParens?: (ctx: SelectStmtWithParensContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.selectStmtWithParens`.
	 * @param ctx the parse tree
	 */
	exitSelectStmtWithParens?: (ctx: SelectStmtWithParensContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	enterSelectStmt?: (ctx: SelectStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	exitSelectStmt?: (ctx: SelectStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.withClause`.
	 * @param ctx the parse tree
	 */
	enterWithClause?: (ctx: WithClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.withClause`.
	 * @param ctx the parse tree
	 */
	exitWithClause?: (ctx: WithClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.topClause`.
	 * @param ctx the parse tree
	 */
	enterTopClause?: (ctx: TopClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.topClause`.
	 * @param ctx the parse tree
	 */
	exitTopClause?: (ctx: TopClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.fromClause`.
	 * @param ctx the parse tree
	 */
	enterFromClause?: (ctx: FromClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.fromClause`.
	 * @param ctx the parse tree
	 */
	exitFromClause?: (ctx: FromClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.arrayJoinClause`.
	 * @param ctx the parse tree
	 */
	enterArrayJoinClause?: (ctx: ArrayJoinClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.arrayJoinClause`.
	 * @param ctx the parse tree
	 */
	exitArrayJoinClause?: (ctx: ArrayJoinClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.windowClause`.
	 * @param ctx the parse tree
	 */
	enterWindowClause?: (ctx: WindowClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.windowClause`.
	 * @param ctx the parse tree
	 */
	exitWindowClause?: (ctx: WindowClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.prewhereClause`.
	 * @param ctx the parse tree
	 */
	enterPrewhereClause?: (ctx: PrewhereClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.prewhereClause`.
	 * @param ctx the parse tree
	 */
	exitPrewhereClause?: (ctx: PrewhereClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.whereClause`.
	 * @param ctx the parse tree
	 */
	enterWhereClause?: (ctx: WhereClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.whereClause`.
	 * @param ctx the parse tree
	 */
	exitWhereClause?: (ctx: WhereClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.groupByClause`.
	 * @param ctx the parse tree
	 */
	enterGroupByClause?: (ctx: GroupByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.groupByClause`.
	 * @param ctx the parse tree
	 */
	exitGroupByClause?: (ctx: GroupByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.havingClause`.
	 * @param ctx the parse tree
	 */
	enterHavingClause?: (ctx: HavingClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.havingClause`.
	 * @param ctx the parse tree
	 */
	exitHavingClause?: (ctx: HavingClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.orderByClause`.
	 * @param ctx the parse tree
	 */
	enterOrderByClause?: (ctx: OrderByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.orderByClause`.
	 * @param ctx the parse tree
	 */
	exitOrderByClause?: (ctx: OrderByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.projectionOrderByClause`.
	 * @param ctx the parse tree
	 */
	enterProjectionOrderByClause?: (ctx: ProjectionOrderByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.projectionOrderByClause`.
	 * @param ctx the parse tree
	 */
	exitProjectionOrderByClause?: (ctx: ProjectionOrderByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.limitByClause`.
	 * @param ctx the parse tree
	 */
	enterLimitByClause?: (ctx: LimitByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.limitByClause`.
	 * @param ctx the parse tree
	 */
	exitLimitByClause?: (ctx: LimitByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.limitClause`.
	 * @param ctx the parse tree
	 */
	enterLimitClause?: (ctx: LimitClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.limitClause`.
	 * @param ctx the parse tree
	 */
	exitLimitClause?: (ctx: LimitClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.settingsClause`.
	 * @param ctx the parse tree
	 */
	enterSettingsClause?: (ctx: SettingsClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.settingsClause`.
	 * @param ctx the parse tree
	 */
	exitSettingsClause?: (ctx: SettingsClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	enterJoinExpr?: (ctx: JoinExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.joinExpr`.
	 * @param ctx the parse tree
	 */
	exitJoinExpr?: (ctx: JoinExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	enterJoinOp?: (ctx: JoinOpContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.joinOp`.
	 * @param ctx the parse tree
	 */
	exitJoinOp?: (ctx: JoinOpContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.joinOpCross`.
	 * @param ctx the parse tree
	 */
	enterJoinOpCross?: (ctx: JoinOpCrossContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.joinOpCross`.
	 * @param ctx the parse tree
	 */
	exitJoinOpCross?: (ctx: JoinOpCrossContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.joinConstraintClause`.
	 * @param ctx the parse tree
	 */
	enterJoinConstraintClause?: (ctx: JoinConstraintClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.joinConstraintClause`.
	 * @param ctx the parse tree
	 */
	exitJoinConstraintClause?: (ctx: JoinConstraintClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.sampleClause`.
	 * @param ctx the parse tree
	 */
	enterSampleClause?: (ctx: SampleClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.sampleClause`.
	 * @param ctx the parse tree
	 */
	exitSampleClause?: (ctx: SampleClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.limitExpr`.
	 * @param ctx the parse tree
	 */
	enterLimitExpr?: (ctx: LimitExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.limitExpr`.
	 * @param ctx the parse tree
	 */
	exitLimitExpr?: (ctx: LimitExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.orderExprList`.
	 * @param ctx the parse tree
	 */
	enterOrderExprList?: (ctx: OrderExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.orderExprList`.
	 * @param ctx the parse tree
	 */
	exitOrderExprList?: (ctx: OrderExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.orderExpr`.
	 * @param ctx the parse tree
	 */
	enterOrderExpr?: (ctx: OrderExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.orderExpr`.
	 * @param ctx the parse tree
	 */
	exitOrderExpr?: (ctx: OrderExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.ratioExpr`.
	 * @param ctx the parse tree
	 */
	enterRatioExpr?: (ctx: RatioExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.ratioExpr`.
	 * @param ctx the parse tree
	 */
	exitRatioExpr?: (ctx: RatioExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.settingExprList`.
	 * @param ctx the parse tree
	 */
	enterSettingExprList?: (ctx: SettingExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.settingExprList`.
	 * @param ctx the parse tree
	 */
	exitSettingExprList?: (ctx: SettingExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.settingExpr`.
	 * @param ctx the parse tree
	 */
	enterSettingExpr?: (ctx: SettingExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.settingExpr`.
	 * @param ctx the parse tree
	 */
	exitSettingExpr?: (ctx: SettingExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.windowExpr`.
	 * @param ctx the parse tree
	 */
	enterWindowExpr?: (ctx: WindowExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.windowExpr`.
	 * @param ctx the parse tree
	 */
	exitWindowExpr?: (ctx: WindowExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.winPartitionByClause`.
	 * @param ctx the parse tree
	 */
	enterWinPartitionByClause?: (ctx: WinPartitionByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.winPartitionByClause`.
	 * @param ctx the parse tree
	 */
	exitWinPartitionByClause?: (ctx: WinPartitionByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.winOrderByClause`.
	 * @param ctx the parse tree
	 */
	enterWinOrderByClause?: (ctx: WinOrderByClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.winOrderByClause`.
	 * @param ctx the parse tree
	 */
	exitWinOrderByClause?: (ctx: WinOrderByClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.winFrameClause`.
	 * @param ctx the parse tree
	 */
	enterWinFrameClause?: (ctx: WinFrameClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.winFrameClause`.
	 * @param ctx the parse tree
	 */
	exitWinFrameClause?: (ctx: WinFrameClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	enterWinFrameExtend?: (ctx: WinFrameExtendContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.winFrameExtend`.
	 * @param ctx the parse tree
	 */
	exitWinFrameExtend?: (ctx: WinFrameExtendContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.winFrameBound`.
	 * @param ctx the parse tree
	 */
	enterWinFrameBound?: (ctx: WinFrameBoundContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.winFrameBound`.
	 * @param ctx the parse tree
	 */
	exitWinFrameBound?: (ctx: WinFrameBoundContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.setStmt`.
	 * @param ctx the parse tree
	 */
	enterSetStmt?: (ctx: SetStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.setStmt`.
	 * @param ctx the parse tree
	 */
	exitSetStmt?: (ctx: SetStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	enterShowStmt?: (ctx: ShowStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.showStmt`.
	 * @param ctx the parse tree
	 */
	exitShowStmt?: (ctx: ShowStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.systemStmt`.
	 * @param ctx the parse tree
	 */
	enterSystemStmt?: (ctx: SystemStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.systemStmt`.
	 * @param ctx the parse tree
	 */
	exitSystemStmt?: (ctx: SystemStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.truncateStmt`.
	 * @param ctx the parse tree
	 */
	enterTruncateStmt?: (ctx: TruncateStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.truncateStmt`.
	 * @param ctx the parse tree
	 */
	exitTruncateStmt?: (ctx: TruncateStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.useStmt`.
	 * @param ctx the parse tree
	 */
	enterUseStmt?: (ctx: UseStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.useStmt`.
	 * @param ctx the parse tree
	 */
	exitUseStmt?: (ctx: UseStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.watchStmt`.
	 * @param ctx the parse tree
	 */
	enterWatchStmt?: (ctx: WatchStmtContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.watchStmt`.
	 * @param ctx the parse tree
	 */
	exitWatchStmt?: (ctx: WatchStmtContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnTypeExpr?: (ctx: ColumnTypeExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnTypeExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnTypeExpr?: (ctx: ColumnTypeExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnExprList`.
	 * @param ctx the parse tree
	 */
	enterColumnExprList?: (ctx: ColumnExprListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnExprList`.
	 * @param ctx the parse tree
	 */
	exitColumnExprList?: (ctx: ColumnExprListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnsExpr?: (ctx: ColumnsExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnsExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnsExpr?: (ctx: ColumnsExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnExpr?: (ctx: ColumnExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnExpr?: (ctx: ColumnExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnArgList`.
	 * @param ctx the parse tree
	 */
	enterColumnArgList?: (ctx: ColumnArgListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnArgList`.
	 * @param ctx the parse tree
	 */
	exitColumnArgList?: (ctx: ColumnArgListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnArgExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnArgExpr?: (ctx: ColumnArgExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnArgExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnArgExpr?: (ctx: ColumnArgExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnLambdaExpr`.
	 * @param ctx the parse tree
	 */
	enterColumnLambdaExpr?: (ctx: ColumnLambdaExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnLambdaExpr`.
	 * @param ctx the parse tree
	 */
	exitColumnLambdaExpr?: (ctx: ColumnLambdaExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.columnIdentifier`.
	 * @param ctx the parse tree
	 */
	enterColumnIdentifier?: (ctx: ColumnIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.columnIdentifier`.
	 * @param ctx the parse tree
	 */
	exitColumnIdentifier?: (ctx: ColumnIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.nestedIdentifier`.
	 * @param ctx the parse tree
	 */
	enterNestedIdentifier?: (ctx: NestedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.nestedIdentifier`.
	 * @param ctx the parse tree
	 */
	exitNestedIdentifier?: (ctx: NestedIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	enterTableExpr?: (ctx: TableExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableExpr`.
	 * @param ctx the parse tree
	 */
	exitTableExpr?: (ctx: TableExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableFunctionExpr`.
	 * @param ctx the parse tree
	 */
	enterTableFunctionExpr?: (ctx: TableFunctionExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableFunctionExpr`.
	 * @param ctx the parse tree
	 */
	exitTableFunctionExpr?: (ctx: TableFunctionExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableIdentifier`.
	 * @param ctx the parse tree
	 */
	enterTableIdentifier?: (ctx: TableIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableIdentifier`.
	 * @param ctx the parse tree
	 */
	exitTableIdentifier?: (ctx: TableIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableArgList`.
	 * @param ctx the parse tree
	 */
	enterTableArgList?: (ctx: TableArgListContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableArgList`.
	 * @param ctx the parse tree
	 */
	exitTableArgList?: (ctx: TableArgListContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.tableArgExpr`.
	 * @param ctx the parse tree
	 */
	enterTableArgExpr?: (ctx: TableArgExprContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.tableArgExpr`.
	 * @param ctx the parse tree
	 */
	exitTableArgExpr?: (ctx: TableArgExprContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.databaseIdentifier`.
	 * @param ctx the parse tree
	 */
	enterDatabaseIdentifier?: (ctx: DatabaseIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.databaseIdentifier`.
	 * @param ctx the parse tree
	 */
	exitDatabaseIdentifier?: (ctx: DatabaseIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.floatingLiteral`.
	 * @param ctx the parse tree
	 */
	enterFloatingLiteral?: (ctx: FloatingLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.floatingLiteral`.
	 * @param ctx the parse tree
	 */
	exitFloatingLiteral?: (ctx: FloatingLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.numberLiteral`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.numberLiteral`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.interval`.
	 * @param ctx the parse tree
	 */
	enterInterval?: (ctx: IntervalContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.interval`.
	 * @param ctx the parse tree
	 */
	exitInterval?: (ctx: IntervalContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.keyword`.
	 * @param ctx the parse tree
	 */
	enterKeyword?: (ctx: KeywordContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.keyword`.
	 * @param ctx the parse tree
	 */
	exitKeyword?: (ctx: KeywordContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.keywordForAlias`.
	 * @param ctx the parse tree
	 */
	enterKeywordForAlias?: (ctx: KeywordForAliasContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.keywordForAlias`.
	 * @param ctx the parse tree
	 */
	exitKeywordForAlias?: (ctx: KeywordForAliasContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.alias`.
	 * @param ctx the parse tree
	 */
	enterAlias?: (ctx: AliasContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.alias`.
	 * @param ctx the parse tree
	 */
	exitAlias?: (ctx: AliasContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.identifierOrNull`.
	 * @param ctx the parse tree
	 */
	enterIdentifierOrNull?: (ctx: IdentifierOrNullContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.identifierOrNull`.
	 * @param ctx the parse tree
	 */
	exitIdentifierOrNull?: (ctx: IdentifierOrNullContext) => void;

	/**
	 * Enter a parse tree produced by `ClickHouseParser.enumValue`.
	 * @param ctx the parse tree
	 */
	enterEnumValue?: (ctx: EnumValueContext) => void;
	/**
	 * Exit a parse tree produced by `ClickHouseParser.enumValue`.
	 * @param ctx the parse tree
	 */
	exitEnumValue?: (ctx: EnumValueContext) => void;
}

