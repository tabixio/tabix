import { ParsedSql } from "..";
import { ProjectionItemsVisitor } from "../visitors/ProjectionItemsVisitor";
import { replaceText } from "./replaceText";

export const removeUnusedOrderItems = (parsedSql: ParsedSql, orderToRemove: string): string => {
  const visitor = new ProjectionItemsVisitor();
  visitor.visit(parsedSql.cst);

  let orderStatement = visitor.sort
    .filter(i => i.expression !== orderToRemove)
    .map(
      i =>
        `${i.expression}${i.order ? " " + i.order.toUpperCase() : ""}${
          i.nullsOrder ? `NULLS ${i.nullsOrder.toUpperCase()}` : ""
        }`
    )
    .join(", ");

  if (orderStatement) {
    orderStatement = `ORDER BY ${orderStatement}`;
  }

  if (visitor.sortRange) {
    return replaceText(parsedSql.toString(), orderStatement, visitor.sortRange);
  } else {
    return parsedSql.toString();
  }
};
