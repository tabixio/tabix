import { createToken, Lexer, CstParser, IParserConfig } from 'chevrotain';
import { matchFunctionName } from './utils/matchFunctionName';

const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z][\w]*|"[^"]*"/,
});

const FunctionIdentifier = createToken({
  name: 'FunctionIdentifier',
  pattern: matchFunctionName,
  line_breaks: false,
});

// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/SAP/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
const Select = createToken({
  name: 'Select',
  pattern: /SELECT/i,
  longer_alt: Identifier,
});

const Cast = createToken({
  name: 'Cast',
  pattern: /CAST/i,
  longer_alt: Identifier,
});

const SqlTypeName = createToken({
  name: 'SqlTypeName',
  pattern:
    /CHAR(ACTER)?( VARYING)?|VARCHAR|DATE|TIME(STAMP)?|CHARACTER SET|GEOMETRY|DEC(IMAL)?|NUMERIC|INT(EGER)?|BOOLEAN|BINARY( VARYING)?|VARBINARY|TINYINT|SMALLINT|BIGINT|REAL|DOUBLE|FLOAT|ANY/i,
  longer_alt: Identifier,
});

const CollectionTypeName = createToken({
  name: 'CollectionTypeName',
  pattern: /ARRAY|MULTISET/i,
  longer_alt: Identifier,
});

const OrderBy = createToken({
  name: 'OrderBy',
  pattern: /ORDER BY/i,
  longer_alt: Identifier,
});

const Asc = createToken({
  name: 'Asc',
  pattern: /ASC/i,
  longer_alt: Identifier,
});

const Desc = createToken({
  name: 'Desc',
  pattern: /DESC/i,
  longer_alt: Identifier,
});

const Nulls = createToken({
  name: 'Nulls',
  pattern: /NULLS/i,
  longer_alt: Identifier,
});

const First = createToken({
  name: 'First',
  pattern: /FIRST/i,
  longer_alt: Identifier,
});

const Last = createToken({
  name: 'Last',
  pattern: /LAST/i,
  longer_alt: Identifier,
});

const From = createToken({
  name: 'From',
  pattern: /FROM/i,
  longer_alt: Identifier,
});

const Where = createToken({
  name: 'Where',
  pattern: /WHERE/i,
  longer_alt: Identifier,
});

const Group = createToken({
  name: 'Group',
  pattern: /GROUP/i,
  longer_alt: Identifier,
});

const Cube = createToken({
  name: 'Cube',
  pattern: /CUBE/i,
  longer_alt: Identifier,
});

const Rollup = createToken({
  name: 'Rollup',
  pattern: /ROLLUP/i,
  longer_alt: Identifier,
});

const By = createToken({
  name: 'By',
  pattern: /BY/i,
  longer_alt: Identifier,
});

const Natural = createToken({
  name: 'Natural',
  pattern: /NATURAL/i,
  longer_alt: Identifier,
});

const Left = createToken({
  name: 'Left',
  pattern: /LEFT/i,
  longer_alt: Identifier,
});

const Right = createToken({
  name: 'Right',
  pattern: /RIGHT/i,
  longer_alt: Identifier,
});

const Full = createToken({
  name: 'Full',
  pattern: /FULL/i,
  longer_alt: Identifier,
});

const Outer = createToken({
  name: 'Outer',
  pattern: /OUTER/i,
  longer_alt: Identifier,
});

const Inner = createToken({
  name: 'Inner',
  pattern: /INNER/i,
  longer_alt: Identifier,
});

const Cross = createToken({
  name: 'Cross',
  pattern: /CROSS/i,
  longer_alt: Identifier,
});

const Apply = createToken({
  name: 'Apply',
  pattern: /APPLY/i,
  longer_alt: Identifier,
});

const Join = createToken({
  name: 'Join',
  pattern: /JOIN/i,
  longer_alt: Identifier,
});

const On = createToken({
  name: 'On',
  pattern: /ON/i,
  longer_alt: Identifier,
});

const Using = createToken({
  name: 'Using',
  pattern: /USING/i,
  longer_alt: Identifier,
});

const Values = createToken({
  name: 'Values',
  pattern: /VALUES/i,
  longer_alt: Identifier,
});

const All = createToken({
  name: 'All',
  pattern: /ALL/i,
  longer_alt: Identifier,
});

