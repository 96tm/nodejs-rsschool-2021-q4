import CaesarCipherStream from '../streams/caesar-cipher-stream.js';
import AtbashCipherStream from '../streams/atbash-cipher-stream.js';
import Rot8CipherStream from '../streams/rot8-cipher-stream.js';

export default function actionToStream(action, inputStream, outputStream) {
  const actionMode = action[1] === '0' ? 'decode' : 'encode';
  const isStdIn = Object.is(inputStream, process.stdin);
  const isStdOut = Object.is(outputStream, process.stdout);
  const streamAruments = [actionMode, isStdIn, isStdOut];
  switch (action[0]) {
    case 'A': {
      return new AtbashCipherStream(isStdIn, isStdOut);
    }
    case 'C': {
      return new CaesarCipherStream(...streamAruments);
    }
    case 'R': {
      return new Rot8CipherStream(...streamAruments);
    }
    default:
      break;
  }
}
