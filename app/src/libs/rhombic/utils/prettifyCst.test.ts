import { formatCst } from "./prettifyCst";

describe("formatCst", () => {
  it("should format an inline cst", () => {
    const prettifiedCst =
      'query(values(Values("VALUES")expression(IntegerValue("2"))expression(IntegerValue("3"))Comma(",")))';

    expect(formatCst(prettifiedCst)).toMatchInlineSnapshot(`
                                    "query(
                                      values(
                                        Values(\\"VALUES\\")
                                        expression(
                                          IntegerValue(\\"2\\")
                                        )
                                        expression(
                                          IntegerValue(\\"3\\")
                                        )
                                        Comma(\\",\\")
                                      )
                                    )"
                        `);
  });

  it("should format a multiline cst", () => {
    const prettifiedCst = `query(
      select(
        Select("SELECT")
        projectionItems(
          projectionItem(Asterisk("*"))
        )
        From("FROM")
        tableExpression(
          tableReference(
            tablePrimary(Identifier("my_db"))
            As("AS")
            Identifier("plop")
          )
        )
      )
    )`;

    expect(formatCst(prettifiedCst)).toMatchInlineSnapshot(`
                              "query(
                                select(
                                  Select(\\"SELECT\\")
                                  projectionItems(
                                    projectionItem(
                                      Asterisk(\\"*\\")
                                    )
                                  )
                                  From(\\"FROM\\")
                                  tableExpression(
                                    tableReference(
                                      tablePrimary(
                                        Identifier(\\"my_db\\")
                                      )
                                      As(\\"AS\\")
                                      Identifier(\\"plop\\")
                                    )
                                  )
                                )
                              )"
                    `);
  });

  it("should deal with escaped values", () => {
    const prettifiedCst = `Identifier(""foodmart"",""employee_closure"")`;
    expect(formatCst(prettifiedCst)).toMatchInlineSnapshot(
      `"Identifier(\\"\\"foodmart\\"\\", \\"\\"employee_closure\\"\\")"`
    );
  });
});
