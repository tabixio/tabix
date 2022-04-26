import { getText } from "./getText";

type Tests = Array<{
  description: string;
  input: string;
  location: {
    startLine: number;
    endLine: number;
    startColumn: number;
    endColumn: number;
  };
  expected: string;
}>;

describe("getText", () => {
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
      expected: `*`
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
      expected: `a,
  b,
  c`
    }
  ];

  tests.forEach(test =>
    it(`should deal with ${test.description}`, () => {
      expect(getText(test.input, test.location)).toBe(test.expected);
    })
  );
});
