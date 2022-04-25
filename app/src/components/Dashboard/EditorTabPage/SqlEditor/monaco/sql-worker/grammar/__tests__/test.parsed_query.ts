// Tests parsers
//
import { CommonSQL, ParsedQuery } from '../index';
import { SupportLanguage } from '../../supportLanguage';

describe('ParsedQuery->CLICKHOUSE', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  /*eslint operator-linebreak: ["error", "after"]*/
  /* eslint-disable */
  // @formatter:off
  const sql = `select 123;
  select nums.number,
         sin(nums.number) as sin,
         cos(nums.number) as cos
  from system.numbers as nums
  limit 400` + ';' + `sELect 12 as number, hostName() as hhhost;;
    limit 1;
    sEleCT 53 as rep;sEleCt 593 as rEq;
  `;
  /* eslint-enable */ // @formatter:on
  test('ParsedQuery->CLICKHOUSE->find tables', () => {
    // const pq = c.parse('SELECT a,b FROM table1');
    const pq = c.parse(
      'SELECT a,b FROM system.numbers as nums ' +
        '\n' +
        'WHERE numz IN ' +
        '\n\n' +
        ' (SELECT cca FROM tables_nums WHERE )'
    );
    // todo : tests
    // pq.getToken(1).text === 'SELECT'
    // pq.getToken(35).text === 'nums'
    // pq.getToken(46).text === 'numz' , line == 2,  column: 2,
    // pq.getToken(58).text === 'SELECT' , start = 58 , stop = 63 line == 4,  column: 4, charPositionInLine : 2
    // pq.getToken(92).text === 'cca'  , charPositionInLine : 36 , line: 4   <!==!> range: { startLine: 4, endLine: 4, startColumn: 2, endColumn: 42 },
    console.log(pq.getVisitor(58).getRelation(58));
  });

  test('Parser->parseOneStatement->resultTokens', () => {
    // const pq = c.parse('' + '\n' + '\t' + '\n' + '\n' + '\n' + '\tselect 123;\tselect 123');
    const pq = c.parse(sql);

    // 8 - SELECT
    // 19 -  number
    // 73 - COS
    // 125 - as nums
    // 137 - LIMIT
    // 155 - sELect
    // 169 - number
    // 180 - hostName
    // 189 - hhhost
    // 201 - limit
    // 216 - sEleCT
    // Получить токен на off, если два запроса складываем смещение
    // - tokens - in 1
    // - tokens - in 2, find `12`,`hhhost`,`hostName` is function token
    console.log('---------------------------------------------------------------');
    console.log(pq.getTokens(20));
    console.log('---------------------------------------------------------------');
    // console.log(pq.getTokens(5));
    // console.log(pq.getToken(73));
  });
});
