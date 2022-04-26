import program from "commander";
import chokidar from "chokidar";

import { parser } from "../SqlParser";

import { generateContextTypes } from "./generateContextTypes";
import { generateSerializedGrammar } from "./generateSerializedGrammar";
import { generateDiagrams } from "./generateDiagrams";

program
  // eslint-disable-next-line
  .version(require("../../package.json").version)
  .option("-w, --watch", "Watch the filesystem for rebuild")
  .parse(process.argv);

/**
 * Generate every grammar artefacts (types, doc, serialized grammar).
 */
function generate() {
  const grammar = parser.getSerializedGastProductions();

  generateContextTypes(grammar);
  generateDiagrams(grammar);
  generateSerializedGrammar(grammar);
}

generate();

if (program.watch) {
  chokidar.watch([`src/SqlParser.ts`]).on("change", generate);
}
