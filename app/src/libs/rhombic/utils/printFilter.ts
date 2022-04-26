import { FilterTree } from "../FilterTree";

/**
 * Return the filter as a string.
 *
 * @param input filter tree
 */
export const printFilter = (input: FilterTree): string =>
  input
    .map(item => {
      if (item.type === "operator") {
        return (
          ")".repeat(item.closeParentheses.length) +
          (item.operator ? ` ${item.operator} ` : "") +
          "(".repeat(item.openParentheses.length)
        );
      } else {
        if (["in", "not in"].includes(item.operator)) {
          return `${item.dimension} ${item.operator} ${item.value ? `(${item.value})` : ""}`;
        } else {
          return `${item.dimension} ${item.operator} ${item.value ? `${item.value}` : ""}`;
        }
      }
    })
    .join("")
    .trim();
