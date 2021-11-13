import BaseStream from './base-stream.js';

export default class Rot8CipherStream extends BaseStream {
  constructor(action, isStdIn, isStdOut, options) {
    super(action, 8, isStdIn, isStdOut, options);
  }
}
