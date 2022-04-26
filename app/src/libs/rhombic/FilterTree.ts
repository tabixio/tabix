/**
 * Filter tree representation.
 *
 * For example, the following string:
 * `tejas = 'chicken' AND slava = 'coffee'`
 * will be represents with the following object:
 * ```
 * [
 *  {type: "predicate", dimension: "tejas", operator: "=", value: "chicken"},
 *  {type: "operator", operator: "and"},
 *  {type: "predicate", dimension: "slava", operator: "=", value: "coffee"}
 * ]
 * ```
 */
export type FilterTree = FilterTreeNode[];

/**
 * List of valid operators
 */
export type Operator = "=" | ">" | ">=" | "<" | "<=" | "!=" | "is null" | "is not null" | "not in" | "in" | "like";

/**
 * Predicate node
 */
export interface FilterTreePredicateNode {
  type: "predicate";
  dimension: string;
  operator: Operator;
  value?: string;
}

/**
 * Operator node
 */
export interface FilterTreeOperatorNode {
  type: "operator";
  closeParentheses: number[]; // parenthesis id
  operator?: "and" | "or";
  openParentheses: number[]; // parenthesis id
}

/**
 * Generic Filter tree node
 */
export type FilterTreeNode = FilterTreePredicateNode | FilterTreeOperatorNode;

/**
 * Returns `true` if the node is an operator.
 *
 * @param node
 */
export const isOperator = (node: FilterTreeNode): node is FilterTreeOperatorNode => {
  return node.type === "operator";
};

/**
 * Returns `true` if the node is a predicate
 * @param node
 */
export const isPredicate = (node: FilterTreeNode): node is FilterTreePredicateNode => {
  return node.type === "predicate";
};
