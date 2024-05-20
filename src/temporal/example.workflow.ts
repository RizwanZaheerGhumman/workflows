import { proxyActivities } from '@temporalio/workflow';

const { exampleActivity } = proxyActivities({
  startToCloseTimeout: '1 minute',
});

export async function ExampleWorkflow(name: string): Promise<string> {
  return await exampleActivity(name);
}
