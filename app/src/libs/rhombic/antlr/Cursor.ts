import { TablePrimary } from "..";

interface Position {
  lineNumber: number;
  column: number;
}

/**
 * Utility functions to query cursor related information.
 */
export interface CursorQuery {
  removeFrom: (str: string) => string;
  isSuffixOf: (str: string) => boolean;
  isIn: (str: string) => boolean;
  isEqualTo: (str: string) => boolean;
}

/**
 * Utility function to insert a string cursor into a string.
 */
export interface CursorUpdate {
  insertAt: (str: string, pos: Position) => string;
}

/**
 * Utility class to work with a string cursor.
 */
export class Cursor implements CursorUpdate, CursorQuery {
  constructor(readonly value: string) {}

  insertAt(str: string, pos: Position): string {
    let line = pos.lineNumber;
    let idx = 0;
    for (; idx < str.length && line > 1; idx++) {
      if (str.charAt(idx) === "\n") {
        line--;
      }
    }

    idx += pos.column - 1;

    const prefix = str.slice(0, idx);
    const suffix = str.slice(idx);

    return `${prefix}${this.value}${suffix}`;
  }

  isSuffixOf(str: string): boolean {
    return str.endsWith(this.value);
  }

  isIn(str: string): boolean {
    return str.includes(str);
  }

  removeFrom(str: string): string;
  removeFrom(tp: TablePrimary): TablePrimary;
  removeFrom(str: string | TablePrimary): string | TablePrimary {
    if (typeof str === "object") {
      return {
        catalogName: str.catalogName ? this.removeFrom(str.catalogName) : undefined,
        schemaName: str.schemaName ? this.removeFrom(str.schemaName) : undefined,
        tableName: this.removeFrom(str.tableName),
        alias: str.alias ? this.removeFrom(str.alias) : undefined,
        range: str.range
      };
    }
    return str.replace(this.value, "");
  }

  isEqualTo(str: string): boolean {
    return str === this.value;
  }
}
