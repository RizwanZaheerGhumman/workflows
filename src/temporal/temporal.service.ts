import { WorkflowClient } from '@temporalio/client';
import { ExampleWorkflow, InvestmentCancel, InvestmentRequest } from './workflows'; 
import { setMessageSignal, getMessageQuery } from './workflows';

export class TemporalService {
  private static _workflowClient: WorkflowClient;

  private static get workflowClient(): WorkflowClient {
    if (!this._workflowClient) {
      this._workflowClient = new WorkflowClient();
    }
    return this._workflowClient;
  }

  static async startExampleWorkflow(name: string): Promise<void> {
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await this.workflowClient.start(ExampleWorkflow, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [name] 
    });
    console.log(await workflowHandle.result());
  }

  static async investmentRequestWorkflow(context: Object): Promise<void> {
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await this.workflowClient.start(InvestmentRequest, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [context],
    });
    console.log(await workflowHandle.result());
  }
  static async investmentCancelWorkflow(investmentId:number): Promise<void> {
    const workFlowId = 'wf-id-' + Math.floor(Math.random() * 1000);
    const workflowHandle = await this.workflowClient.start(InvestmentCancel, { 
      taskQueue: 'example', 
      workflowId: workFlowId, 
      args: [investmentId] 
    });
    console.log(await workflowHandle.result());
  }

  static async signalExampleWorkflow(workflowId: string, newMessage: string): Promise<void> {
    try {
      const workflowHandle = this.workflowClient.getHandle(workflowId);
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

  static async queryExampleWorkflow(workflowId: string): Promise<string> {
    try {
      const workflowHandle = this.workflowClient.getHandle(workflowId);
      return await workflowHandle.query(getMessageQuery);
    } catch (err) {
      console.error(`Error querying workflow: ${err.message}`);
      throw err;
    }
  }
  
  private static async isWorkflowRunning(workflowHandle: any): Promise<boolean> {
    try {
      const result = await workflowHandle.describe();
      return result.status.name === 'RUNNING';
    } catch (err) {
      console.error(`Error checking workflow status: ${err.message}`);
      return false;
    }
  }
}
