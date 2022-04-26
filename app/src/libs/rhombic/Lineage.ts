import { Range } from './utils/getRange';

/**
 * SQL Lineage contains relations (tables, subqueries,
 * common table expressions (CTEs)) defined as tables,
 * their columns and references between tables and columns in any combination (edges).
 */
export interface Lineage<TableData, ColumnData> {
  nodes: Table<TableData, ColumnData>[];
  edges: Edge[];
}

export interface TableModifier {
  type: 'filter' | 'groupBy';
  range: Range;
}

/**
 * Relation in SQL query (source table, subquery, CTE).
 */
export interface Table<TableData, ColumnData> {
  type: 'table';

  /** Identifier unique inside generated lineage (format is undefined). */
  id: string;

  /** Human-readable label. Not necessarily unique. */
  label: string;

  /** Defines textual region of the relation in the SQL text. */
  range?: Range;

  /** Additional provided table data (normally passed from metadata). */
  data?: TableData;

  /** This is an origin (not calculated) table */
  isSourceOnly?: boolean;

  /** This is a resulting table which doesn't have outgoing edges */
  isTargetOnly?: boolean;

  /** Relation columns. */
  columns: Column<ColumnData>[];

  /** Modifiers. See #TableModifier */
  modifiers?: TableModifier[];
}

/** SQL clause where dependency occured. */
export type EdgeType = 'select' | 'from' | 'where' | 'group by' | 'order by' | 'having';

/** Dependency between tables and/or columns. */
export interface Edge {
  type: 'edge';
  /** Optional label. */
  label?: string;

  /**
   * Table/column that is depended on. If `columnId` is undefined then it is a table. Otherwise it is
   * a column inside the table.
   */
  source: {
    tableId: string;
    columnId?: string;
  };

  /**
   * Dependent table/column. If `columnId` is undefined then it is a table. Otherwise it is
   * a column inside the table.
   */
  target: {
    tableId: string;
    columnId?: string;
  };

  /** Edge type. See #EdgeType */
  edgeType?: EdgeType;
}

/**
 * SQL relation column. Columns are defined both for source tables physically residing in the
 * database and for any query/subquery.
 */
export interface Column<ColumnData> {
  /** Column identifier unique inside table (relation). */
  id: string;

  /** Column label. Not necessarily unique. */
  label: string;

  /** Whether this column is inferred if real table metadata is absent. */
  isAssumed?: boolean;

  /** Textual position of this column inside original SQL text. */
  range?: Range;

  /** Optional column data passed from metadata. */
  data?: ColumnData;
}
