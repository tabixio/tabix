import { CstChildrenDictionary } from "chevrotain";
import { isCstNode } from "./isCstNode";
import { IContext } from "../Context";
import { Range } from "./getRange";

const extractRange = (children: CstChildrenDictionary, range: Range) => {
  Object.values(children).forEach(tokens => {
    if (!Array.isArray(tokens)) return;
    tokens.forEach(token => {
      if (isCstNode(token)) {
        extractRange(token.children, range);
        return;
      } else {
        if (!token.startLine || !token.startColumn || !token.endLine || !token.endColumn) {
          return;
        }

        // Start range check
        if (
          token.startLine < range.startLine ||
          (token.startLine === range.startLine && token.startColumn < range.startColumn)
        ) {
          range.startLine = token.startLine;
          range.startColumn = token.startColumn;
        }

        // End range check
        if (token.endLine > range.endLine || (token.endLine === range.endLine && token.endColumn > range.endColumn)) {
          range.endLine = token.endLine;
          range.endColumn = token.endColumn;
        }
      }
    });
  });
};

/**
 * Extract the range for a children dictionnary.
 *
 * @param children
 */
export const getChildrenRange = (children: IContext): Range => {
  const range: Range = {
    startLine: Infinity,
    endLine: -Infinity,
    startColumn: Infinity,
    endColumn: -Infinity
  };
  extractRange(children as CstChildrenDictionary, range); // This mutate `range` directly

  return range;
};
