import { Edge, EdgeType, Lineage, Table, Column } from "./Lineage";

/**
 * Reduced interface of "Table" only including the properties required to uniquely identify a table in the lineage graph
 */
interface TableId {
  type: "table";
  id: string;
}

/**
 * Reduced interface of "ColumnReference" only including the properties required to uniquely identify a column in the lineage graph
 */
interface ColumnId {
  type: "column";
  tableId: string;
  column: {
    id: string;
  };
}

/**
 * Reduced interface of "Edge" only including the properties required to uniquely identify an edge in the lineage graph
 */
interface EdgeId {
  type: "edge";
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
 * A specific element in the lineage graph
 */
export type ElementId = TableId | ColumnId | EdgeId;

/**
 * Reference to a column
 * Includes the id of the table it is part of
 */
export interface ColumnReference<ColumnData> {
  type: "column";
  tableId: string;
  column: Column<ColumnData>;
}

export type LineageGraphElement<TableData, ColumnData> =
  | Table<TableData, ColumnData>
  | ColumnReference<ColumnData>
  | Edge;

export interface ConnectedElements<TableData, ColumnData> {
  tables: Table<TableData, ColumnData>[];
  columns: ColumnReference<ColumnData>[];
  edges: Edge[];
}

/**
 * "up" => upstream dependencies
 * "down" => downstream dependencies
 */
export type Direction = "up" | "down";

const edgeFinder = (edges: Edge[]) => (edgeId: EdgeId): Edge | undefined =>
  edges.find(
    element =>
      element.source.tableId === edgeId.source.tableId &&
      element.source.columnId === edgeId.source.columnId &&
      element.target.tableId === edgeId.target.tableId &&
      element.target.columnId === edgeId.target.columnId &&
      element.edgeType === edgeId.edgeType
  );

const tableFinder = <TableData, ColumnData>(tables: Table<TableData, ColumnData>[]) => (
  tableId: TableId
): Table<TableData, ColumnData> | undefined => tables.find(element => element.id === tableId.id);

const columnFinder = <TableData, ColumnData>(tables: Table<TableData, ColumnData>[]) => (
  columnId: ColumnId
): ColumnReference<ColumnData> | undefined => {
  const table = tableFinder(tables)({ type: "table", id: columnId.tableId });
  if (!table) return;
  const column = table.columns.find(column => column.id === columnId.column.id);
  if (!column) return;
  return {
    type: "column",
    tableId: table.id,
    column
  };
};

const edgesBySourceFinder = (edges: Edge[]) => (elementId: TableId | ColumnId) =>
  edges.filter(
    edge =>
      (elementId.type === "table" && edge.source.tableId === elementId.id && edge.source.columnId === undefined) ||
      (elementId.type === "column" &&
        edge.source.tableId === elementId.tableId &&
        edge.source.columnId === elementId.column.id)
  );

const edgesByTargetFinder = (edges: Edge[]) => (elementId: TableId | ColumnId) =>
  edges.filter(
    edge =>
      (elementId.type === "table" && edge.target.tableId === elementId.id && edge.target.columnId === undefined) ||
      (elementId.type === "column" &&
        edge.target.tableId === elementId.tableId &&
        edge.target.columnId === elementId.column.id)
  );

/**
 * Lineage Helper provides useful functions to work with an extracted lineage graph
 */
export const LineageHelper = <TableData, ColumnData>(lineage: Lineage<TableData, ColumnData>) => {
  const findEdge = edgeFinder(lineage.edges);
  const findTable = tableFinder(lineage.nodes);
  const findColumn = columnFinder(lineage.nodes);
  const findEdgesFromSource = edgesBySourceFinder(lineage.edges);
  const findEdgesToTarget = edgesByTargetFinder(lineage.edges);

  const findElement = (elementId: ElementId): LineageGraphElement<TableData, ColumnData> | undefined => {
    switch (elementId.type) {
      case "table":
        return findTable(elementId);
      case "column":
        return findColumn(elementId);
      case "edge":
        return findEdge(elementId);
    }
  };

  const walkUp = (elementId: ElementId) => {
    if (elementId.type === "table" || elementId.type === "column") {
      return findEdgesToTarget(elementId);
    }
    // it's and edge
    const tableOrColumn =
      elementId.source.columnId !== undefined
        ? findElement({ type: "column", tableId: elementId.source.tableId, column: { id: elementId.source.columnId } })
        : findElement({ type: "table", id: elementId.source.tableId });
    return tableOrColumn === undefined ? [] : [tableOrColumn];
  };

  const walkDown = (elementId: ElementId) => {
    if (elementId.type === "table" || elementId.type === "column") {
      return findEdgesFromSource(elementId);
    }
    // it's and edge
    const tableOrColumn =
      elementId.target.columnId !== undefined
        ? findElement({ type: "column", tableId: elementId.target.tableId, column: { id: elementId.target.columnId } })
        : findElement({ type: "table", id: elementId.target.tableId });
    return tableOrColumn === undefined ? [] : [tableOrColumn];
  };

  // Texas Ranger
  const walker = (
    elementId: ElementId,
    direction: Direction,
    eachElement: (element: LineageGraphElement<TableData, ColumnData>) => void
  ) => {
    (direction === "up" ? walkUp : walkDown)(elementId).forEach(element => {
      eachElement(element);
      walker(element, direction, eachElement);
    });
  };

  const findConnectedElements = (elementId: ElementId) => {
    // Check that the given element exists
    const referenceElement = findElement(elementId);
    if (!referenceElement) throw Error(`Element not found in lineage - ${JSON.stringify(elementId)}`);

    // Collect connected elements
    const elements: ConnectedElements<TableData, ColumnData> = { tables: [], columns: [], edges: [] };
    const collect = (element: LineageGraphElement<TableData, ColumnData>) => {
      switch (element.type) {
        case "table":
          elements.tables.push(element);
          break;
        case "column":
          elements.columns.push(element);
          break;
        case "edge":
          elements.edges.push(element);
          break;
      }
    };
    // Include the given element in the connected elements
    collect(referenceElement);

    // Walk the graph
    walker(elementId, "up", collect);
    walker(elementId, "down", collect);
    return ConnectedElementsHelper(elements);
  };

  return {
    /**
     * Finds an element (table, column, edge) in the lineage graph
     */
    findElement,
    /**
     * Finds all edges originating at a specific source table or column
     */
    findEdgesFromSource,
    /**
     * Finds all edges targeting a specific source table or column
     */
    findEdgesToTarget,
    /**
     * Finds all elements connected via the graph to a focused element
     */
    findConnectedElements
  };
};

export const ConnectedElementsHelper = <TableData, ColumnData>(elements: ConnectedElements<TableData, ColumnData>) => {
  return {
    elements,
    findElement: (elementId: ElementId) => {
      switch (elementId.type) {
        case "table":
          return elements.tables.find(t => t.id === elementId.id);
        case "column":
          return elements.columns.find(c => c.tableId === elementId.tableId && c.column.id === elementId.column.id);
        case "edge":
          return elements.edges.find(
            e =>
              e.edgeType === elementId.edgeType &&
              e.source.tableId === elementId.source.tableId &&
              e.source.columnId === elementId.source.columnId &&
              e.target.tableId === elementId.target.tableId &&
              e.target.columnId === elementId.target.columnId
          );
      }
    }
  };
};
