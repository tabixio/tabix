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
 * -
 */

describe('Generic SQL SIN/COS', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const sql = `select nums.number,
                      sin(nums.number) as sin,
                      cos(nums.number) as cos
               from system.numbers as nums limit 400`;
  test('Parser->parseOneStatement->resultTokens', () => {
    const stmList = c.parse(sql);
    // stmList.g
  });
});

describe('Generic SQL Listener Tests', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const expectTableName = 'uSer31';
  const sql = `selEcT id, user_name, user
               from ${expectTableName}`;
  //

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

describe('Generic SQL Reference Tables', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  it('Reference Tables Names', () => {
    // expect(c.parse('SELECT * FROM tabl1').getTableReference(0)).toMatchObject([{ table: 'tabl1' }]);
    // expect(
    //   c.parse('SELECT * FROM tabl1 JOIN tabl2 USING (key)').getTableReference(0)[0]
    // ).toMatchObject({ table: 'tabl1' });
    c.parseOneStatement(
      'SELECT lx.col1,lx.col2 FROM tabl1 as lx JOIN dbnname.tabl2 as tt2 USING (key) JOIN ( SELECT tt2.e1,tt2.e2,tt2.key,tb3.f33 FROM db2.tt2 JOIN db3.tb3 USING (kkey) ) as jtb2 USING (kkey)'
    );

    //
    // console.info(
    //   c
    //     .parse(
    //       'SELECT * FROM tabl1 JOIN dbnname.tabl2 as tt2 USING (key) JOIN ( SELECT * FROM db2.tt2 JOIN db3.tb3 USING (kkey) ) as jtb2 USING (kkey)'
    //     )
    //     .dumpTokens(0)
    // );
    //
    // expect(c.parse('SELECT * FROM tabl1 JOIN tabl2 USING (key)').getTablesNames(0)).toBe([
    //   'tabl1',
    //   'tabl2',
    // ]);
  });
});

describe('Generic SQL Reference Tests', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const expectTableName = 'uSer31';
  const sql = `
WITH ( 12+13 ) as param1, (23+23) as param2
selEcT user_id as uid, 
      a_sales_user.user_name as uname, 
      user_pas as user_password, 
      md5(uid,uname) as param3
               from salesDB.users as a_sales_user 
               JOIN (
                  SELECT user_id,taxi_id FROM taxiDB.taxi_list 
               ) as taxiSets ON ( taxiSets.user_id = a_sales_user.user_id )  
WHERE user_id = '321' AND user_id = 123 AND user_id = sin(32) 
               GROUP BY uname
               HAVING user_id <> 123
               ORDER BY user_id LIMIT 123,52
  `;

  test('Parser->parseOneStatement->resultTokens', () => {
    const result = c.parseOneStatement(sql);
    console.info(result);
    // expect(resultTokens[7].symbolic).toBe('IDENTIFIER');
  });

  test('Parser->parseOneStatement->alias_table', () => {
    const result = c.parseOneStatement(`SELECT tx.taxi_id, tx.taxi_position
                                        FROM dbName.TaxiTable as tx `);
    console.info(result);
    // expect(resultTokens[7].symbolic).toBe('IDENTIFIER');
  });

  test('Parser->parseOneStatement->alias_table and one sub', () => {
    const result = c.parseOneStatement(`SELECT tx.taxi_id, tx.taxi_position
                                        FROM dbName.TaxiTable as tx
                                        WHERE tx.taxi_id IN (select sls.idd FROM dbName.TaxiSale as sls) `);
    console.info(result);
    // expect(resultTokens[7].symbolic).toBe('IDENTIFIER');
  });

  test('Parser->parseOneStatement->alias_table and one join', () => {
    const sql = `SELECT tx.taxi_id, tx.taxi_position
                 FROM dbName.TaxiTable as tx
                        JOIN (select sls.idd FROM dbName.TaxiSale as sls) as salAse
                             ON (salAse.idd = tx.taxi_id)
                 WHERE tx.taxi_id IN (select crash.taxi_id FROM dbName.TaxiCrash as crash)`;
    const result = c.parseOneStatement(sql);

    console.info(result);
    // expect(resultTokens[7].symbolic).toBe('IDENTIFIER');
  });
});

describe('parser->splitStatements()', () => {
  const parser = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const sql = 'SELECT * FROM users; SELECT * FROM posts;';

  it('splits 2 SQL statements', () => {
    const statements = parser.splitStatements(sql);
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
  it('splits 2 SQL statements by parse', () => {
    // List in parse
    const pq = parser.parse(sql);
    expect(pq.getCountOfStmt()).toBe(2);

    expect(pq.getStatementNumAtOffset(0)).toBe(0);
    expect(pq.getStatementNumAtOffset(5)).toBe(0);
    expect(pq.getStatementNumAtOffset(38)).toBe(1);
    expect(pq.getStatementAtOffset(3238)).toBeUndefined();
    expect(pq.getStatementAtOffset(38)).toMatchObject({
      text: 'SELECT * FROM posts',
      start: 21,
      stop: 40,
    });
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
