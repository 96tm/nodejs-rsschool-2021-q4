import { CustomError } from '../utils/custom-error.js';
import ArgumentsChecker from './arguments-checker.js';
import FileHandler from './file-handler.js';

export default class CliParser {
  static CONFIG_ARGUMENTS_PATTERN =
    /(?<=\s)-c(?:(?:\s+([^-]\S*)?)|$)|(?<=\s)--config(?:(?:\s+([^-]\S*)?)|$)/;
  static INPUT_PATH_ARGUMENTS_PATTERN =
    /(?<=\s)-i(?:(?:\s+([^-]\S*)?)|$)|(?<=\s)--input(?:(?:\s+([^-]\S*)?)|$)/;
  static OUTPUT_PATH_ARGUMENTS_PATTERN =
    /(?<=\s)-o(?:(?:\s+([^-]\S*)?)|$)|(?<=\s)--output(?:(?:\s+([^-]\S*)?)|$)/;

  parse(input) {
    let duplicateOption = ArgumentsChecker.checkDuplicateOptions(input);
    if (duplicateOption) {
      throw new CustomError(
        `Duplicate option: ${duplicateOption.short} or ${duplicateOption.long} must occur at most once`
      );
    }
    let configActions = this.parseConfig(input);
    const inputPath = this.parseInputPath(input);
    const outputPath = this.parseOutputPath(input);
    let inputStream = FileHandler.createReadStream(inputPath);
    let outputStream = FileHandler.createWriteStream(outputPath);
    return { actions: configActions, inputStream, outputStream };
  }

  parseConfig(input) {
    const result = input.match(CliParser.CONFIG_ARGUMENTS_PATTERN);
    const configInput = result?.[1] || result?.[2];
    if (!result) {
      throw new CustomError(
        `'Config' option not found. Enter '-c' or '--config' followed by an argument`
      );
    } else if (!configInput) {
      throw new CustomError(
        `Value for 'Config' option is not specified. Enter '-c' or '--config' followed by an argument`
      );
    }
    const configActions = this.getConfigActions(configInput);
    return configActions;
  }

  parsePath(input, pattern) {
    const result = input.match(pattern);
    return { parsed: result, path: result?.[1] || result?.[2] };
  }

  parseInputPath(input) {
    const { parsed, path } = this.parsePath(
      input,
      CliParser.INPUT_PATH_ARGUMENTS_PATTERN
    );
    if (parsed && !path) {
      throw new CustomError(
        `File name for 'Input' option is not specified.\nEnter '-i' or '--input' followed by a file name`
      );
    }
    return path;
  }

  parseOutputPath(input) {
    const { parsed, path } = this.parsePath(
      input,
      CliParser.OUTPUT_PATH_ARGUMENTS_PATTERN
    );
    if (parsed && !path) {
      throw new CustomError(
        `File name for 'Output' option is not specified.\nEnter '-o' or '--output' followed by a file name`
      );
    }
    return path;
  }

  getConfigActions(configInput) {
    const actions = configInput.split('-');
    const actionRegexp = /^A$|^C\d+$|^R\d+$/;
    actions.forEach((action) => {
      if (!actionRegexp.test(action)) {
        throw new CustomError(
          `Incorrect config value '${action}'.\nEnter any number of options separated by dashes ('-').\nAn option must be 'A', 'C' or 'R', 'C' and 'R' must be followed by 1 for encoding and 0 for decoding`
        );
      }
    });
    return actions;
  }
}
