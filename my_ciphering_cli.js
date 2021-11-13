import CliParser from './src/parser.js';
import { APP_ERROR_CODE } from './src/constants.js';
import { CustomError } from './src/custom-error.js';

process.on('uncaughtExceptionMonitor', (err) => {
  if (err instanceof CustomError) {
    console.error(err.message);
    process.exit(APP_ERROR_CODE);
  }
});

main();

function main() {
  const parser = new CliParser();
  const args = process.argv.slice(2).join(' ');
  const actions = parser.parse(' ' + args);
  console.log(actions);
}