import { Controller, Get, Query } from '@nestjs/common';
import { TemporalService } from './temporal/temporal.service';

@Controller()
export class AppController {
  constructor(private readonly temporalService: TemporalService) {}

  @Get('query-workflow')
  async queryWorkflow(@Query('workflowId') workflowId: string) {
    const res = await TemporalService.queryExampleWorkflow(workflowId);
    return res;
  }

  @Get('signal-workflow')
  async signalWorkflow(@Query('workflowId') workflowId: string,@Query('newMessage') newMessage: string) {
    const res = await TemporalService.signalExampleWorkflow(workflowId, newMessage);
    return res;
  }
}
