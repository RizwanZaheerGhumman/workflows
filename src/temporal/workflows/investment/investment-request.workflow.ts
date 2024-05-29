import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../../activities/investment/investment-request.activity';

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