import { proxyActivities, defineSignal, defineQuery, setHandler, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

export const setMessageSignal = defineSignal<[string]>('setMessage');
export const getMessageQuery = defineQuery<string>('getMessage');

const { exampleActivity,OnInit } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

let message = 'Initial Message';

export async function ExampleWorkflow(name: string): Promise<string> {
  setHandler(setMessageSignal, (newMessage: string) => {
    message = newMessage;
  });

  setHandler(getMessageQuery, () => {
    return message;
  });

  const activityResult = await exampleActivity(name);
  await sleep(1*60*1000);
  return `Workflow started with message: ${activityResult}`;
}

export async function InvestmentRequest(context: object): Promise<string> {
  const activityResult = await OnInit(context);
  return `Workflow end with message: ${activityResult}`;
}
