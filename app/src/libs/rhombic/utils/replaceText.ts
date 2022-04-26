import { insertText } from "./insertText";

/**
 * Replace a piece of text in a multine sql statement.
 * @param sql intial sql
 * @param input text to insert
 * @param location
 */
export const replaceText = (
  sql: string,
  input: string,
  location: {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  }
) => {
  const lines = sql
    .split("\n")
    .map((line, lineNumber) => {
      let nextLine;
      if (lineNumber === location.startLine - 1 && location.startLine === location.endLine) {
        nextLine = line.slice(0, location.startColumn - 1) + line.slice(location.endColumn);
      } else if (location.startLine - 1 === lineNumber) {
        nextLine = line.slice(0, location.startColumn - 1);
      } else if (location.endLine - 1 === lineNumber) {
        nextLine = line.slice(location.endColumn);
      } else if (lineNumber > location.startLine - 1 && lineNumber < location.endLine - 1) {
        nextLine = "";
      }

      if (nextLine === undefined) {
        return line;
      }

      // Filter empty modified lines
      return nextLine === "" ? false : nextLine;
    })
    .filter(line => line !== false);

  return insertText(lines.join("\n"), input, {
    line: location.startLine,
    column: location.startColumn - 1
  });
};
