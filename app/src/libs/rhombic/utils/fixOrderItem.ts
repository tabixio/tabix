import { ProjectionItemsVisitor } from "../visitors/ProjectionItemsVisitor";
import { replaceText } from "./replaceText";
import { ParsedSql } from "..";

/**
 * Fix order by item after a projectionItem refactor. Indeed if the order by rely on an alias,
 * and the alias is not in the query anymore, the query will be unvalid.
 *
 * @param cst
 * @param prevProjectionItem
 * @param index
 */
export const fixOrderItem = (
  parsedSql: ParsedSql,
  prevProjectionItem: ProjectionItemsVisitor["output"][-1],
  index: number
): string => {
  const visitor = new ProjectionItemsVisitor();
  visitor.visit(parsedSql.cst);
  const projectionItems = visitor.output;

  // We don't need to deal with asterisk expansion here,
  // if it was needed, we are already after the refactor.
  const nextProjectionItem = projectionItems[index];

  // Same alias as before
  if (prevProjectionItem.alias && prevProjectionItem.alias === nextProjectionItem.alias) {
    return parsedSql.toString();
  }

  // Search old references in `sort` statement
  const orderItemsToRename = visitor.sort.filter(
    i => i.expression === prevProjectionItem.expression || i.expression === prevProjectionItem.alias
  );

  if (orderItemsToRename.length > 1) {
    // Why this is not supported?
    // Because `replaceText` can be applyed only one time without recompute everything
    throw new Error("Renaming multiple order items is not supported");
  }

  let nextSql = parsedSql.toString();
  orderItemsToRename.forEach(
    i => (nextSql = replaceText(nextSql, nextProjectionItem.alias || nextProjectionItem.expression, i.expressionRange))
  );

  return nextSql;
};
