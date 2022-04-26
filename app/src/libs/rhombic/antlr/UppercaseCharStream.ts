import { CharStream } from "antlr4ts/CharStream";
import { Interval } from "antlr4ts/misc/Interval";

export class UppercaseCharStream implements CharStream {
  private wrapped: CharStream;

  constructor(wrapped: CharStream) {
    this.wrapped = wrapped;
  }

  getText(interval: Interval): string {
    return this.wrapped.getText(interval);
  }

  consume(): void {
    this.wrapped.consume();
  }

  LA(i: number): number {
    const c = this.wrapped.LA(i);
    if (c <= 0) {
      return c;
    }
    return String.fromCodePoint(c)
      .toUpperCase()
      .codePointAt(0) as number;
  }

  mark(): number {
    return this.wrapped.mark();
  }

  release(marker: number): void {
    this.wrapped.release(marker);
  }

  get index(): number {
    return this.wrapped.index;
  }

  seek(index: number): void {
    this.wrapped.seek(index);
  }

  get size(): number {
    return this.wrapped.size;
  }

  get sourceName(): string {
    return this.wrapped.sourceName;
  }
}
