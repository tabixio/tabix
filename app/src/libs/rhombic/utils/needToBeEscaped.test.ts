import { needToBeEscaped } from "./needToBeEscaped";

describe("needToBeEscaped", () => {
  const trueCases: string[] = ["i'm a chicken", "123soleil", "date", "sum", "@chicken"];
  const falseCases: string[] = ["chicken", "crazy_potatoe", "Joker", "*"];

  trueCases.forEach(identifier =>
    it(`should return true for "${identifier}"`, () => {
      expect(needToBeEscaped(identifier)).toBe(true);
    })
  );

  falseCases.forEach(identifier =>
    it(`should return false for "${identifier}"`, () => {
      expect(needToBeEscaped(identifier)).toBe(false);
    })
  );
});
