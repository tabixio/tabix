import { antlr } from "..";

const tests = [
  {
    name: "extract tables",
    sql: "select * from t1, s1.t1, s2.t1, (select * from c1.s2.t2, s3.t3, t4) as sq",
    extracted: {
      references: [
        {
          tableName: "t1"
        },
        {
          schemaName: "s1",
          tableName: "t1"
        },
        {
          schemaName: "s2",
          tableName: "t1"
        },
        {
          catalogName: "c1",
          schemaName: "s2",
          tableName: "t2"
        },
        {
          schemaName: "s3",
          tableName: "t3"
        },
        {
          tableName: "t4"
        }
      ],
      incomplete: []
    }
  },
  {
    name: "incomplete references 1",
    sql: "select * from s.|, table1",
    extracted: {
      references: [{ tableName: "table1" }],
      incomplete: [{ references: ["s"] }]
    }
  },
  {
    name: "incomplete references 2",
    sql: "select * from table1, c.s.|",
    extracted: {
      references: [{ tableName: "table1" }],
      incomplete: [{ references: ["c", "s"] }]
    }
  }
];

const prepSql = (sql: string): [string, { cursorPosition: { lineNumber: number; column: number } } | undefined] => {
  const cursor = sql.indexOf("|");
  if (cursor === -1) return [sql, undefined];

  const beforeCursor = sql.substring(0, cursor);
  return [
    sql.slice(0, cursor) + sql.slice(cursor + 1),
    {
      cursorPosition: {
        lineNumber: beforeCursor.split("\n").length,
        column: beforeCursor.length + 1
      }
    }
  ];
};

const excerpt = (value: string) => (value.length > 50 ? value.slice(0, 50) + " ..." : value);

describe("ExtractionVisitor", () => {
  tests.forEach(test => {
    it(`${test.name} - ${excerpt(test.sql)}`, () => {
      const [sql, options] = prepSql(test.sql);
      const tree = options !== undefined ? antlr.parse(sql, options) : antlr.parse(sql);
      expect(tree.getUsedTables()).toEqual(test.extracted);
    });
  });
});
