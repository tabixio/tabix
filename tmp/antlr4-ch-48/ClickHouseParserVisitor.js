// Generated from /Users/igor/sites/tabix.ts21/grammar/clickhouse/ClickHouseParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by ClickHouseParser.

function ClickHouseParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

ClickHouseParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
ClickHouseParserVisitor.prototype.constructor = ClickHouseParserVisitor;

// Visit a parse tree produced by ClickHouseParser#sql.
ClickHouseParserVisitor.prototype.visitSql = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#queryStmt.
ClickHouseParserVisitor.prototype.visitQueryStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#query.
ClickHouseParserVisitor.prototype.visitQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableStmt.
ClickHouseParserVisitor.prototype.visitAlterTableStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseAddColumn.
ClickHouseParserVisitor.prototype.visitAlterTableClauseAddColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseAddIndex.
ClickHouseParserVisitor.prototype.visitAlterTableClauseAddIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseAddProjection.
ClickHouseParserVisitor.prototype.visitAlterTableClauseAddProjection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseAttach.
ClickHouseParserVisitor.prototype.visitAlterTableClauseAttach = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseClearColumn.
ClickHouseParserVisitor.prototype.visitAlterTableClauseClearColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseClearIndex.
ClickHouseParserVisitor.prototype.visitAlterTableClauseClearIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseClearProjection.
ClickHouseParserVisitor.prototype.visitAlterTableClauseClearProjection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseComment.
ClickHouseParserVisitor.prototype.visitAlterTableClauseComment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDelete.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDelete = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDetach.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDetach = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDropColumn.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDropColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDropIndex.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDropIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDropProjection.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDropProjection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseDropPartition.
ClickHouseParserVisitor.prototype.visitAlterTableClauseDropPartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseFreezePartition.
ClickHouseParserVisitor.prototype.visitAlterTableClauseFreezePartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseMaterializeIndex.
ClickHouseParserVisitor.prototype.visitAlterTableClauseMaterializeIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseMaterializeProjection.
ClickHouseParserVisitor.prototype.visitAlterTableClauseMaterializeProjection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModifyCodec.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModifyCodec = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModifyComment.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModifyComment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModifyRemove.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModifyRemove = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModify.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModify = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModifyOrderBy.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModifyOrderBy = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseModifyTTL.
ClickHouseParserVisitor.prototype.visitAlterTableClauseModifyTTL = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseMovePartition.
ClickHouseParserVisitor.prototype.visitAlterTableClauseMovePartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseRemoveTTL.
ClickHouseParserVisitor.prototype.visitAlterTableClauseRemoveTTL = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseRename.
ClickHouseParserVisitor.prototype.visitAlterTableClauseRename = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseReplace.
ClickHouseParserVisitor.prototype.visitAlterTableClauseReplace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AlterTableClauseUpdate.
ClickHouseParserVisitor.prototype.visitAlterTableClauseUpdate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#assignmentExprList.
ClickHouseParserVisitor.prototype.visitAssignmentExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#assignmentExpr.
ClickHouseParserVisitor.prototype.visitAssignmentExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableColumnPropertyType.
ClickHouseParserVisitor.prototype.visitTableColumnPropertyType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#partitionClause.
ClickHouseParserVisitor.prototype.visitPartitionClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#AttachDictionaryStmt.
ClickHouseParserVisitor.prototype.visitAttachDictionaryStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#checkStmt.
ClickHouseParserVisitor.prototype.visitCheckStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateDatabaseStmt.
ClickHouseParserVisitor.prototype.visitCreateDatabaseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateDictionaryStmt.
ClickHouseParserVisitor.prototype.visitCreateDictionaryStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateLiveViewStmt.
ClickHouseParserVisitor.prototype.visitCreateLiveViewStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateMaterializedViewStmt.
ClickHouseParserVisitor.prototype.visitCreateMaterializedViewStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateTableStmt.
ClickHouseParserVisitor.prototype.visitCreateTableStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#CreateViewStmt.
ClickHouseParserVisitor.prototype.visitCreateViewStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionarySchemaClause.
ClickHouseParserVisitor.prototype.visitDictionarySchemaClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionaryAttrDfnt.
ClickHouseParserVisitor.prototype.visitDictionaryAttrDfnt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionaryEngineClause.
ClickHouseParserVisitor.prototype.visitDictionaryEngineClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionaryPrimaryKeyClause.
ClickHouseParserVisitor.prototype.visitDictionaryPrimaryKeyClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionaryArgExpr.
ClickHouseParserVisitor.prototype.visitDictionaryArgExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#sourceClause.
ClickHouseParserVisitor.prototype.visitSourceClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#lifetimeClause.
ClickHouseParserVisitor.prototype.visitLifetimeClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#layoutClause.
ClickHouseParserVisitor.prototype.visitLayoutClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#rangeClause.
ClickHouseParserVisitor.prototype.visitRangeClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#dictionarySettingsClause.
ClickHouseParserVisitor.prototype.visitDictionarySettingsClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#clusterClause.
ClickHouseParserVisitor.prototype.visitClusterClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#uuidClause.
ClickHouseParserVisitor.prototype.visitUuidClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#destinationClause.
ClickHouseParserVisitor.prototype.visitDestinationClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#subqueryClause.
ClickHouseParserVisitor.prototype.visitSubqueryClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#SchemaDescriptionClause.
ClickHouseParserVisitor.prototype.visitSchemaDescriptionClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#SchemaAsTableClause.
ClickHouseParserVisitor.prototype.visitSchemaAsTableClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#SchemaAsFunctionClause.
ClickHouseParserVisitor.prototype.visitSchemaAsFunctionClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#engineClause.
ClickHouseParserVisitor.prototype.visitEngineClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#partitionByClause.
ClickHouseParserVisitor.prototype.visitPartitionByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#primaryKeyClause.
ClickHouseParserVisitor.prototype.visitPrimaryKeyClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#sampleByClause.
ClickHouseParserVisitor.prototype.visitSampleByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ttlClause.
ClickHouseParserVisitor.prototype.visitTtlClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#engineExpr.
ClickHouseParserVisitor.prototype.visitEngineExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableElementExprColumn.
ClickHouseParserVisitor.prototype.visitTableElementExprColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableElementExprConstraint.
ClickHouseParserVisitor.prototype.visitTableElementExprConstraint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableElementExprIndex.
ClickHouseParserVisitor.prototype.visitTableElementExprIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableElementExprProjection.
ClickHouseParserVisitor.prototype.visitTableElementExprProjection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableColumnDfnt.
ClickHouseParserVisitor.prototype.visitTableColumnDfnt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableColumnPropertyExpr.
ClickHouseParserVisitor.prototype.visitTableColumnPropertyExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableIndexDfnt.
ClickHouseParserVisitor.prototype.visitTableIndexDfnt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableProjectionDfnt.
ClickHouseParserVisitor.prototype.visitTableProjectionDfnt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#codecExpr.
ClickHouseParserVisitor.prototype.visitCodecExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#codecArgExpr.
ClickHouseParserVisitor.prototype.visitCodecArgExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ttlExpr.
ClickHouseParserVisitor.prototype.visitTtlExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#describeStmt.
ClickHouseParserVisitor.prototype.visitDescribeStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#DropDatabaseStmt.
ClickHouseParserVisitor.prototype.visitDropDatabaseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#DropTableStmt.
ClickHouseParserVisitor.prototype.visitDropTableStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ExistsDatabaseStmt.
ClickHouseParserVisitor.prototype.visitExistsDatabaseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ExistsTableStmt.
ClickHouseParserVisitor.prototype.visitExistsTableStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ExplainASTStmt.
ClickHouseParserVisitor.prototype.visitExplainASTStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ExplainSyntaxStmt.
ClickHouseParserVisitor.prototype.visitExplainSyntaxStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#insertStmt.
ClickHouseParserVisitor.prototype.visitInsertStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnsClause.
ClickHouseParserVisitor.prototype.visitColumnsClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#DataClauseFormat.
ClickHouseParserVisitor.prototype.visitDataClauseFormat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#DataClauseValues.
ClickHouseParserVisitor.prototype.visitDataClauseValues = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#DataClauseSelect.
ClickHouseParserVisitor.prototype.visitDataClauseSelect = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#KillMutationStmt.
ClickHouseParserVisitor.prototype.visitKillMutationStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#optimizeStmt.
ClickHouseParserVisitor.prototype.visitOptimizeStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#renameStmt.
ClickHouseParserVisitor.prototype.visitRenameStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#projectionSelectStmt.
ClickHouseParserVisitor.prototype.visitProjectionSelectStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#selectUnionStmt.
ClickHouseParserVisitor.prototype.visitSelectUnionStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#selectStmtWithParens.
ClickHouseParserVisitor.prototype.visitSelectStmtWithParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#selectStmt.
ClickHouseParserVisitor.prototype.visitSelectStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#withClause.
ClickHouseParserVisitor.prototype.visitWithClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#topClause.
ClickHouseParserVisitor.prototype.visitTopClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#fromClause.
ClickHouseParserVisitor.prototype.visitFromClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#arrayJoinClause.
ClickHouseParserVisitor.prototype.visitArrayJoinClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#windowClause.
ClickHouseParserVisitor.prototype.visitWindowClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#prewhereClause.
ClickHouseParserVisitor.prototype.visitPrewhereClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#whereClause.
ClickHouseParserVisitor.prototype.visitWhereClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#groupByClause.
ClickHouseParserVisitor.prototype.visitGroupByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#havingClause.
ClickHouseParserVisitor.prototype.visitHavingClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#orderByClause.
ClickHouseParserVisitor.prototype.visitOrderByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#projectionOrderByClause.
ClickHouseParserVisitor.prototype.visitProjectionOrderByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#limitByClause.
ClickHouseParserVisitor.prototype.visitLimitByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#limitClause.
ClickHouseParserVisitor.prototype.visitLimitClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#settingsClause.
ClickHouseParserVisitor.prototype.visitSettingsClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinExprOp.
ClickHouseParserVisitor.prototype.visitJoinExprOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinExprTable.
ClickHouseParserVisitor.prototype.visitJoinExprTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinExprParens.
ClickHouseParserVisitor.prototype.visitJoinExprParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinExprCrossOp.
ClickHouseParserVisitor.prototype.visitJoinExprCrossOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinOpInner.
ClickHouseParserVisitor.prototype.visitJoinOpInner = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinOpLeftRight.
ClickHouseParserVisitor.prototype.visitJoinOpLeftRight = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#JoinOpFull.
ClickHouseParserVisitor.prototype.visitJoinOpFull = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#joinOpCross.
ClickHouseParserVisitor.prototype.visitJoinOpCross = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#joinConstraintClause.
ClickHouseParserVisitor.prototype.visitJoinConstraintClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#sampleClause.
ClickHouseParserVisitor.prototype.visitSampleClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#limitExpr.
ClickHouseParserVisitor.prototype.visitLimitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#orderExprList.
ClickHouseParserVisitor.prototype.visitOrderExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#orderExpr.
ClickHouseParserVisitor.prototype.visitOrderExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ratioExpr.
ClickHouseParserVisitor.prototype.visitRatioExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#settingExprList.
ClickHouseParserVisitor.prototype.visitSettingExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#settingExpr.
ClickHouseParserVisitor.prototype.visitSettingExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#windowExpr.
ClickHouseParserVisitor.prototype.visitWindowExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#winPartitionByClause.
ClickHouseParserVisitor.prototype.visitWinPartitionByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#winOrderByClause.
ClickHouseParserVisitor.prototype.visitWinOrderByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#winFrameClause.
ClickHouseParserVisitor.prototype.visitWinFrameClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#frameStart.
ClickHouseParserVisitor.prototype.visitFrameStart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#frameBetween.
ClickHouseParserVisitor.prototype.visitFrameBetween = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#winFrameBound.
ClickHouseParserVisitor.prototype.visitWinFrameBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#setStmt.
ClickHouseParserVisitor.prototype.visitSetStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showCreateDatabaseStmt.
ClickHouseParserVisitor.prototype.visitShowCreateDatabaseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showCreateDictionaryStmt.
ClickHouseParserVisitor.prototype.visitShowCreateDictionaryStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showCreateTableStmt.
ClickHouseParserVisitor.prototype.visitShowCreateTableStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showDatabasesStmt.
ClickHouseParserVisitor.prototype.visitShowDatabasesStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showDictionariesStmt.
ClickHouseParserVisitor.prototype.visitShowDictionariesStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#showTablesStmt.
ClickHouseParserVisitor.prototype.visitShowTablesStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#systemStmt.
ClickHouseParserVisitor.prototype.visitSystemStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#truncateStmt.
ClickHouseParserVisitor.prototype.visitTruncateStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#useStmt.
ClickHouseParserVisitor.prototype.visitUseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#watchStmt.
ClickHouseParserVisitor.prototype.visitWatchStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnTypeExprSimple.
ClickHouseParserVisitor.prototype.visitColumnTypeExprSimple = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnTypeExprNested.
ClickHouseParserVisitor.prototype.visitColumnTypeExprNested = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnTypeExprEnum.
ClickHouseParserVisitor.prototype.visitColumnTypeExprEnum = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnTypeExprComplex.
ClickHouseParserVisitor.prototype.visitColumnTypeExprComplex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnTypeExprParam.
ClickHouseParserVisitor.prototype.visitColumnTypeExprParam = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnExprList.
ClickHouseParserVisitor.prototype.visitColumnExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnsExprAsterisk.
ClickHouseParserVisitor.prototype.visitColumnsExprAsterisk = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnsExprSubquery.
ClickHouseParserVisitor.prototype.visitColumnsExprSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnsExprColumn.
ClickHouseParserVisitor.prototype.visitColumnsExprColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprTernaryOp.
ClickHouseParserVisitor.prototype.visitColumnExprTernaryOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprAlias.
ClickHouseParserVisitor.prototype.visitColumnExprAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprExtract.
ClickHouseParserVisitor.prototype.visitColumnExprExtract = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprNegate.
ClickHouseParserVisitor.prototype.visitColumnExprNegate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprSubquery.
ClickHouseParserVisitor.prototype.visitColumnExprSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprLiteral.
ClickHouseParserVisitor.prototype.visitColumnExprLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprArray.
ClickHouseParserVisitor.prototype.visitColumnExprArray = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprSubstring.
ClickHouseParserVisitor.prototype.visitColumnExprSubstring = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprCast.
ClickHouseParserVisitor.prototype.visitColumnExprCast = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprOr.
ClickHouseParserVisitor.prototype.visitColumnExprOr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprPrecedence1.
ClickHouseParserVisitor.prototype.visitColumnExprPrecedence1 = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprPrecedence2.
ClickHouseParserVisitor.prototype.visitColumnExprPrecedence2 = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprPrecedence3.
ClickHouseParserVisitor.prototype.visitColumnExprPrecedence3 = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprInterval.
ClickHouseParserVisitor.prototype.visitColumnExprInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprIsNull.
ClickHouseParserVisitor.prototype.visitColumnExprIsNull = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprWinFunctionTarget.
ClickHouseParserVisitor.prototype.visitColumnExprWinFunctionTarget = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprTrim.
ClickHouseParserVisitor.prototype.visitColumnExprTrim = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprTuple.
ClickHouseParserVisitor.prototype.visitColumnExprTuple = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprArrayAccess.
ClickHouseParserVisitor.prototype.visitColumnExprArrayAccess = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprBetween.
ClickHouseParserVisitor.prototype.visitColumnExprBetween = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprParens.
ClickHouseParserVisitor.prototype.visitColumnExprParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprTimestamp.
ClickHouseParserVisitor.prototype.visitColumnExprTimestamp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprAnd.
ClickHouseParserVisitor.prototype.visitColumnExprAnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprTupleAccess.
ClickHouseParserVisitor.prototype.visitColumnExprTupleAccess = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprCase.
ClickHouseParserVisitor.prototype.visitColumnExprCase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprDate.
ClickHouseParserVisitor.prototype.visitColumnExprDate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprNot.
ClickHouseParserVisitor.prototype.visitColumnExprNot = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprWinFunction.
ClickHouseParserVisitor.prototype.visitColumnExprWinFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprIdentifier.
ClickHouseParserVisitor.prototype.visitColumnExprIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprFunction.
ClickHouseParserVisitor.prototype.visitColumnExprFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#ColumnExprAsterisk.
ClickHouseParserVisitor.prototype.visitColumnExprAsterisk = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnArgList.
ClickHouseParserVisitor.prototype.visitColumnArgList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnArgExpr.
ClickHouseParserVisitor.prototype.visitColumnArgExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnLambdaExpr.
ClickHouseParserVisitor.prototype.visitColumnLambdaExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#columnIdentifier.
ClickHouseParserVisitor.prototype.visitColumnIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#nestedIdentifier.
ClickHouseParserVisitor.prototype.visitNestedIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableExprIdentifier.
ClickHouseParserVisitor.prototype.visitTableExprIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableExprSubquery.
ClickHouseParserVisitor.prototype.visitTableExprSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableExprAlias.
ClickHouseParserVisitor.prototype.visitTableExprAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#TableExprFunction.
ClickHouseParserVisitor.prototype.visitTableExprFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableFunctionExpr.
ClickHouseParserVisitor.prototype.visitTableFunctionExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableIdentifier.
ClickHouseParserVisitor.prototype.visitTableIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableArgList.
ClickHouseParserVisitor.prototype.visitTableArgList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#tableArgExpr.
ClickHouseParserVisitor.prototype.visitTableArgExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#databaseIdentifier.
ClickHouseParserVisitor.prototype.visitDatabaseIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#floatingLiteral.
ClickHouseParserVisitor.prototype.visitFloatingLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#numberLiteral.
ClickHouseParserVisitor.prototype.visitNumberLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#literal.
ClickHouseParserVisitor.prototype.visitLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#interval.
ClickHouseParserVisitor.prototype.visitInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#keyword.
ClickHouseParserVisitor.prototype.visitKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#keywordForAlias.
ClickHouseParserVisitor.prototype.visitKeywordForAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#alias.
ClickHouseParserVisitor.prototype.visitAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#identifier.
ClickHouseParserVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#identifierOrNull.
ClickHouseParserVisitor.prototype.visitIdentifierOrNull = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by ClickHouseParser#enumValue.
ClickHouseParserVisitor.prototype.visitEnumValue = function(ctx) {
  return this.visitChildren(ctx);
};



exports.ClickHouseParserVisitor = ClickHouseParserVisitor;