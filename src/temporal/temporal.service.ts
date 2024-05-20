import { WorkflowClient } from '@temporalio/client';
import { ExampleWorkflow } from './example.workflow'; 
export class TemporalService {
  private static workflowClient: WorkflowClient;
  constructor() {
    TemporalService.workflowClient = new WorkflowClient();
  }

  static async startExampleWorkflow(name: string): Promise<void> {
    const workflowHandle = await this.workflowClient.start(ExampleWorkflow, { taskQueue: 'example', workflowId: 'wf-id'+ Math.floor(Math.random() *1000), args: [name] });
    console.log(await workflowHandle.result());
  }
}