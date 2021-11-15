import BaseStream from './base-stream.js';
import { ENCODE } from '../utils/constants.js';

export default class AtbashCipherStream extends BaseStream {
  constructor(isStdIn, isStdOut, options) {
    super(ENCODE, 0, isStdIn, isStdOut, options);
  }

  encode(text) {
    let result = '';
    for (let letter of String.raw`${text.trim()}`) {
      const charCode = letter.toLowerCase().charCodeAt(0);
      const key = (AtbashCipherStream.CHAR_CODE_Z - charCode) * 2 + 1;
      result += AtbashCipherStream.shiftLetter(letter, key);
    }
    return result;
  }

  decode(text) {
    return this.encode(text);
  }
}