const Distinct = createToken({
  name: 'Distinct',
  pattern: /DISTINCT/i,
  longer_alt: Identifier,
});

const Stream = createToken({
  name: 'Stream',
  pattern: /STREAM/i,
  longer_alt: Identifier,
});

const And = createToken({
  name: 'And',
  pattern: /AND/i,
  longer_alt: Identifier,
});

const Or = createToken({
  name: 'Or',
  pattern: /OR/i,
  longer_alt: Identifier,
});

const As = createToken({
  name: 'As',
  pattern: /AS/i,
  longer_alt: Identifier,
});

const IsNull = createToken({
  name: 'IsNull',
  pattern: /IS NULL/i,
  longer_alt: Identifier,
});

const IsNotNull = createToken({
  name: 'IsNotNull',
  pattern: /IS NOT NULL/i,
  longer_alt: Identifier,
});

const Limit = createToken({
  name: 'Limit',
  pattern: /LIMIT/i,
  longer_alt: Identifier,
});

const Null = createToken({ name: 'Null', pattern: /null/ });
const Asterisk = createToken({ name: 'Asterisk', pattern: /\*/ });
const Comma = createToken({ name: 'Comma', pattern: /,/ });
const Period = createToken({ name: 'Period', pattern: /\./ });
const LSquare = createToken({ name: 'LSquare', pattern: /\[/ });
const RSquare = createToken({ name: 'RSquare', pattern: /]/ });
const LParen = createToken({ name: 'LParen', pattern: /\(/ });
const RParen = createToken({ name: 'RParen', pattern: /\)/ });
const Colon = createToken({ name: 'Colon', pattern: /:/ });
const SemiColon = createToken({ name: 'SemiColon', pattern: /;/ });

const BinaryOperator = createToken({
  name: 'BinaryOperator',
  pattern: /=|>=?|<=?|\!=|LIKE/i,
  longer_alt: Identifier,
});

const MultivalOperator = createToken({
  name: 'MultivalOperator',
  pattern: /NOT IN|IN/i,
  longer_alt: Identifier,
});

const BooleanValue = createToken({
  name: 'BooleanValue',
  pattern: /TRUE|FALSE/i,
  longer_alt: Identifier,
});

