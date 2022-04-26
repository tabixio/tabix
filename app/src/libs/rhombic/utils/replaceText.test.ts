import { replaceText } from "./replaceText";

type Tests = Array<{
  description: string;
  input: string;
  location: {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  };
  value: string;
  expected: string;
}>;

describe("replaceText", () => {
  const tests: Tests = [
    {
      description: "simple case",
      input: `select * from plop`,
      location: {
        startLine: 1,
        endLine: 1,
        startColumn: 8,
        endColumn: 8
      },
      value: "foo",
      expected: `select foo from plop`
    },
    {
      description: "multiline case",
      input: `select
  a,
  b,
  c
from plop`,
      location: {
        startLine: 2,
        endLine: 4,
        startColumn: 3,
        endColumn: 3
      },
      value: "foo",
      expected: `select
  foo
from plop`
    }
  ];

  tests.forEach(test =>
    it(`should deal with ${test.description}`, () => {
      expect(replaceText(test.input, test.value, test.location)).toBe(test.expected);
    })
  );
});
