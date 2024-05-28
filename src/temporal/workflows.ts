import { proxyActivities, defineSignal, defineQuery, setHandler } from '@temporalio/workflow';
import type * as activities from './activities';

export const setMessageSignal = defineSignal<[string]>('setMessage');
export const getMessageQuery = defineQuery<string>('getMessage');

const { exampleActivity,OnInit,KFTC,OnError } = proxyActivities<typeof activities>({
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
  return `Workflow end with message: ${activityResult}`;
}

export async function InvestmentRequest(context: object): Promise<string> {
  const OnInitActivityResult = await OnInit(context);
  const KftcActtivityResult = await KFTC(OnInitActivityResult);
  return `Workflow end with message: ${JSON.stringify(KftcActtivityResult)}`;
}

export async function InvestmentCancel(investmentId:number): Promise<string> {
  const investmentCancelActivity = await OnError(investmentId);
  return `Workflow end with message: ${JSON.stringify(investmentCancelActivity)}`;
}
