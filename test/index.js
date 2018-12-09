const Fs = require('fs');
const Path = require('path');
const Assert = require('assert');
const Throttle = require('../src/throttle-stream.js');

const testAndLog = (options) => () => {
  try {
    const inputSize = Fs.statSync(Path.join(process.cwd() + '/test/sample/input.mp3')).size;
    const outputSize = Fs.statSync(Path.join(process.cwd() + `/test/sample/${options.output}.mp3`)).size;
    Assert(inputSize === outputSize, 'Files do not have equal size in bytes');
  
    Fs.unlinkSync(Path.join(process.cwd() + `/test/sample/${options.output}.mp3`));
    console.log(`TEST SUCCESSFULL. Options used: ${JSON.stringify(options)}`);
  } catch (err) {
    console.log(`TEST FAILED: ${err}. Options used: ${JSON.stringify(options)}`);
  }
};

const makeTest = (options) => () => {
  const input = Fs.createReadStream(Path.join(process.cwd() + '/test/sample/input.mp3'));
  const output = Fs.createWriteStream(Path.join(process.cwd() + `/test/sample/${options.output}.mp3`));
  output.on('finish', testAndLog(options));
  input.pipe(new Throttle({ bytes, interval } = options)).pipe(output);
}

const tests = [
  makeTest({ bytes: 60000, interval: 100, output: 1}),
  makeTest({ bytes: 6000, interval: 10, output: 2}),
  makeTest({ bytes: 600, interval: 1, output: 3}),
];

tests.forEach(test => test());
