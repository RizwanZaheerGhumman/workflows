import { Worker } from '@temporalio/worker';
import * as activities from './example.activity';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./example.workflow'),
    activities,
    taskQueue: 'example',
    namespace: 'default',

  });
  await worker.run();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
