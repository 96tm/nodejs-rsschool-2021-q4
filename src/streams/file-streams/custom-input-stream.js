import fs from 'fs';
import { Buffer } from 'buffer';
import { promisify } from 'util';
import { Readable } from 'stream';

export default class CustomInputStream extends Readable {
  constructor(fileName, options) {
    super(options);
    this.fileName = fileName;
    this.fileDescriptor = null;
  }

  _construct(callback) {
    promisify(fs.open)(this.fileName)
      .then((fileDescriptor) => {
        this.fileDescriptor = fileDescriptor;
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.fileDescriptor, buf, 0, size, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fileDescriptor) {
      fs.close(this.fileDescriptor, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}
