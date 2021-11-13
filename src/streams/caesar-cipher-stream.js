import BaseStream from './base-stream.js';

export default class CaesarCipherStream extends BaseStream {
  constructor(action, isStdIn, isStdOut, options) {
    super(action, 1, isStdIn, isStdOut, options);
  }
}
