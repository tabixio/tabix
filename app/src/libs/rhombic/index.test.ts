import rhombic from "./";
import { FilterTree } from "./FilterTree";

describe("rhombic", () => {
  describe("errors", () => {
    it("should throw on bad sql", () => {
      expect(() => rhombic.parse("I'm not a sql statement")).toThrowError(
        `Lexer error:\n - unexpected character: ->'<- at offset: 1, skipped 1 characters.`
      );
    });
  });

  describe("hasFrom", () => {
    it("should return true if the statement has FROM", () => {
      const hasFrom = rhombic.parse("SELECT * FROM my_table").hasFrom();

      expect(hasFrom).toBe(true);
    });
    it("should return false if the statement doesn't have FROM", () => {
      const hasFrom = rhombic.parse("SELECT 'hello'").hasFrom();

      expect(hasFrom).toBe(false);
    });
    it("should return false if the statement doesn't have FROM (sneaky case)", () => {
      const hasFrom = rhombic.parse("SELECT 'from hello'").hasFrom();

      expect(hasFrom).toBe(false);
    });
  });

  describe("hasTablePrimary", () => {
    it("should return true if the table is part of the query", () => {
      const hasTablePrimary = rhombic.parse("SELECT * FROM plop").hasTablePrimary("plop");

      expect(hasTablePrimary).toBe(true);
    });

    it("should return false if the table is not part of the query", () => {
      const hasTablePrimary = rhombic.parse("SELECT * FROM plop").hasTablePrimary("nope");

      expect(hasTablePrimary).toBe(false);
    });

    it("should deal with two level table name", () => {
      const hasTablePrimary = rhombic
        .parse("SELECT * FROM schemaName.tableName")
        .hasTablePrimary("schemaName.tableName");

      expect(hasTablePrimary).toBe(true);
    });

    it("should deal with two level table name (escaped)", () => {
      const hasTablePrimary = rhombic
        .parse('SELECT * FROM "schemaName"."tableName"')
        .hasTablePrimary("schemaName.tableName");

      expect(hasTablePrimary).toBe(true);
    });

    it("should deal with two level table name (escaped bis)", () => {
      const hasTablePrimary = rhombic
        .parse('SELECT * FROM "schemaName"."tableName"')
        .hasTablePrimary('"schemaName".tableName');

      expect(hasTablePrimary).toBe(true);
    });

    it("should deal with case sensitivity", () => {
      const hasTablePrimary = rhombic.parse("SELECT * FROM foo.BAR").hasTablePrimary("foo.bar");

      expect(hasTablePrimary).toBe(false);
    });
  });

  describe("getTablePrimaries", () => {
    it("should return an empty array with a query without table primary", () => {
      const tables = rhombic.parse("SELECT 'hello'").getTablePrimaries();

      expect(tables).toEqual([]);
    });

    it("should return one tableName", () => {
      const tables = rhombic.parse("SELECT * FROM my_db").getTablePrimaries();

      expect(tables).toEqual([
        {
          tableName: "my_db",
          range: {
            startLine: 1,
            endLine: 1,
            startColumn: 15,
            endColumn: 19
          }
        }
      ]);
    });

    it("should return on table with a schema", () => {
      const tables = rhombic.parse("SELECT * FROM my_schema.my_db").getTablePrimaries();

      expect(tables).toEqual([
        {
          tableName: "my_db",
          schemaName: "my_schema",
          range: {
            startLine: 1,
            endLine: 1,
            startColumn: 15,
            endColumn: 29
          }
        }
      ]);
    });

    it("should return on table with a schema and catalog", () => {
      const tables = rhombic.parse("SELECT * FROM my_catalog.my_schema.my_db").getTablePrimaries();

      expect(tables).toEqual([
        {
          tableName: "my_db",
          schemaName: "my_schema",
          catalogName: "my_catalog",
          range: {
            startLine: 1,
            endLine: 1,
            startColumn: 15,
            endColumn: 40
          }
        }
      ]);
    });

    it("should return two tables with a join", () => {
      const tables = rhombic
        .parse("SELECT * FROM myschema.mytable AS a LEFT JOIN mytable2 AS b on (a.id = b.id)")
        .getTablePrimaries();

      expect(tables).toEqual([
        {
          range: {
            endColumn: 30,
            endLine: 1,
            startColumn: 15,
            startLine: 1
          },
          schemaName: "myschema",
          tableName: "mytable",
          alias: "a"
        },
        {
          range: {
            endColumn: 54,
            endLine: 1,
            startColumn: 47,
            startLine: 1
          },
          tableName: "mytable2",
          alias: "b"
        }
      ]);
    });
  });

  describe("orderBy", () => {
    it("should add an ORDER BY if not exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a");
    });

    it("should add an ORDER BY (asc) if not exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .orderBy({ expression: "a", order: "asc" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a ASC");
    });

    it("should add an ORDER BY (desc) if not exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .orderBy({ expression: "a", order: "desc" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a DESC");
    });

    it("should do nothing if the order already exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY a DESC")
        .orderBy({ expression: "a", order: "desc" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a DESC");
    });

    it("should add an ORDER BY (nulls first) if not exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .orderBy({ expression: "a", nullsOrder: "first" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a NULLS FIRST");
    });

    it("should add an ORDER BY (nulls last) if not exists", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .orderBy({ expression: "a", nullsOrder: "last" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a NULLS LAST");
    });

    it("should switch the order if the expression already exists (default)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY a")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a DESC");
    });

    it("should switch the order if the expression already exists (asc)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY a ASC")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a DESC");
    });

    it("should switch the order if the expression already exists (desc)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY a DESC")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a ASC");
    });

    it("should switch the order if the expression already exists (desc)(with order)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY a DESC")
        .orderBy({ expression: "a", order: "asc" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a ASC");
    });

    it("should override the existing expression", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY b DESC")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a");
    });

    it("should override the existing expression (multiple)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY b DESC, c ASC")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a");
    });

    it("should switch the order if the expression already exists (multiple)", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db ORDER BY b DESC NULLS LAST, a ASC, c DESC NULLS FIRST")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY b DESC NULLS LAST, a DESC, c DESC NULLS FIRST");
    });

    it("should update a statement with a LIMIT", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db LIMIT 10")
        .orderBy({ expression: "a" })
        .toString();

      expect(query).toEqual("SELECT * FROM my_db ORDER BY a LIMIT 10");
    });

    it("should insert the ORDER BY in a multiline query", () => {
      const query = rhombic
        .parse(
          `SELECT
          ACCOUNT_ID,
          ACCOUNT_PARENT AS felix,
          ACCOUNT_DESCRIPTION,
          ACCOUNT_TYPE,
          ACCOUNT_ROLLUP,
          CUSTOM_MEMBERS
        FROM
          "foodmart"."ACCOUNT"`
        )
        .orderBy({ expression: "felix" })
        .toString();

      expect(query).toEqual(`SELECT
          ACCOUNT_ID,
          ACCOUNT_PARENT AS felix,
          ACCOUNT_DESCRIPTION,
          ACCOUNT_TYPE,
          ACCOUNT_ROLLUP,
          CUSTOM_MEMBERS
        FROM
          "foodmart"."ACCOUNT" ORDER BY felix`);
    });

    it("should add an ORDER_BY on statement with join", () => {
      const query = rhombic
        .parse("SELECT * FROM myschema.mytable NATURAL JOIN mytable2")
        .orderBy({ expression: "ACCOUNT_ID" })
        .toString();

      expect(query).toEqual("SELECT * FROM myschema.mytable NATURAL JOIN mytable2 ORDER BY ACCOUNT_ID");
    });
  });

  describe("getFilterString", () => {
    it("should return an empty string if no filter", () => {
      const filter = rhombic.parse("SELECT * FROM foo").getFilterString();
      expect(filter).toEqual("");
    });

    it("should return the filter string", () => {
      const filter = rhombic
        .parse("SELECT * FROM foo WHERE name = 'tejas' AND chicken LIKE 'crispy' LIMIT 10")
        .getFilterString();
      expect(filter).toEqual("name = 'tejas' AND chicken LIKE 'crispy'");
    });
  });

  describe("updateFilter", () => {
    const filterTree: FilterTree = [
      { type: "operator", openParentheses: [], closeParentheses: [] },
      {
        type: "predicate",
        dimension: "customer.city",
        operator: "=",
        value: "'Paris'"
      },
      { type: "operator", openParentheses: [], closeParentheses: [] }
    ];

    const filterString = "chicken LIKE 'crispy'";

    it("should add a filter from a tree", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db")
        .updateFilter(filterTree)
        .toString();

      expect(query).toEqual("SELECT * FROM my_db WHERE customer.city = 'Paris'");
    });

    it("should add a filter from a string", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db LIMIT 42")
        .updateFilter(filterString)
        .toString();

      expect(query).toEqual("SELECT * FROM my_db WHERE chicken LIKE 'crispy' LIMIT 42");
    });

    it("should update a filter from a tree", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE foo = 42")
        .updateFilter(filterTree)
        .toString();

      expect(query).toEqual("SELECT * FROM my_db WHERE customer.city = 'Paris'");
    });

    it("should update a filter from a string", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE chicken != 'fresh' LIMIT 42")
        .updateFilter(filterString)
        .toString();

      expect(query).toEqual("SELECT * FROM my_db WHERE chicken LIKE 'crispy' LIMIT 42");
    });

    it("should remove filter for empty array", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE chicken != 'fresh' LIMIT 42")
        .updateFilter([])
        .toString();

      expect(query).toEqual("SELECT * FROM my_db LIMIT 42");
    });

    it("should remove filter for empty array", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE chicken != 'fresh'")
        .updateFilter([])
        .toString();

      expect(query).toEqual("SELECT * FROM my_db");
    });

    it("should remove filter for empty array (stupid column name)", () => {
      const query = rhombic
        .parse(`SELECT " WHERE IS MY COLUMN " FROM my_db WHERE chicken != 'fresh'`)
        .updateFilter([])
        .toString();

      expect(query).toEqual(`SELECT " WHERE IS MY COLUMN " FROM my_db`);
    });

    it("should remove filter for empty string", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE chicken != 'fresh' LIMIT 42")
        .updateFilter("")
        .toString();

      expect(query).toEqual("SELECT * FROM my_db LIMIT 42");
    });

    it("should remove filter for empty string", () => {
      const query = rhombic
        .parse("SELECT * FROM my_db WHERE chicken != 'fresh'")
        .updateFilter("")
        .toString();

      expect(query).toEqual("SELECT * FROM my_db");
    });
  });

  describe("isEmpty", () => {
    it("should return true if the sql don't have any statement", () => {
      [
        "",
        `
      `,
        `
       -- this is a comment
      `,
        `
      
      -- still a comment
      `
      ].forEach(test => expect(rhombic.isEmpty(test)).toBe(true));
    });

    it("should return false if the sql have any statement", () => {
      expect(
        rhombic.isEmpty(`
      -- Hello
      SELECT * FROM plop
      `)
      ).toBe(false);
    });
  });

  describe("isFilterValid", () => {
    // Valid cases
    [
      "my_column = 'Berlin'",
      "my_column in ('Paris', 'Berlin')",
      "my_column is null",
      "my_column is not null",
      "my_column = Berlin"
    ].forEach(i =>
      it(`should return true for "${i}"`, () => {
        const isValid = rhombic.isFilterValid(i);
        expect(isValid).toBeTruthy();
      })
    );

    // Not valid cases
    ["my_column = 'Berlin", "my_column = 'Paris', 'Berlin'"].forEach(i =>
      it(`should return false for "${i}"`, () => {
        const isValid = rhombic.isFilterValid(i);
        expect(isValid).toBeFalsy();
      })
    );
  });
});
