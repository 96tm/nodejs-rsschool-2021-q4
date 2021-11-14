import fs from 'fs';
import { Writable } from 'stream';
import { promisify } from 'util';

export default class CustomOutputStream extends Writable {
  constructor(fileName) {
    super();
    this.fileName = fileName;
  }

  _construct(callback) {
    promisify(fs.open)(this.fileName, 'a')
      .then((fileDescriptor) => {
        this.fileDescriptor = fileDescriptor;
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  }

  _write(chunk, _, callback) {
    fs.write(this.fileDescriptor, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}
