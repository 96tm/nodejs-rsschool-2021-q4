import { Transform } from 'stream';

export default class BaseStream extends Transform {
  static CHAR_CODE_A = 'a'.charCodeAt(0);
  static CHAR_CODE_Z = 'z'.charCodeAt(0);

  constructor(action, key, isStdIn, isStdOut, options) {
    super(options);
    this.action = action;
    this.key = key;
    this.isStdIn = isStdIn;
    this.isStdOut = isStdOut;
  }

  _transform(chunk, _, callback) {
    let result = this[this.action](chunk.toString());
    this.push(result + '\n');
    callback();
  }

  encode(text, key = this.key) {
    let result = '';
    for (let letter of String.raw`${text.trim()}`) {
      result += BaseStream.shiftLetter(letter, key);
    }
    return result;
  }

  decode(text, key = -this.key) {
    return this.encode(text, key);
  }

  static shiftLetter(letter, shiftValue) {
    const letterLowerCase = letter.toLowerCase();
    const charCode = letterLowerCase.charCodeAt(0);
    if (
      charCode < BaseStream.CHAR_CODE_A ||
      charCode > BaseStream.CHAR_CODE_Z
    ) {
      return letter;
    }
    let shiftedCharCode = charCode - BaseStream.CHAR_CODE_A + (shiftValue % 26);
    if (shiftValue < 0 && shiftedCharCode < 0) shiftedCharCode += 26;
    const isLowerCase = letterLowerCase === letter;
    let result = String.fromCharCode(
      (shiftedCharCode % 26) + BaseStream.CHAR_CODE_A
    );
    return isLowerCase ? result : result.toUpperCase();
  }
}
