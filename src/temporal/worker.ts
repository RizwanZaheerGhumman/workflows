import { Worker } from '@temporalio/worker';
import * as activities from './activities/index';
import ConnectionSource from '../../src/config/db/data-source'

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows/index'),
    activities,
    taskQueue: 'example',
    namespace: 'default',

  });
  //TODO:Move this connection to somewhere else
  await ConnectionSource.initialize();
  await worker.run();
}

// Call the run function and handle any errors
run().catch(err => {
  console.error(err);
  process.exit(1);
});
