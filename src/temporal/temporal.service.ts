import { InvestmentCancel, InvestmentRequest } from './workflows'; 
import { connectToTemporal } from './client';

export class TemporalService {

  // InvestmentRequestWorkflow is a workflow that can be used to create an investment request
  static async investmentRequestWorkflow(context: Object): Promise<void> {
    // temporal client
    const client = await connectToTemporal();
    // generate a random workflow id
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    // start the workflow
    const workflowHandle = await client.workflow.start(InvestmentRequest, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [context],
    });
    // log the result
    console.log(await workflowHandle.result());
  }

  // InvestmentCancelWorkflow is a workflow that can be used to cancel an investment request
  static async investmentCancelWorkflow(investmentId:number): Promise<void> {
    // temporal client
    const client = await connectToTemporal();
    // generate a random workflow id
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    // start the workflow
    const workflowHandle = await client.workflow.start(InvestmentCancel, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [investmentId] 
    });
    // log the result
    console.log(await workflowHandle.result());
  }
}
