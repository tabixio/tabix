import antlr from '.';
import { CompletionItem } from './SqlCompletionParseTree';

const env = new Map<string, string[]>();
env.set('test', ['column1', 'column2']);

describe('completion', () => {
  it('should complete columns in simple query', () => {
    const sql = 'SELECT <|> FROM test';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should complete columns in simple query', () => {
    const sql = 'SELECT column1<|> FROM test';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should complete columns in simple query with syntax error', () => {
    const sql = 'SELECT column1, <|> FROM test';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should complete columns in subquery', () => {
    const sql = 'SELECT * FROM (SELECT <|> FROM test)';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should complete columns in simple multiline query', () => {
    const sql = 'SELECT\n  column1,\n  column2,\n  <|>\nFROM\n  test';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should complete tables in simple query', () => {
    const sql = 'SELECT column1 FROM test<|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test')]);
  });

  it('should complete tables in simple query with syntax error', () => {
    const sql = 'SELECT column1 FROM test, <|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test')]);
  });

  it('should complete tables in subquery', () => {
    const sql = 'SELECT column1 FROM (SELECT column1 FROM <|>)';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test')]);
  });

  it('should complete tables in simple multiline query', () => {
    const sql = 'SELECT\n  column1\nFROM\n  test,\n  <|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test')]);
  });

  it('should suggest the SELECTFROM snippet on empty input', () => {
    const sql = '';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([snp('SELECT ? FROM ?', 'SELECT $0 FROM $1')]);
  });

  it('should suggest the SELECTFROM snippet in subquery position', () => {
    const sql = 'SELECT a, b FROM (<|>)';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test'), snp('SELECT ? FROM ?', 'SELECT $0 FROM $1')]);
  });

  it('should suggest columns from aliased tables', () => {
    const sql = 'SELECT <|> FROM test t';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('t', 'column1'), col('t', 'column2')]);
  });

  it('should suggest columns from a referenced table', () => {
    const sql = 'WITH tmp (a) (SELECT 1) SELECT tmp.<|> FROM test, tmp';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('tmp', 'a', true)]);
  });

  it('should suggest columns from a referenced table with prefix', () => {
    const sql = 'WITH tmp (a) (SELECT 1) SELECT t.a<|> FROM test, tmp t';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('t', 'a', true)]);
  });

  it('should suggest columns in where clauses', () => {
    const sql = 'SELECT * FROM test WHERE <|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should suggest columns in sort clauses', () => {
    const sql = 'SELECT * FROM test ORDER BY <|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should suggest columns for aliased queries in join criterias', () => {
    const sql = 'SELECT * FROM test t JOIN (SELECT column1 FROM test) s ON <|>';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([
      col('t', 'column1'),
      col('t', 'column2'),
      col('s', 'column1', true),
    ]);
  });

  it('should complete tables in cte subquery', () => {
    const sql = 'WITH tmp (SELECT column1 FROM <|>)\nSELECT column1 FROM tmp';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('test')]);
  });

  it('should complete columns in cte subquery', () => {
    const sql = 'WITH tmp (SELECT <|> FROM test)\nSELECT c FROM tmp AS t(c)';

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });

  it('should only complete relations defined before', () => {
    const sql = `
      WITH tmp1 (SELECT * FROM test),
           tmp2 (SELECT * FROM test),
           tmp3 (SELECT * FROM <|>),
           tmp4 (SELECT * FROM test)
      SELECT * FROM tmp3, tmp4
    `;

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([rel('tmp1', true), rel('tmp2', true), rel('test')]);
  });

  it('should complete columns from nested ctes', () => {
    const sql = `
      WITH tmp1 (SELECT column1 FROM test),
           tmp2 (SELECT column2 FROM test)
        SELECT <|> FROM (
          WITH tmp3 (SELECT * FROM tmp1)
          SELECT * FROM tmp2, tmp3
        ) q
    `;

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('q', 'column2', true), col('q', 'column1', true)]);
  });

  it('should complete columns from nested ctes but hide generated relation id', () => {
    const sql = `
      WITH tmp1 (SELECT column1 FROM test),
           tmp2 (SELECT column2 FROM test)
        SELECT <|> FROM (
          WITH tmp3 (SELECT * FROM tmp1)
          SELECT * FROM tmp2, tmp3
        )
    `;

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([
      col('column2', undefined, true),
      col('column1', undefined, true),
    ]);
  });

  it('should complete names of nested ctes', () => {
    const sql = `
      WITH tmp1 (SELECT column1 FROM test),
           tmp2 (SELECT column2 FROM test)
        SELECT * FROM (
          WITH tmp3 (SELECT * FROM tmp1),
               tmp4 (SELECT * FROM <|>)
          SELECT * FROM tmp2, tmp3
        )
    `;

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([
      rel('tmp3', true),
      rel('tmp1', true),
      rel('tmp2', true),
      rel('test'),
    ]);
  });

  it('should complete columns in union queries', () => {
    const sql = `
      WITH tmp (SELECT column1 AS a FROM test)
      SELECT * FROM test
      UNION
      SELECT <|> FROM tmp
      UNION ALL
      SELECT * FROM test
    `;

    const completionResult = runCompletion(sql, env);
    expect(completionResult).toEqual([col('tmp', 'a', true)]);

    const sql2 = `
      WITH tmp (SELECT column1 AS a FROM test)
      SELECT * FROM test
      UNION
      SELECT * FROM tmp
      UNION ALL
      SELECT <|> FROM test
    `;

    const completionResult2 = runCompletion(sql2, env);
    expect(completionResult2).toEqual([col('test', 'column1'), col('test', 'column2')]);

    const sql3 = `
      WITH tmp (SELECT column1 AS a FROM test)
      SELECT <|> FROM test
      UNION
      SELECT * FROM tmp
      UNION ALL
      SELECT * FROM test
    `;

    const completionResult3 = runCompletion(sql3, env);
    expect(completionResult3).toEqual([col('test', 'column1'), col('test', 'column2')]);
  });
});

function col(rel: string, name?: string, internal = false): CompletionItem {
  if (name === undefined) {
    return { type: 'column', value: rel, desc: !internal ? { name: rel } : undefined };
  } else {
    return { type: 'column', relation: rel, value: name, desc: !internal ? { name } : undefined };
  }
}

function rel(name: string, internal = false): CompletionItem {
  return { type: 'relation', value: name, desc: !internal ? { name } : undefined };
}

function snp(label: string, template: string): CompletionItem {
  return { type: 'snippet', label, template };
}

function runCompletion(sql: string, env: Map<string, string[]>): CompletionItem[] {
  const lines = sql.split('\n');
  let position = { lineNumber: 1, column: 1 };

  const cleanedSql = lines
    .map((line, idx) => {
      const caretIdx = line.indexOf('<|>');
      if (caretIdx !== -1) {
        position = { lineNumber: idx + 1, column: caretIdx + 1 };
        return line.replace('<|>', '');
      }
      return line;
    })
    .join('\n');

  const metadataProvider = {
    getCatalogs: () => {
      return [];
    },
    getSchemas: (_arg?: { catalog: string }) => {
      return [];
    },
    getTables: (_args?: { catalogOrSchema: string; schema?: string }) => {
      return Array.from(env.keys()).map((n) => {
        return { name: n };
      });
    },
    getColumns: (args: { table: string; catalogOrSchema?: string; schema?: string }) => {
      const cs = env.get(args.table);
      return (
        cs?.map((c) => {
          return { name: c };
        }) || []
      );
    },
  };

  return antlr.parse(cleanedSql, { cursorPosition: position }).getSuggestions(metadataProvider);
}
