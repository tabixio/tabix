import { parser } from "../SqlParser";
import { TablePrimaryContext, TableReferenceContext } from "../Context";
import { TablePrimary } from "..";
import { getRange } from "../utils/getRange";

const Visitor = parser.getBaseCstVisitorConstructorWithDefaults();

/**
 * Visitor to check if a tableReference is part of the query
 */
export class TablePrimaryVisitor extends Visitor {
  public hasTablePrimary = false;
  public tables: TablePrimary[] = [];

  private name: string;

  constructor(name = "") {
    super();
    this.validateVisitor();
    this.name = name
      .split(".")
      .map(sanitizeTableName)
      .join(".");
  }

  protected tableReference(ctx: TableReferenceContext) {
    this.tablePrimary(ctx.tablePrimary[0].children);

    // Add alias information
    if (ctx.As && ctx.Identifier) {
      this.tables[this.tables.length - 1].alias = ctx.Identifier[0].image;
    }
  }

  protected tablePrimary(ctx: TablePrimaryContext) {
    if (ctx.Identifier) {
      const tableName = ctx.Identifier.map(i => sanitizeTableName(i.image));
      const range = getRange(ctx.Identifier);

      if (tableName.length === 3) {
        this.tables.push({
          catalogName: tableName[0],
          schemaName: tableName[1],
          tableName: tableName[2],
          range
        });
      }

      if (tableName.length === 2) {
        this.tables.push({
          schemaName: tableName[0],
          tableName: tableName[1],
          range
        });
      }

      if (tableName.length === 1) {
        this.tables.push({
          tableName: tableName[0],
          range
        });
      }

      if (this.name === tableName.join(".")) {
        this.hasTablePrimary = true;
      }
    }
  }
}

/**
 * Deal with quotes.
 *
 * @param raw chunk of table name
 */
const sanitizeTableName = (raw: string) => {
  if (raw[0] === '"' && raw[raw.length - 1] === '"') {
    return raw.slice(1, -1);
  }

  return raw;
};
