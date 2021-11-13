import fs from 'fs';
import { CustomError } from './custom-error.js';

export default class FileHandler {
  static createReadStream(path) {
    if (!path) {
      return process.stdin;
    }
    const inputStream = fs.createReadStream(path);
    inputStream.on("error", (err) => {
      if (err.code === "EISDIR") {
        throw new CustomError(
          `'${path}' is a directory, please provide a text file name`
        );
      } else if (err.code === "ENOENT") {
          throw new CustomError(`File '${path}' doesn't exist`);
      } else if (err.code === "EACCES") {
          throw new CustomError(
            `You don't have an OS permission to open '${path}'`
          );
      } else {
          throw new CustomError(`Unexpected error (${err}), terminating...`);
      }
    });
    return inputStream;
  }

  static createWriteStream(path) {
    if (!path) {
      return process.stdout;
    }
    const outputStream = fs.createWriteStream(path, { flags: "a" });
    outputStream.on("error", (err) => {
      if (err.code === "EISDIR") {
        throw new CustomError(
          `'${path}' is a directory, please provide a text file name`
        );
      } else if (err.code === "EACCES") {
          throw new CustomError(
            `You don't have an OS permission to open '${path}'`
          );
      } else {
          throw new CustomError(`Unexpected error (${err}), terminating...`);
      }
    });
    return outputStream;
  }
}