import { parseSql, parseFilter } from './SqlParser';
import { HasFromVisitor } from './visitors/HasFromVisitor';
import { ProjectionItemsVisitor } from './visitors/ProjectionItemsVisitor';
import { insertText } from './utils/insertText';
import { CstNode } from 'chevrotain';
import { TablePrimaryVisitor } from './visitors/TablePrimaryVisitor';
import { replaceText } from './utils/replaceText';
import { getRange, Range } from './utils/getRange';
import { needToBeEscaped } from './utils/needToBeEscaped';
import { printFilter } from './utils/printFilter';
import { getText } from './utils/getText';
import { OrderByVisitor } from './visitors/OrderByVisitor';
import { FilterTree } from './FilterTree';
import { FilterTreeVisitor } from './visitors/FilterTreeVisitor';
import { WhereVisitor } from './visitors/WhereVisitor';
import { getImageFromChildren } from './utils/getImageFromChildren';
import { fixOrderItem } from './utils/fixOrderItem';
import { removeUnusedOrderItems } from './utils/removeUnusedOrderItems';
//
//
// Antlr parser version
export { default as antlr } from './antlr';
export { LineageHelper } from './LineageHelper';

// Utils
export { needToBeEscaped, printFilter };

const rhombic = {
  /**
   * Parse a sql statement.
   *
   * @param sql
   */
  parse(sql: string) {
    return parsedSql(sql);
  },

  /**
   * Returns `true` if the query is empty (no executable sql)
   *
   * Note: the sql don't have to be valid, we are just checking if everything is commented
   * @param sql
   */
  isEmpty(sql: string) {
    return sql.split('\n').reduce((isEmpty, line) => {
      if (line.trim().startsWith('--') || line.trim() === '') return isEmpty;
      return false;
    }, true);
  },

  /**
   * Returns `true` if the filter is valid.
   *
   * @param filter
   */
  isFilterValid(filter: string) {
    const { lexErrors, parseErrors } = parseFilter(filter);
    return lexErrors.length + parseErrors.length === 0;
  },
};

export interface ProjectionItemMetadata {
  expression: string;
  alias?: string;
  cast?: { value: string; type: string };
  fn?: {
    identifier: string;
    values: {
      expression: string;
      path?: {
        catalogName?: string;
        schemaName?: string;
        tableName?: string;
        columnName: string;
      };
    }[];
  };
  sort?: {
    order: 'asc' | 'desc';
    nullsOrder?: 'first' | 'last';
  };
  path?: {
    catalogName?: string;
    schemaName?: string;
    tableName?: string;
    columnName: string;
  };
  range?: Range;
}

export interface TablePrimary {
  catalogName?: string;
  schemaName?: string;
  tableName: string;
  alias?: string;
  range?: Range;
}

export interface TablePrimaryIncomplete {
  references: string[];
}

// Note: Because we have a recursion, we can't rely on typescript inference
// `addProjectionItem` will return `any` without this type definition
/**
 * Parsed SQL AST together with various operations that can be applied.
 */
export interface ParsedSql {
  /**
   * Return the sql as a raw string.
   */
  toString(): string;

  /**
   * Concrete Syntax Tree.
   */
  cst: CstNode;

  /**
   * Returns `true` if the statement has a `FROM`.
   */
  hasFrom(): boolean;

  /**
   * Returns `true` if the `tablePrimary` is part of the query.
   *
   * @param name
   */
  hasTablePrimary(name: string): boolean;

  /**
   * Get all `tablePrimary`.
   */
  getTablePrimaries(): TablePrimary[];

  /**
   * Get a projectionItem from result index.
   *
   * @param options
   * @param options.columns Query columns results, needed to be able to expands `*`
   * @param options.index Index of the `projectionItem` to rename
   *
   * @param internalVisitor used internally by `getProjectionItems` to reused the same visitor (the visitor must already have a valid `output`)
   */
  getProjectionItem(
    options: {
      columns: string[];
      index: number;
    },
    internalVisitor?: ProjectionItemsVisitor
  ): ProjectionItemMetadata;

  /**
   * Get all projectionItems metadata.
   *
   * @param columns Query columns results, needed to be able to expands `*`
   */
  getProjectionItems(columns: string[]): ProjectionItemMetadata[];

  /**
   * Add a projectionItem to the query.
   *
   * @param projectionItem
   * @param options
   * @param options.removeAsterisk Remove `*` from the original query (default: `true`)
   * @param options.escapeReservedKeywords Escape reserved keywords (default: `true`)
   * @param options.alias Provide an alias to the projection item (`AS {alias}`)
   */
  addProjectionItem(
    projectionItem: string,
    options?: {
      removeAsterisk?: boolean;
      escapeReservedKeywords?: boolean;
      alias?: string;
    }
  ): ParsedSql;

