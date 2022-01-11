// Tests parsers
//
import { CommonSQL } from '../index';
import { SupportLanguage } from '../../supportLanguage';
/**
 * Source list:
 * - https://github.com/DTStack/dt-sql-parser/tree/master/test/parser
 * - https://github.com/stevenmiller888/ts-mysql-parser/blob/master/src/__tests__/parser.ts
 *
 *
 * ToDo :
 *
 * - antlr4ErrorParser & ErrorLexer
 *
 */

describe('Generic SQL Listener Tests', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const expectTableName = 'uSer31';
  const sql = `selEcT id, user_name, user
               from ${expectTableName}`;

  test('Parser->parseOneStatement->resultTokens', () => {
    const result = c.parseOneStatement(sql);
    expect(result.errors.length).toBe(0);
    // Test tokens list
    const resultTokens = result.tokens;
    // 0
    expect(resultTokens[0].channel).toBe(0);
    expect(resultTokens[0].start).toBe(0);
    expect(resultTokens[0].stop).toBe(5);
    expect(resultTokens[0].symbolic).toBe('SELECT');
    expect(resultTokens[0].text).toBe('selEcT');
    // 1
    expect(resultTokens[3].tokenIndex).toBe(3);
    expect(resultTokens[3].text).toBe('user_name');
    expect(resultTokens[3].symbolic).toBe('IDENTIFIER');
    //
    expect(resultTokens[7].start).toBe(47);
    expect(resultTokens[7].stop).toBe(52);
    expect(resultTokens[7].text).toBe('uSer31');
    expect(resultTokens[7].symbolic).toBe('IDENTIFIER');
  });
});

describe('parser.splitStatements()', () => {
  const parser = new CommonSQL(SupportLanguage.CLICKHOUSE);

  it('splits 2 SQL statements', () => {
    const statements = parser.splitStatements('SELECT * FROM users; SELECT * FROM posts;');
    expect(statements).toMatchObject([
      {
        text: 'SELECT * FROM users',
        start: 0,
        stop: 19,
      },
      {
        text: 'SELECT * FROM posts',
        start: 21,
        stop: 40,
      },
    ]);
  });
  it('works with 1 MySQL statement', () => {
    const statements = parser.splitStatements('SELECT * FROM users;');
    expect(statements).toMatchObject([
      {
        text: 'SELECT * FROM users',
        start: 0,
        stop: 19,
      },
    ]);
  });
});
