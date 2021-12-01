import path from 'path';

const baseDir = process.cwd();

module.exports = {
  typescript: {
    configFile: path.resolve(baseDir, 'app/tsconfig.json'),
    memoryLimit: 2048,
  },
};
//
// {
//   tsconfig: path.resolve(baseDir, 'app/tsconfig.json'),
//     checkSyntacticErrors: false,
//   memoryLimit: 1024,
// }
