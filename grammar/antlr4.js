// # antlr4ts -visitor ./grammar/clickhouse/ClickHouseLexer.g4 && antlr4ts -visitor ./grammar/clickhouse/ClickHouseParser.g4
const path = require('path');
const { exec } = require('child_process');

const antlr4 = path.resolve(__dirname, 'antlr-4.8-complete.jar');
const grammars = path.resolve(__dirname, './');
const output = path.resolve(__dirname, './output');

const entry = ['clickhouse'];

entry.forEach((language) => {
  const cmd = `
        java -jar ${antlr4}
        -Dlanguage=JavaScript 
        -visitor
        -listener
        -o ${output}/${language}
        ${grammars}/${language}/*.g4 
    `.replace(/\n/g, '');
  console.log('cmd:', cmd);
  exec(cmd, (err) => {
    if (err) {
      console.error(`Antlr4 build error: ${language}`, err);
    } else {
      console.log(`Build ${language} success.`);
    }
  });
});