const IntegerValue = createToken({
  name: 'IntegerValue',
  pattern: /0|[1-9]\d*/,
});
const StringValue = createToken({
  name: 'StringValue',
  pattern:
    /((`[^`]*(`))+)|((\[[^\]]*(\]))(\][^\]]*(\]))*)|(("[^"\\]*(?:\\.[^"\\]*)*("))+)|(('[^'\\]*(?:\\.[^'\\]*)*('))+)|((N'[^N'\\]*(?:\\.[^N'\\]*)*('))+)/,
});
const DateValue = createToken({
  name: 'DateValue',
  pattern: /DATE '\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|3[0-1])'/i,
});

const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const Comment = createToken({
  name: 'Comment',
  pattern: /--.*/,
  group: Lexer.SKIPPED,
});

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
const allTokens = [
  WhiteSpace,
  Comment,

  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Group,
  Cube,
  Rollup,
  By,
  Natural,
  Left,
  Right,
  Full,
  Outer,
  Inner,
  Cross,
  Apply,
  Join,
  On,
  Using,
  Values,
  And,
  OrderBy,
  Or,
  IsNotNull,
  IsNull,
  Nulls,
  Null,
  Asc,
  As,
  Distinct,
  All,
  Stream,
  FunctionIdentifier,
  DateValue,
  SqlTypeName,
  CollectionTypeName,
  Cast,
  Desc,
  Last,
  First,
  Limit,
  MultivalOperator,
  BinaryOperator,
  BooleanValue,

  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  IntegerValue,
  StringValue,

  Asterisk,
  Colon,
  SemiColon,
  LSquare,
  RSquare,
  LParen,
  RParen,
  Comma,
  Period,
];

// reuse the same lexer instance
export const SqlLexer = new Lexer(allTokens);

class SqlParser extends CstParser {
  constructor(recoveryEnabled: IParserConfig['recoveryEnabled']) {
    super(allTokens, { recoveryEnabled });
    this.performSelfAnalysis();
  }

  /**
   * statement:
   *    query
   */
  public statement = this.RULE('statement', () => {
    this.OR([{ ALT: () => this.SUBRULE(this.query) }]);
  });

  /**
   * query:
   *      values
   *  |   WITH withItem [ , withItem ]* query
   *  |   {
   *          select
   *      |   selectWithoutFrom
   *      |   query UNION [ ALL | DISTINCT ] query
   *      |   query EXCEPT [ ALL | DISTINCT ] query
   *      |   query MINUS [ ALL | DISTINCT ] query
   *      |   query INTERSECT [ ALL | DISTINCT ] query
   *      }
   *      [ ORDER BY orderItem [, orderItem ]* ]
   *      [ LIMIT [ start, ] { count | ALL } ]
   *      [ OFFSET start { ROW | ROWS } ]
   *      [ FETCH { FIRST | NEXT } [ count ] { ROW | ROWS } ONLY ]
   */
  public query = this.RULE('query', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.values) },
      {
        ALT: () => {
          this.SUBRULE(this.select);
          this.OPTION(() => {
            this.SUBRULE(this.orderBy);
          });
          this.OPTION1(() => {
            this.CONSUME(Limit);
            this.OR1([{ ALT: () => this.CONSUME(IntegerValue) }, { ALT: () => this.CONSUME(All) }]);
          });
        },
      },
    ]);
    this.OPTION2(() => this.CONSUME(SemiColon));
  });

  /**
   * expression:
   *      valueExpression
   *  |   null
   */
  public expression = this.RULE('expression', () => {
    this.OR([
      { ALT: () => this.CONSUME(IntegerValue) },
      { ALT: () => this.CONSUME(StringValue) },
      { ALT: () => this.CONSUME(Null) },
      {
        ALT: () => {
          this.CONSUME(LParen);
          this.MANY_SEP({
            SEP: Comma,
            DEF: () => this.SUBRULE(this.expression),
          });
          this.CONSUME(RParen);
        },
      },
      {
        ALT: () => this.SUBRULE(this.columnPrimary),
      },
      {
        ALT: () => {
          this.CONSUME(FunctionIdentifier), this.CONSUME1(LParen);
          this.MANY_SEP1({
            SEP: Comma,
            DEF: () => this.SUBRULE1(this.expression),
          });
          this.CONSUME1(RParen);
        },
      },
      {
        ALT: () => this.SUBRULE(this.cast),
      },
    ]);
  });

  public cast = this.RULE('cast', () => {
    this.CONSUME(Cast);
    this.CONSUME(LParen);
    this.SUBRULE(this.expression);
    this.CONSUME(As);
    this.SUBRULE(this.type);
    this.OPTION(() => {
      this.CONSUME1(LParen);
      this.CONSUME(IntegerValue); // precision
      this.OPTION1(() => {
        this.CONSUME(Comma);
        this.CONSUME1(IntegerValue); // scale
      });
      this.CONSUME1(RParen);
    });
    this.CONSUME(RParen);
  });

  public orderBy = this.RULE('orderBy', () => {
    this.CONSUME(OrderBy);
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE(this.orderItem),
    });
  });

  /**
   * type:
   *         typeName
   *         [ collectionsTypeName ]*
   *
   *   typeName:
   *         sqlTypeName
   */
  public type = this.RULE('type', () => {
    this.OR([{ ALT: () => this.CONSUME(SqlTypeName) }]);
    this.OPTION(() => {
      this.MANY(() => {
        this.CONSUME(CollectionTypeName);
      });
    });
  });

  /**
   * <value expression> ::=
   *    <numeric value expression>
   *  |  <string value expression>
   *  |  <datetime value expression>
   *  |  <interval value expression>
   *  |  <boolean value expression>
   *  |  <user-defined type value expression>
   *  |  <row value expression>
   *  |  <reference value expression>
   *  |  <collection value expression>
   *
   * https://github.com/ronsavage/SQL/blob/master/sql-2003-2.bnf
   */
  public valueExpression = this.RULE('valueExpression', () => {
    this.OR([
      { ALT: () => this.CONSUME(IntegerValue) },
      { ALT: () => this.CONSUME(StringValue) },
      { ALT: () => this.CONSUME(BooleanValue) },
      { ALT: () => this.CONSUME(DateValue) },
    ]);
  });

  public booleanExpression = this.RULE('booleanExpression', () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(LParen);
          this.SUBRULE(this.booleanExpression);
          this.CONSUME(RParen);
        },
      },
      {
        ALT: () => this.SUBRULE1(this.booleanExpressionValue),
      },
    ]);

    this.OPTION(() => {
      this.OR1([{ ALT: () => this.CONSUME(Or) }, { ALT: () => this.CONSUME(And) }]);
      this.SUBRULE2(this.booleanExpression);
    });
  });

  public booleanExpressionValue = this.RULE('booleanExpressionValue', () => {
    this.SUBRULE(this.columnPrimary);
    this.OR([
      {
        ALT: () => {
          // Binary operation
          this.CONSUME(BinaryOperator);
          this.OR1([
            { ALT: () => this.SUBRULE1(this.valueExpression) },
            { ALT: () => this.SUBRULE2(this.columnPrimary) },
          ]);
        },
      },
      {
        ALT: () => {
          // Multival operation
          this.CONSUME(MultivalOperator);
          this.CONSUME1(LParen);
          this.AT_LEAST_ONE_SEP({
            SEP: Comma,
            DEF: () => {
              this.OR2([
                { ALT: () => this.SUBRULE3(this.valueExpression) },
                { ALT: () => this.SUBRULE4(this.columnPrimary) },
              ]);
            },
          });
          this.CONSUME1(RParen);
        },
      },
      {
        ALT: () => {
          // Unary operation
          this.OR3([{ ALT: () => this.CONSUME(IsNull) }, { ALT: () => this.CONSUME(IsNotNull) }]);
        },
      },
    ]);
  });

  /**
   * orderItem:
   *     expression [ ASC | DESC ] [ NULLS FIRST | NULLS LAST ]
   */
  public orderItem = this.RULE('orderItem', () => {
    this.SUBRULE(this.expression);
    this.OPTION(() => {
      this.OR([{ ALT: () => this.CONSUME(Asc) }, { ALT: () => this.CONSUME(Desc) }]);
    });
    this.OPTION1(() => {
      this.OR1([
        {
          ALT: () => {
            this.CONSUME(Nulls);
            this.CONSUME(First);
          },
        },
        {
          ALT: () => {
            this.CONSUME1(Nulls);
            this.CONSUME(Last);
          },
        },
      ]);
    });
  });

  /**
   * select:
   *      SELECT [ STREAM ] [ ALL | DISTINCT ]
   *          { projectionItem [, projectionItem ]* }
   *      FROM tableExpression [ AS tableAlias ]
   *      [ WHERE booleanExpression ]
   *      [ GROUP BY { groupItem [, groupItem ]* } ]
   *      [ HAVING booleanExpression ]
   *      [ WINDOW windowName AS windowSpec [, windowName AS windowSpec ]* ]
   *
   */
  public select = this.RULE('select', () => {
    this.CONSUME(Select);
    this.OPTION(() => this.CONSUME(Stream));
    this.OPTION1(() => {
      this.OR([{ ALT: () => this.CONSUME(All) }, { ALT: () => this.CONSUME(Distinct) }]);
    });
    this.SUBRULE(this.projectionItems);

    // Everything is wrap into `OPTION` to deal with selectWithoutFrom case
    this.OPTION3(() => {
      this.CONSUME(From);
      this.SUBRULE(this.tableExpression);
    });

    this.OPTION4(() => {
      this.SUBRULE(this.where);
    });

    this.OPTION5(() => {
      this.SUBRULE(this.groupBy);
    });
  });

  /**
   * Group by statement
   */
  public groupBy = this.RULE('groupBy', () => {
    this.CONSUME(Group);
    this.CONSUME(By);
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE(this.groupItem),
    });
  });

  /**
   * Where statement
   */
  public where = this.RULE('where', () => {
    this.CONSUME(Where);
    this.SUBRULE(this.booleanExpression);
  });

  /**
   * projectionItems:
   *     projectionItem [, projectionItem ]*
   */
  public projectionItems = this.RULE('projectionItems', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE(this.projectionItem),
    });
  });

  /**
   * projectionItem:
   *      expression [ [ AS ] columnAlias ]
   *  |   tableAlias . *
   *  |   *
   */
  public projectionItem = this.RULE('projectionItem', () => {
    this.OR([
      {
        ALT: () => {
          this.OPTION1(() => {
            this.CONSUME1(Identifier);
            this.CONSUME(Period);
          });
          this.CONSUME(Asterisk);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.expression);
          this.OPTION(() => {
            this.CONSUME(As);
            this.CONSUME(Identifier);
          });
        },
      },
    ]);
  });

  /**
   * tableExpression:
   *      tableReference [, tableReference ]*
   *  |   tableExpression [ NATURAL ] [ INNER | (( LEFT | RIGHT | FULL ) [ OUTER ]) ] JOIN tableExpression [ joinCondition ]
   *  |   tableExpression CROSS JOIN tableExpression
   *  |   tableExpression [ CROSS | OUTER ] APPLY tableExpression
   */
  public tableExpression = this.RULE('tableExpression', () => {
    // tableReference [, tableReference ]*
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE(this.tableReference),
    });

    this.OPTION(() => {
      this.OR([
        {
          // [ NATURAL ] [ INNER | (( LEFT | RIGHT | FULL ) [ OUTER ]) ] JOIN tableExpression [ joinCondition ]
          ALT: () => {
            this.OPTION1(() => this.CONSUME(Natural));
            this.OPTION2(() => {
              this.OR1([
                {
                  ALT: () => {
                    this.CONSUME(Inner);
                  },
                },
                {
                  ALT: () => {
                    this.OR2([
                      { ALT: () => this.CONSUME(Left) },
                      { ALT: () => this.CONSUME(Right) },
                      { ALT: () => this.CONSUME(Full) },
                    ]);
                    this.OPTION3(() => this.CONSUME(Outer));
                  },
                },
              ]);
            });
            this.CONSUME(Join);
            this.SUBRULE1(this.tableExpression);
            this.OPTION4(() => this.SUBRULE2(this.joinCondition));
          },
        },
        {
          // CROSS JOIN tableExpression
          ALT: () => {
            this.CONSUME(Cross);
            this.CONSUME2(Join);
            this.SUBRULE2(this.tableExpression);
          },
        },
        {
          // [ CROSS | OUTER ] APPLY tableExpression
          ALT: () => {
            this.OR3([{ ALT: () => this.CONSUME1(Cross) }, { ALT: () => this.CONSUME1(Outer) }]);
            this.CONSUME(Apply);
            this.SUBRULE3(this.tableExpression);
          },
        },
      ]);
    });
  });

  /**
   * joinCondition:
   *      ON booleanExpression
   *  |   USING '(' column [, column ]* ')'
   */
  public joinCondition = this.RULE('joinCondition', () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(On);
          this.SUBRULE(this.booleanExpression);
        },
      },
      {
        ALT: () => {
          this.CONSUME(Using);
          this.CONSUME(LParen);
          this.SUBRULE(this.projectionItems);
          this.CONSUME(RParen);
        },
      },
    ]);
  });

  /**
   * tableReference:
   *      tablePrimary
   *      [ FOR SYSTEM_TIME AS OF expression ]
   *      [ matchRecognize ]
   *      [ [ AS ] alias [ '(' columnAlias [, columnAlias ]* ')' ] ]
   *
   */
  public tableReference = this.RULE('tableReference', () => {
    this.SUBRULE(this.tablePrimary);
    this.OPTION(() => {
      this.CONSUME(As);
      this.CONSUME(Identifier); // alias
      this.OPTION1(() => {
        this.CONSUME(LParen);
        this.AT_LEAST_ONE_SEP({
          SEP: Comma,
          DEF: () => this.CONSUME1(Identifier), // columnAlias
        });
        this.CONSUME(RParen);
      });
    });
  });

  /**
   * tablePrimary:
   *      [ [ catalogName . ] schemaName . ] tableName
   *      '(' TABLE [ [ catalogName . ] schemaName . ] tableName ')'
   *  |   tablePrimary [ EXTEND ] '(' columnDecl [, columnDecl ]* ')'
   *  |   [ LATERAL ] '(' query ')'
   *  |   UNNEST '(' expression ')' [ WITH ORDINALITY ]
   *  |   [ LATERAL ] TABLE '(' [ SPECIFIC ] functionName '(' expression [, expression ]* ')' ')'
   */
  public tablePrimary = this.RULE('tablePrimary', () => {
    this.OR([
      {
        ALT: () => {
          // CatalogName
          this.OPTION(() => {
            this.CONSUME1(Identifier);
            this.CONSUME(Period);
          });
          // schemaName
          this.OPTION1(() => {
            this.CONSUME3(Identifier);
            this.CONSUME2(Period);
          });
          // tableName
          this.CONSUME4(Identifier);
        },
      },
    ]);
  });

  /**
   * columnPrimary:
   *  [ [ [ catalogName . ] schemaName . ] tableName . ] columnName
   */
  public columnPrimary = this.RULE('columnPrimary', () => {
    // CatalogName
    this.OPTION(() => {
      this.CONSUME(Identifier);
      this.CONSUME(Period);
    });
    // schemaName
    this.OPTION1(() => {
      this.CONSUME1(Identifier);
      this.CONSUME1(Period);
    });
    // tableName
    this.OPTION2(() => {
      this.CONSUME2(Identifier);
      this.CONSUME2(Period);
    });
    // columnName
    this.CONSUME3(Identifier);
  });

  /**
   * columnDecl:
   *      column type [ NOT NULL ]
   */
  public columnDecl = this.RULE('columnDecl', () => {});

  /**
   * values:
   *      VALUES expression [, expression ]*
   */
  public values = this.RULE('values', () => {
    this.CONSUME(Values);
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE(this.expression),
    });
  });

  /**
   * groupItem:
   *      expression
   *  |   '(' ')'
   *  |   '(' expression [, expression ]* ')'
   *  |   CUBE '(' expression [, expression ]* ')'
   *  |   ROLLUP '(' expression [, expression ]* ')'
   *  |   GROUPING SETS '(' groupItem [, groupItem ]* ')'
   */
  public groupItem = this.RULE('groupItem', () => {
    this.OPTION(() => {
      this.OR1([{ ALT: () => this.CONSUME(Cube) }, { ALT: () => this.CONSUME1(Rollup) }]);
    });
    this.OPTION1(() => {
      this.CONSUME2(LParen);
    });
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => this.SUBRULE1(this.expression),
    });
    this.OPTION2(() => {
      this.CONSUME3(RParen);
    });
    // TODO: Deal with `GROUPING SETS`
  });

  /**
   * window:
   *      windowName
   *  |   windowSpec
   */
  public window = this.RULE('window', () => {});

  /**
   * windowSpec:
   *      '('
   *      [ windowName ]
   *      [ ORDER BY orderItem [, orderItem ]* ]
   *      [ PARTITION BY expression [, expression ]* ]
   *      [
   *          RANGE numericOrIntervalExpression { PRECEDING | FOLLOWING }
   *      |   ROWS numericExpression { PRECEDING | FOLLOWING }
   *      ]
   *      ')'
   */
  public windowSpec = this.RULE('windowSpec', () => {});
}

// Retrieve the serialized grammar in production (avoid minification issues)
let serializedGrammar: IParserConfig['recoveryEnabled'];
if (process.env.NODE_ENV === 'production') {
  try {
    serializedGrammar = require('./serializedGrammar').serializedGrammar;
  } catch (err) {
    throw new Error("The serialized grammar can't be loaded!");
  }
}

// reuse the same parser instance.
export const parser = new SqlParser(serializedGrammar);

export function parseSql(statement: string) {
  const lexResult = SqlLexer.tokenize(statement);

  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens;

  // ref: https://sap.github.io/chevrotain/docs/guide/concrete_syntax_tree.html#ast-vs-cst
  // `statement` is our top level rule as entry point
  const cst = parser.statement();

  return {
    cst,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors,
  };
}

export function parseFilter(filter: string) {
  const lexResult = SqlLexer.tokenize(filter);

  // setting a new input will RESET the parser instance's state.
  parser.input = lexResult.tokens;

  // ref: https://sap.github.io/chevrotain/docs/guide/concrete_syntax_tree.html#ast-vs-cst
  // `booleanExpression` is our top level rule for a filter
  const cst = parser.booleanExpression();

  return {
    cst,
    lexErrors: lexResult.errors,
    parseErrors: parser.errors,
  };
}
