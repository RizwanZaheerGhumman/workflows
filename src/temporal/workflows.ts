import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';


const { OnInit,KFTC,OnError } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function InvestmentRequest(context: object): Promise<string> {
  const onInitActivityResult = await OnInit(context);
  const kftcActtivityResult = await KFTC(onInitActivityResult);
  return `Workflow end with message: ${JSON.stringify(kftcActtivityResult)}`;
}

export async function InvestmentCancel(investmentId:number): Promise<string> {
  const investmentCancelActivity = await OnError(investmentId);
  return `Workflow end with message: ${JSON.stringify(investmentCancelActivity)}`;
}
