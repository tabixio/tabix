import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { TablePrimary, TablePrimaryIncomplete } from "..";
import { SqlBaseVisitor } from "./SqlBaseVisitor";
import common from "./common";
import { TableNameContext } from "./SqlBaseParser";
import { CursorQuery } from "./Cursor";

interface Result {
  references: TablePrimary[];
  incomplete: TablePrimaryIncomplete[];
}

export class ExtractTablesVisitor extends AbstractParseTreeVisitor<Result> implements SqlBaseVisitor<Result> {
  constructor(readonly cursor?: CursorQuery) {
    super();
  }

  protected defaultResult(): Result {
    return { references: [], incomplete: [] };
  }

  aggregateResult(aggregate: Result, nextResult: Result): Result {
    return {
      references: aggregate.references.concat(nextResult.references),
      incomplete: aggregate.incomplete.concat(nextResult.incomplete)
    };
  }

  visitTableName(ctx: TableNameContext): Result {
    const multipartTableName = ctx
      .multipartIdentifier()
      .errorCapturingIdentifier()
      .map(v => common.stripQuote(v.identifier()).name);

    const last = multipartTableName[multipartTableName.length - 1];

    const cursor = this.cursor;
    if (cursor !== undefined) {
      if (cursor.isEqualTo(last)) {
        // cursor after dot
        const refs = multipartTableName.slice(0, -1).map(r => cursor.removeFrom(r));
        return {
          references: [],
          incomplete: [{ references: refs }]
        };
      } else {
        const refs = multipartTableName.map(r => cursor.removeFrom(r));
        return {
          references: [common.tablePrimaryFromMultipart(refs)],
          incomplete: []
        };
      }
    } else {
      const refs = multipartTableName;
      return {
        references: [common.tablePrimaryFromMultipart(refs)],
        incomplete: []
      };
    }
  }
}
