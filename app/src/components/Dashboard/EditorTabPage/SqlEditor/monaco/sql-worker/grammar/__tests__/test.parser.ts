// Tests parsers
//
import { CommonSQL } from '../index';
import { SupportLanguage } from '../../supportLanguage';
// test 1

describe('Generic SQL Listener Tests', () => {
  const c = new CommonSQL(SupportLanguage.CLICKHOUSE);
  const expectTableName = 'user1';
  const sql = `select id,name,user from ${expectTableName};`;

  test('Listener enterTableName', async () => {
    const result = c.parse(sql).getToken(1).text;
    // console.info(c.parse(sql).getToken(1).text);
    // class MyListener extends SqlParserListener {
    //   enterTableName(ctx): void {
    //     result = ctx.getText().toLowerCase();
    //   }
    // }
    // const listenTableName: any = new MyListener();
    //
    // await parser.listen(listenTableName, parserTree);
    expect(result).toBe('select');
  });
});
