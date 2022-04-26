import { TablePrimary } from "..";
import { Edge, Table } from "../Lineage";
import { QueryStructureVisitor, TableRelation, QueryRelation } from "./QueryStructureVisitor";

/**
 * Visitor extending #QueryStructureVisitor and implementing #onRelation() and #onColumnReference()
 * to build column-based SQL lineage.
 */
export class LineageVisitor<TableData, ColumnData> extends QueryStructureVisitor<void> {
  /** Collected relations (tables). */
  tables: { tablePrimary?: TablePrimary; table: Table<TableData, ColumnData> }[] = [];

  /** Collected references (edges). */
  edges: Edge[] = [];

  constructor(
    getTable: (
      table: TablePrimary
    ) => { table: { id: string; data: TableData }; columns: { id: string; data: ColumnData }[] } | undefined,
    options?: {
      positionalRefsEnabled?: boolean;
    }
  ) {
    super(getTable, options);
  }

  //
  // Overrides
  //

  onColumnReference(tableId: string, columnId?: string): void {
    this.edges.push({
      type: "edge",
      edgeType: this.currentRelation.currentClause,
      source: {
        tableId: tableId,
        columnId: columnId
      },
      target: {
        tableId: this.currentRelation.id,
        columnId: this.currentRelation.currentColumnId
      }
    });
  }

  onRelation(relation: TableRelation | QueryRelation, alias?: string): void {
    let label = alias ?? relation.id;

    const columns = relation.columns.map(c => {
      return {
        id: c.id,
        label: c.label,
        range: c.range,
        data: c.data as ColumnData,
        isAssumed: c.isAssumed
      };
    });

    let tablePrimary: TablePrimary | undefined;
    if (relation instanceof TableRelation) {
      label =
        alias !== undefined && alias != relation.tablePrimary.tableName
          ? relation.tablePrimary.tableName + " -> " + alias
          : relation.tablePrimary.tableName;
      tablePrimary = relation.tablePrimary;
    }

    this.tables.push({
      tablePrimary,
      table: {
        type: "table",
        id: relation.id,
        label: label,
        range: relation.range,
        data: relation instanceof TableRelation ? (relation.data as TableData) : undefined,
        isSourceOnly: relation instanceof TableRelation ? true : undefined,
        columns: columns
      }
    });
  }

  protected defaultResult(): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  aggregateResult(_aggregate: void, _nextResult: void): void {
    return;
  }
}
