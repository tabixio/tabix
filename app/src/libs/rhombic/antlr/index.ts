import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { SqlBaseLexer } from './SqlBaseLexer';
import { SqlBaseParser } from './SqlBaseParser';
import { UppercaseCharStream } from './UppercaseCharStream';
import { Cursor } from './Cursor';
import _ from 'lodash';
import {
  CompletionParserOptions,
  isCompletionOptions,
  SqlCompletionParseTree,
} from './SqlCompletionParseTree';
import { LineageParserOptions, SqlLineageParseTree } from './SqlLineageParseTree';

const defaultCursor = new Cursor('_CURSOR_');

function parse(sql: string, options: CompletionParserOptions): SqlCompletionParseTree;
function parse(sql: string, options?: LineageParserOptions): SqlLineageParseTree;
function parse(sql: string, options?: LineageParserOptions | CompletionParserOptions | undefined) {
  const doubleQuotedIdentifier = options?.doubleQuotedIdentifier ?? false;

  if (options !== undefined && isCompletionOptions(options)) {
    sql = defaultCursor.insertAt(sql, options.cursorPosition);
  }

  const inputStream = new UppercaseCharStream(CharStreams.fromString(sql));
  const lexer = new SqlBaseLexer(inputStream);
  lexer.doublequoted_identifier = doubleQuotedIdentifier;
  const tokens = new CommonTokenStream(lexer);
  const parser = new SqlBaseParser(tokens);
  parser.doublequoted_identifier = doubleQuotedIdentifier;
  parser.buildParseTree = true;
  parser.removeErrorListeners();

  if (options !== undefined && isCompletionOptions(options)) {
    return new SqlCompletionParseTree(parser.statement(), defaultCursor);
  } else {
    return new SqlLineageParseTree(parser.statement());
  }
}

// -
//
//
const antlr = {
  /**
   * Parses SQL text and builds parse tree suitable for further analysis and operations.
   * @param sql SQL text
   * @param options Options affecting parsing
   * @returns Parsed SQL tree object with the number of possible operations
   */
  parse,
};

export default antlr;
