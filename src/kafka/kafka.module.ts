import { Module, OnModuleInit } from '@nestjs/common';
import { consumeMessages } from './kafka.consumer';
import { sendMessage } from './kafka.producer';

@Module({})
export class KafkaModule implements OnModuleInit {
  onModuleInit() {
    sendMessage('TRIGGER_EXAMPLE_WORKFLOW', 'Example Workflow Triggered!')
    consumeMessages('TRIGGER_EXAMPLE_WORKFLOW');
  }
}
