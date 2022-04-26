import { writeFileSync } from "fs";
import chalk from "chalk";
import { join } from "path";
import { createSyntaxDiagramsCode, ISerializedGast } from "chevrotain";

/**
 * Script to generate railroad diagrams from the grammar.
 *
 * Result:
 *  `docs/diagrams.html`
 */
export function generateDiagrams(grammar: ISerializedGast[]) {
  const html = createSyntaxDiagramsCode(grammar);

  writeFileSync(join(__dirname, "../../docs/diagrams.html"), html);
  console.log(chalk.green("✔") + " diagrams generated!");
}
