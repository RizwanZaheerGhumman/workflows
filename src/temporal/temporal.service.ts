import { ExampleWorkflow, InvestmentCancel, InvestmentRequest } from './workflows'; 
import { setMessageSignal, getMessageQuery } from './workflows';
import { connectToTemporal } from './client';

export class TemporalService {

  // This is an examplery workflow that can be used to test the Temporal service
  static async startExampleWorkflow(name: string): Promise<void> {
    const client = await connectToTemporal();
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await client.workflow.start(ExampleWorkflow, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [name] 
    });
    console.log(await workflowHandle.result());
  }

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

  // signalExampleWorkflow is a function that can be used to signal a running workflow
  static async signalExampleWorkflow(workflowId: string, newMessage: string): Promise<void> {
    try {
      const client = await connectToTemporal();
      const workflowHandle = client.workflow.getHandle(workflowId);
      const isRunning = await this.isWorkflowRunning(workflowHandle);
      if (isRunning) {
        await workflowHandle.signal(setMessageSignal, newMessage);
      } else {
        console.warn(`Workflow ${workflowId} is already completed.`);
      }
    } catch (err) {
      console.error(`Error signaling workflow: ${err.message}`);
    }
  }

  // queryExampleWorkflow is a function that can be used to query a running workflow
  static async queryExampleWorkflow(workflowId: string): Promise<string> {
    try {
      const client = await connectToTemporal();
      const workflowHandle = client.workflow.getHandle(workflowId);
      return await workflowHandle.query(getMessageQuery);
    } catch (err) {
      console.error(`Error querying workflow: ${err.message}`);
      throw err;
    }
  }
  
  
  private static async isWorkflowRunning(workflowHandle: any): Promise<boolean> {
    try {
       const client = await connectToTemporal();
      const result = await workflowHandle.describe();
      return result.status.name === 'RUNNING';
    } catch (err) {
      console.error(`Error checking workflow status: ${err.message}`);
      return false;
    }
  }
}