  /**
   * Update a projectionItem.
   *
   * @param options
   * @param options.columns Query columns results, needed to be able to expands `*`
   * @param options.index Index of the `projectionItem` to rename
   * @param options.value Replace value for the `projectionItem`
   */
  updateProjectionItem(options: { columns: string[]; index: number; value: string }): ParsedSql;

  /**
   * Remove a projectionItem.
   *
   * @param options
   * @param options.columns Query columns results, needed to be able to expands `*`
   * @param options.index Index of the `projectionItem` to rename
   */
  removeProjectionItem(options: { columns: string[]; index: number }): ParsedSql;

  /**
   * Add/Update an ORDER BY expression.
   *
   * @param options
   * @param options.expression
   * @param options.order
   * @param options.nullsOrder
   */
  orderBy(options: {
    expression: string;
    order?: 'asc' | 'desc';
    nullsOrder?: 'last' | 'first';
  }): ParsedSql;

  /**
   * Retrieve a UI friendly object that represent the current filter (`WHERE` statement).
   */
  getFilterTree(): FilterTree;

  /**
   * Get the filter as a string (`WHERE statement`).
   */
  getFilterString(): string;

  /**
   * Update the current filter.
   *
   * @param filter
   */
  updateFilter(filter: FilterTree | string): ParsedSql;
}

/**
 * Parsed sql statement, with all utilities methods assigned.
 *
 * @param sql
 */
