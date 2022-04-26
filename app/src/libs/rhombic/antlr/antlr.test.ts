import antlr from ".";
import { getLineageTests, getTable } from "./lineage.tests/getLineageTests";
import * as fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const removeNonSerializable = (val: unknown) => JSON.parse(JSON.stringify(val));

describe("antlr", () => {
  it("should build parse tree", () => {
    const sql = "select * from emp";
    const parsed = antlr.parse(sql);
    expect(parsed.tree.toStringTree()).toBe(
      "(select*fromemp (select*fromemp (select*fromemp (select*fromemp (select*fromemp (select* select (* (* (* (* (* (* *))))))) (fromemp from (emp (emp (emp (emp (emp (emp emp)) )) )))))) ))"
    );
  });

  getLineageTests().forEach(test => {
    const { data, only, sql, debug, mergedLeaves, options } = test.testCase;
    const sqlStr = sql instanceof Array ? sql.join("\n") : sql;
    (only ? it.only : it)(test.name, () => {
      const lineage = antlr.parse(sqlStr, { doubleQuotedIdentifier: true }).getLineage(getTable, mergedLeaves, options);
      if (debug) {
        const previous = fs.existsSync("debug.json") ? fs.readFileSync("debug.json", "utf-8") : "";
        const next = JSON.stringify(lineage, null, 2);

        if (previous !== next) {
          fs.writeFileSync("debug.json", next);
        }
      }

      expect(removeNonSerializable(lineage)).toEqual(data);
    });
  });
});
