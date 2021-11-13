export default class InputChecker {
  static DUPLICATE_CONFIG_OPTION_PATTERN = /((?<=\s)-c(?=\s))|((?<=\s)--config(?=\s))/g;
  static DUPLICATE_INPUT_OPTION_PATTERN = /((?<=\s)-i(?=\s))|((?<=\s)--input(?=\s))/g;
  static DUPLICATE_OUTPUT_OPTION_PATTERN = /((?<=\s)-o(?=\s))|((?<=\s)--output(?=\s))/g;

  static checkDuplicateOptions(input) {
    if (input.match(InputChecker.DUPLICATE_CONFIG_OPTION_PATTERN)?.length > 1) {
      return { short: '-c', long: '--config'};
    }
    if (input.match(InputChecker.DUPLICATE_INPUT_OPTION_PATTERN)?.length > 1) {
      return { short: '-i', long: '--input'};
    }
    if (input.match(InputChecker.DUPLICATE_OUTPUT_OPTION_PATTERN)?.length > 1) {
      return { short: '-o', long: '--output'};
    }
    return null;
  }
}