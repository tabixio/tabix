const nodePath = require('path');
const readdir = require('readdir-enhanced');
const fs = require('fs');
const R = require('ramda');
const makeDir = require('make-dir');
const readline = require('readline');

const ignorePaths = stats =>
    ['node_modules', '__tests__', 'ramda_build'].reduce(
        (accum, folder) => accum && stats.path.indexOf(folder) === -1,
        true
    );

const readAllFiles = src =>
    new Promise(resolve => {
        readdir(src, { deep: ignorePaths }, (err, files) => {
            resolve(files);
        });
    });

const searchFile = file => files => files.find(x => x.indexOf(file) >= 0) || '';

const clearPath = paths => file =>
    paths.reduce((accum, path) => {
        return accum.replace(path, '');
    }, file);

const toTuple = file => {
    const array = file.split('/');
    return [
        array[array.length - 1], //file with ext
        R.remove(array.length - 1, 1, array).join('/'), //path
        file, //full path
        array[array.length - 1].split('.')[0] //file name
    ];
};

const testsPath = (src, path) => nodePath.join(src, '__tests__', path);

const exist = (src, path) => fs.existsSync(testsPath(src, path));

const createDir = (src, path) => makeDir.sync(testsPath(src, path));

const fileName = tuple => {
    const file = tuple[0].replace('.', '.test.').replace('jsx', 'js');
    return nodePath.join(tuple[1], file);
};

const createFile = src => tuple => {
    fs.writeFileSync(
        testsPath(src, fileName(tuple)),
        `/*global describe, it, expect */
import ${tuple[3]} from '${tuple[2]}';

describe('test ${tuple[2]}', () => {
    //write your test
    it('should be true', () => {

        //expect(true).toBe(true);

    });
});`
    );

    return tuple;
};

const getUserFileName = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const promise = new Promise((resolve, reject) => {
        if (process.env.debug) {
            resolve(process.env.debug);
            return;
        }

        rl.question('Write filename: ', text => {
            rl.close();

            if (text) {
                resolve(text);
            } else {
                reject('');
            }
        });
    });
    return promise;
};

const create = async () => {
    const name = await getUserFileName();

    if (name === '') {
        console.log('Empty string...');
        return;
    }

    const src = nodePath.resolve(__dirname, '../..');
    const result = R.pipe(
        searchFile(name),
        clearPath([src, 'src/']),
        toTuple,
        R.tap(
            tuple =>
                tuple[1] && !exist(src, tuple[1]) && createDir(src, tuple[1])
        ),
        createFile(src)
    );

    const tuple = result(await readAllFiles(src));
    console.log(`Test file create: ${fileName(tuple)}`);
};

create();