const parsedSql = (sql: string): ParsedSql => {
  const { cst, lexErrors, parseErrors } = parseSql(sql);

  if (lexErrors.length) {
    throw new Error(`Lexer error:\n - ${lexErrors.map((err) => err.message).join('\n - ')}`);
  }

  if (parseErrors.length) {
    throw new Error(`Parse error:\n - ${parseErrors.map((err) => err.message).join('\n - ')}`);
  }

  return {
    toString() {
      return sql;
    },

    cst,

    hasFrom() {
      const visitor = new HasFromVisitor();
      visitor.visit(cst);
      return visitor.hasFrom;
    },

    hasTablePrimary(name) {
      const visitor = new TablePrimaryVisitor(name);
      visitor.visit(cst);
      return visitor.hasTablePrimary;
    },

    getTablePrimaries() {
      const visitor = new TablePrimaryVisitor();
      visitor.visit(cst);
      return visitor.tables;
    },

    getProjectionItem({ columns, index }, internalVisitor) {
      const visitor = internalVisitor || new ProjectionItemsVisitor();
      if (!internalVisitor) visitor.visit(cst);
      const projectionItems = visitor.output;

      if (visitor.asteriskCount > 0) {
        // Projection not in asterisk
        if (projectionItems[index] && !projectionItems[index].isAsterisk) {
          return {
            expression: projectionItems[index].expression,
            path: projectionItems[index].path,
            alias: projectionItems[index].alias,
            cast: projectionItems[index].cast,
            fn: projectionItems[index].fn,
            sort: projectionItems[index].sort,
            range: projectionItems[index].range,
          };
        }

        // Check for duplicate projection names
        const value = columns[index];
        const otherNames = projectionItems.reduce((mem, i) => {
          if (i.isAsterisk) return mem;
          return [...mem, i.alias || i.expression];
        }, [] as string[]);
        const candidates = otherNames
          .filter((i) => value.startsWith(i))
          .sort((a, b) => b.length - a.length);
        const originalValue = candidates[0];
        const sort = visitor.sort.find((i) => i.expression === (originalValue || value));

        return {
          expression: originalValue || value,
          path: { columnName: originalValue || value },
          sort: sort ? { order: sort.order || 'asc', nullsOrder: sort.nullsOrder } : undefined,
        };
      } else {
        return {
          expression: projectionItems[index].expression,
          path: projectionItems[index].path,
          alias: projectionItems[index].alias,
          cast: projectionItems[index].cast,
          fn: projectionItems[index].fn,
          sort: projectionItems[index].sort,
          range: projectionItems[index].range,
        };
      }
    },

    getProjectionItems(columns) {
      const visitor = new ProjectionItemsVisitor();
      visitor.visit(cst);
      return columns.map((_, index) => this.getProjectionItem({ columns, index }, visitor));
    },

    addProjectionItem(projectionItem, options) {
      // Default options
      options = {
        removeAsterisk: true,
        escapeReservedKeywords: true,
        ...options,
      };

      const visitor = new ProjectionItemsVisitor();
      visitor.visit(cst);
      const lastProjectionItem = visitor.output[visitor.output.length - 1];

      const hasAsterisk = visitor.asteriskCount;

      // escape reserved keywords
      if (
        options.escapeReservedKeywords &&
        projectionItem[0] !== '"' &&
        needToBeEscaped(projectionItem)
      ) {
        projectionItem = `"${projectionItem}"`;
      }

      // add alias
      if (options.alias) {
        projectionItem += needToBeEscaped(options.alias)
          ? ` AS "${options.alias}"`
          : ` AS ${options.alias}`;
      }

      // multiline query
      if (visitor.output.length > 1) {
        const previousProjectionItem = visitor.output[visitor.output.length - 2];
        const isMultiline =
          previousProjectionItem.range.endLine !== lastProjectionItem.range.endLine;

        if (isMultiline) {
          const spaces = ' '.repeat((lastProjectionItem.range.startColumn || 1) - 1);

          let nextSql = insertText(sql, `,\n${spaces}${projectionItem}`, {
            line: lastProjectionItem.range.endLine || 1,
            column: lastProjectionItem.range.endColumn || 0,
          });

          if (options.removeAsterisk && hasAsterisk) {
            nextSql = nextSql.replace('*,\n' + spaces, '');
          }
          return parsedSql(nextSql);
        }
      }

      // one line case insertion
      let nextSql = insertText(sql, `, ${projectionItem}`, {
        line: lastProjectionItem.range.endLine || 1,
        column: lastProjectionItem.range.endColumn || 0,
      });

      if (options.removeAsterisk && hasAsterisk) {
        nextSql = nextSql.replace('*, ', '');
      }

      return parsedSql(nextSql);
    },

    updateProjectionItem({ index, value, columns }) {
      const visitor = new ProjectionItemsVisitor();
      visitor.visit(cst);
      const projectionItems = visitor.output;
      const asteriskIndex = projectionItems.findIndex((t) => t.isAsterisk) || 0;

      if (visitor.asteriskCount > 0 && index >= asteriskIndex) {
        // Expand asterisk
        const nonAsteriskItemsCount = projectionItems.filter((i) => !i.isAsterisk).length;
        const projectionItemsBehindAsterisk =
          (columns.length - nonAsteriskItemsCount) / visitor.asteriskCount;

        // Extract tableAlias
        const tablePrimaries = this.getTablePrimaries();
        const tableAliases = tablePrimaries.reduce(
          (mem, i) => (i.alias ? [...mem, i.alias] : mem),
          [] as string[]
        );

        const nextSql = replaceText(
          sql,
          columns
            .slice(asteriskIndex, asteriskIndex + projectionItemsBehindAsterisk)
            .map((c, i) => {
              if (i + asteriskIndex === index) return value;

              // Deal with tableAlias, `a.my_column` should not be espaced!
              const aliasCase = tableAliases.reduce((mem, alias) => {
                if (c.startsWith(`${alias}.`)) {
                  c = c.slice(`${alias}.`.length);
                  return `${alias}.${needToBeEscaped(c) ? `"${c}"` : c}`;
                }
                return mem;
              }, '');
              if (aliasCase) return aliasCase;
              return needToBeEscaped(c) ? `"${c}"` : c;
            })
            .join(', '),
          projectionItems[asteriskIndex].range
        );

        return parsedSql(nextSql);
      } else {
        const targetNode = projectionItems[index];
        const nextSql = replaceText(sql, value, targetNode.range);

        // Check if we need to rename an order item
        const needToFixOrderItem =
          visitor.sort.filter(
            (i) => i.expression === targetNode.expression || i.expression === targetNode.alias
          ).length > 0;

        if (needToFixOrderItem) {
          return parsedSql(fixOrderItem(parsedSql(nextSql), targetNode, index));
        }

        return parsedSql(nextSql);
      }
    },

    removeProjectionItem({ columns, index }) {
      const visitor = new ProjectionItemsVisitor();
      visitor.visit(cst);
      const projectionItems = visitor.output;
      const hasSort = visitor.sort.length > 0;

      if (visitor.asteriskCount > 0) {
        // Expand asterisk
        const nonAsteriskItemsCount = projectionItems.filter((i) => !i.isAsterisk).length;
        const projectionItemsBehindAsterisk =
          (columns.length - nonAsteriskItemsCount) / visitor.asteriskCount;
        const asteriskIndex = projectionItems.findIndex((t) => t.isAsterisk) || 0;

        if (index >= asteriskIndex) {
          const nextSql = replaceText(
            sql,
            columns
              .slice(asteriskIndex, asteriskIndex + projectionItemsBehindAsterisk)
              .filter((_, i) => i + asteriskIndex !== index)
              .join(', '),
            projectionItems[asteriskIndex].range
          );
          if (hasSort) {
            return parsedSql(removeUnusedOrderItems(parsedSql(nextSql), columns[index]));
          }
          return parsedSql(nextSql);
        }
      }

      const targetNode = projectionItems[index];

      if (visitor.commas.length > 0) {
        // Include the commas in the selection to remove
        const comma = getRange(visitor.commas[Math.min(visitor.commas.length - 1, index)]);
        if (
          comma.startLine < targetNode.range.startLine ||
          comma.startColumn < targetNode.range.startColumn
        ) {
          targetNode.range.startLine = comma.startLine || targetNode.range.startLine;
          targetNode.range.startColumn = comma.startColumn || targetNode.range.startColumn;
        } else {
          targetNode.range.endLine = comma.endLine || targetNode.range.endLine;
          targetNode.range.endColumn = comma.endColumn || targetNode.range.endColumn;

          // Remove extra space
          const textToRemove = getText(sql, {
            ...targetNode.range,
            endColumn: targetNode.range.endColumn + 1,
          });
          if (textToRemove[textToRemove.length - 1] === ' ') {
            targetNode.range.endColumn++;
          }
        }
      }

      const isLastProjectionItem = projectionItems.length === 1;
      let nextSql = replaceText(sql, isLastProjectionItem ? '*' : '', targetNode.range);

      // Remove resulting emtpy line
      const removedLine = targetNode.range.startLine - 1;
      if (!nextSql.split('\n')[removedLine].trim()) {
        nextSql = [
          ...nextSql.split('\n').slice(0, removedLine),
          ...nextSql.split('\n').slice(removedLine + 1),
        ].join('\n');
      }

      if (hasSort) {
        return parsedSql(removeUnusedOrderItems(parsedSql(nextSql), columns[index]).trim());
      }

      return parsedSql(nextSql);
    },

    orderBy({ expression, order, nullsOrder }) {
      const visitor = new OrderByVisitor();
      visitor.visit(cst);
      const orderItems = visitor.output;

      if (orderItems.length === 0) {
        // Add order by statement
        let orderBy = ` ORDER BY ${expression}`;
        if (order) orderBy += ` ${order.toUpperCase()}`;
        if (nullsOrder) orderBy += ` NULLS ${nullsOrder.toUpperCase()}`;

        if (visitor.insertLocation) {
          return parsedSql(insertText(sql, orderBy, visitor.insertLocation));
        }
        return parsedSql(sql + orderBy);
      } else {
        const existingOrderItem = orderItems.find((i) => i.expression === expression);
        if (existingOrderItem) {
          // Update existing order
          const nextNullsOrders = nullsOrder || existingOrderItem.nullsOrder;
          const nextSql = replaceText(
            sql,
            `${existingOrderItem.expression} ${(
              order || (existingOrderItem.order === 'desc' ? 'asc' : 'desc')
            ).toUpperCase()}${nextNullsOrders ? ` NULLS ${nextNullsOrders.toUpperCase()}` : ''}`,
            getRange(existingOrderItem)
          );

          return parsedSql(nextSql);
        } else {
          // Replace order items with the new one
          let orderByItem = expression;
          if (order) orderByItem += ` ${order.toUpperCase()}`;
          if (nullsOrder) orderByItem += ` NULLS ${nullsOrder.toUpperCase()}`;

          const firstItem = orderItems[0];
          const lastItem = orderItems[orderItems.length - 1];

          const nextSql = replaceText(
            sql,
            orderByItem,
            getRange({
              startLine: firstItem.startLine,
              startColumn: firstItem.startColumn,
              endLine: lastItem.endLine,
              endColumn: lastItem.endColumn,
            })
          );
          return parsedSql(nextSql);
        }
      }
    },

    getFilterTree() {
      const visitor = new FilterTreeVisitor();
      visitor.visit(cst);
      return visitor.tree.length > 1 ? visitor.tree : [];
    },

    getFilterString() {
      const visitor = new WhereVisitor();
      visitor.visit(cst);
      return visitor.booleanExpressionNode
        ? getImageFromChildren(visitor.booleanExpressionNode)
        : '';
    },

    updateFilter(filter) {
      const visitor = new WhereVisitor();
      visitor.visit(cst);
      const hasWhere = Boolean(visitor.booleanExpressionNode);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!visitor.booleanExpression) {
        throw new Error("Can't update/add a filter to this query");
      }

      const computedFilter = typeof filter === 'string' ? filter : printFilter(filter);

      const nextSql = replaceText(
        sql,
        hasWhere ? computedFilter : ` WHERE ${computedFilter} `,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hasWhere ? visitor.booleanExpressionRange! : visitor.tableRange!
      ).trim();
      if (computedFilter === '' && visitor.whereRange) {
        return parsedSql(
          replaceText(sql, '', {
            ...visitor.whereRange,
            startColumn: visitor.whereRange.startColumn - 1, // Remove the space before WHERE
          }).trim()
        );
      }
      return parsedSql(nextSql);
    },
  };
};

export default rhombic;
