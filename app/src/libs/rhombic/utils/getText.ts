/**
 * Get a piece of text in a multine sql statement.
 * @param sql intial sql
 * @param input text to insert
 * @param location
 */
export const getText = (
  sql: string,
  location: {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  }
) => {
  let output = "";
  sql.split("\n").forEach((line, lineNumber) => {
    if (lineNumber === location.startLine - 1 && location.startLine === location.endLine) {
      output += line.slice(location.startColumn - 1, location.endColumn);
    } else if (location.startLine - 1 === lineNumber) {
      output += line.slice(location.startColumn - 1) + "\n";
    } else if (location.endLine - 1 === lineNumber) {
      output += line.slice(0, location.endColumn);
    } else if (lineNumber > location.startLine - 1 && lineNumber < location.endLine - 1) {
      output += line + "\n";
    }
  });

  return output;
};
