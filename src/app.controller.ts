import { Controller, Get, Query } from '@nestjs/common';
import { TemporalService } from './temporal/temporal.service';

@Controller()
export class AppController {
  constructor(private readonly temporalService: TemporalService) {}

  @Get('start-workflow')
  async startWorkflow(@Query('name') name: string) {
    // const result = await this.temporalService.startExampleWorkflow(name);
    // await sendMessage('example-topic', `Workflow result: ${result}`);
    // return result;
  }
}
