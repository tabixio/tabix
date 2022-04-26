import { CstElement, CstNode } from "chevrotain";

/**
 * Return `true` if the element is a CstNode.
 *
 * @param element
 */
export function isCstNode(element: CstElement): element is CstNode {
  return Boolean((element as CstNode).name);
}
