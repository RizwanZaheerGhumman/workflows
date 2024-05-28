import { Module, OnModuleInit } from '@nestjs/common';
import { consumeMessages } from './kafka.consumer';
import { WORKFLOW } from 'src/enums/workflow.enum';
@Module({})
export class KafkaModule implements OnModuleInit {
  onModuleInit() {
    consumeMessages([WORKFLOW.TRIGGER_EXAMPLE_WORKFLOW, WORKFLOW.TRIGGER_INVESTMENT_REQUEST, WORKFLOW.TRIGGER_INVESTMENT_CANCEL]);
  }
}
