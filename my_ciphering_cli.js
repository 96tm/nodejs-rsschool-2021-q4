import { pipeline } from 'stream';
import { promisify } from 'util';
import { APP_ERROR_CODE } from './src/utils/constants.js';
import { CustomError } from './src/utils/custom-error.js';
import CliParser from './src/input-parsing/parser.js';
import actionToStream from './src/utils/action-to-stream.js';

process.on('uncaughtExceptionMonitor', (err) => {
  if (err instanceof CustomError) {
    process.stderr.write(err.message + '\n');
    process.exit(APP_ERROR_CODE);
  }
});

main();

export default function main() {
  const parser = new CliParser();
  const args = process.argv.slice(2).join(' ');
  const { actions, inputStream, outputStream } = parser.parse(' ' + args);
  const promisifyPipeline = promisify(pipeline);
  promisifyPipeline(
    inputStream,
    ...actions.map((action) => {
      return actionToStream(action, inputStream, outputStream);
    }),
    outputStream
  )
    .then(() => {
      console.log('Finished');
    })
    .catch((err) => {
      throw new CustomError(err.message);
    });
}
