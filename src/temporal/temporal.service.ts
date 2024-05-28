import { InvestmentCancel, InvestmentRequest } from './workflows'; 
import { connectToTemporal } from './client';

export class TemporalService {

  // InvestmentRequestWorkflow is a workflow that can be used to create an investment request
  static async investmentRequestWorkflow(context: Object): Promise<void> {
    const client = await connectToTemporal();
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await client.workflow.start(InvestmentRequest, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [context],
    });
    console.log(await workflowHandle.result());
  }

  // InvestmentCancelWorkflow is a workflow that can be used to cancel an investment request
  static async investmentCancelWorkflow(investmentId:number): Promise<void> {
    const client = await connectToTemporal();
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await client.workflow.start(InvestmentCancel, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [investmentId] 
    });
    console.log(await workflowHandle.result());
  }
}
