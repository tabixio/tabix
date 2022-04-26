import { IToken } from "chevrotain";

type Token = Pick<IToken, "startColumn" | "endColumn" | "startLine" | "endLine">;

export interface Range {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

/**
 * Returns the range of a token
 *
 * @param tokens
 */
export const getRange = (tokens: Token | Token[]): Range => {
  if (Array.isArray(tokens)) {
    const { startLine, startColumn } = getRange(tokens[0]);
    const { endLine, endColumn } = getRange(tokens[tokens.length - 1]);

    return {
      startLine,
      startColumn,
      endLine,
      endColumn
    };
  }

  const token = tokens; // Just rename for semantic

  if (
    token.startLine !== undefined &&
    token.endLine !== undefined &&
    token.startColumn !== undefined &&
    token.endColumn !== undefined
  ) {
    return {
      startLine: token.startLine, // Checked in the runtime
      endLine: token.endLine, // Checked in the runtime
      startColumn: token.startColumn, // Checked in the runtime
      endColumn: token.endColumn // Checked in the runtime
    };
  } else {
    throw new Error("Token is missing location information");
  }
};
