/**
 * Insert a piece of text in a multiline sql statement.
 *
 * @param sql initial sql
 * @param input text to insert
 * @param location
 */
export const insertText = (sql: string, input: string, location: { line: number; column: number }) => {
  const lines = sql.split("\n");
  if (location.line - 1 > lines.length) {
    throw new Error(
      `Can't insert a text on line ${location.line - 1}, the sql statement has only ${lines.length} lines`
    );
  }

  if (location.column > lines[location.line - 1].length) {
    throw new Error(
      `Can't insert a text at ${location.line - 1}:${location.column}, the line has only ${
        lines[location.line - 1].length
      } characts`
    );
  }

  lines[location.line - 1] =
    lines[location.line - 1].slice(0, location.column) + input + lines[location.line - 1].slice(location.column);

  return lines.join("\n");
};
