import { TablePrimary } from "..";
import { IdentifierContext, QuotedIdentifierAlternativeContext, StrictIdentifierContext } from "./SqlBaseParser";

export type ColumnRef = { tableId: string; columnId: string; isAssumed: boolean };

export type QuotableIdentifier = { name: string; quoted: boolean };

const common = {
  stripQuoteFromText(text: string, quote: string): QuotableIdentifier {
    if (text.startsWith(quote) && text.endsWith(quote)) {
      return {
        name: text.substring(1, text.length - 1).replace(quote + quote, quote),
        quoted: true
      };
    } else {
      return {
        name: text,
        quoted: false
      };
    }
  },

  stripQuote(ctx: IdentifierContext | StrictIdentifierContext): QuotableIdentifier {
    const strictId = ctx instanceof StrictIdentifierContext ? ctx : ctx.strictIdentifier();
    if (strictId !== undefined) {
      if (strictId instanceof QuotedIdentifierAlternativeContext) {
        const quotedId = strictId.quotedIdentifier();
        const [doubleQuotedId, backquotedId] = [quotedId.DOUBLEQUOTED_IDENTIFIER(), quotedId.BACKQUOTED_IDENTIFIER()];
        if (doubleQuotedId !== undefined) {
          return common.stripQuoteFromText(doubleQuotedId.text, '"');
        } else if (backquotedId !== undefined) {
          return common.stripQuoteFromText(backquotedId.text, "`");
        }
      }
    }
    return {
      name: ctx.text,
      quoted: false
    };
  },

  tablePrimaryFromMultipart(names: string[]): TablePrimary {
    const len = names.length;
    if (len == 0) {
      throw new Error("Unexpected empty array for table name");
    } else if (len == 1) {
      return {
        tableName: names[0]
      };
    } else if (len == 2) {
      return {
        schemaName: names[0],
        tableName: names[1]
      };
    } else {
      return {
        catalogName: names[len - 3],
        schemaName: names[len - 2],
        tableName: names[len - 1]
      };
    }
  }
};

export default common;
