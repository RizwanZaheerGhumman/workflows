import { WorkflowClient } from '@temporalio/client';
import { ExampleWorkflow } from './example.workflow'; 
export class TemporalService {
  private workflowClient: WorkflowClient;
  constructor() {
    this.workflowClient = new WorkflowClient();
  }

  async startExampleWorkflow(name: string): Promise<void> {
    const workflowHandle = await this.workflowClient.start(ExampleWorkflow, { taskQueue: 'example', workflowId: 'wf-id'+ Math.floor(Math.random() *1000), args: [name] });
    console.log(await workflowHandle.result());
  }
}