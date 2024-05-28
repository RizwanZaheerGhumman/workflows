import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

/**
 * Initializes the workflow and executes the activities.
 * @param context - The context object.
 * @returns A promise that resolves to a string representing the workflow end message.
 */
export async function InvestmentRequest(context: object): Promise<string> {
  const { OnInit, KFTC } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
  });

  const onInitActivityResult = await OnInit(context);
  const kftcActtivityResult = await KFTC(onInitActivityResult);
  return `Workflow end with message: ${JSON.stringify(kftcActtivityResult)}`;
}

/**
 * Cancels an investment request.
 * @param investmentId - The ID of the investment to cancel.
 * @returns A promise that resolves to a string representing the workflow end message.
 */
export async function InvestmentCancel(investmentId: number): Promise<string> {
  const { OnError } = proxyActivities<typeof activities>({
    startToCloseTimeout: '1 minute',
  });

  const investmentCancelActivity = await OnError(investmentId);
  return `Workflow end with message: ${JSON.stringify(investmentCancelActivity)}`;
}
