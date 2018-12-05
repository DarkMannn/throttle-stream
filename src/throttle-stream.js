const Fs = require('fs');
const { Transform } = require('stream');

class Throttle extends Transform {

  constructor(options) {
    super(options);
    this.config = { bytes, interval } = options;
    this.startTime = Date.now();
    this.queue = [];
  }

  _transform(chunks, encoding, cb) {
    for (const chunk of chunks) {
      this.queue.push(chunk);
    }
    setTimeout(() => cb(null, chunk), 1);
  }

}
const song = Fs.createReadStream('./sample/input.mp3');
const output = Fs.createWriteStream('./sample/output.mp3');

console.time(1);
output.on('finish', () => console.timeEnd(1));
song.pipe(new Throttle()).pipe(output);

// song.on('data', chunk => {
//   const part1 = chunk.slice(0, chunk.length / 2);
//   const part2 = chunk.slice(chunk.length / 2);
//   output.write(part2);
//   output.write(part1);
// });
// song.on('end', output.end.bind(output));

module.exports = null;
