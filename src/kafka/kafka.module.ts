import { Module, OnModuleInit } from '@nestjs/common';
import { consumeMessages } from './kafka.consumer';
import { WORKFLOW } from 'src/enums/workflow.enum';
/**
 * Represents the Kafka module.
 * This module implements the OnModuleInit interface.
 */
@Module({})
export class KafkaModule implements OnModuleInit {
  /**
   * Lifecycle hook that is called after the module has been initialized.
   * It consumes messages from the specified Kafka topics.
   */
  onModuleInit() {
    consumeMessages([WORKFLOW.TRIGGER_EXAMPLE_WORKFLOW, WORKFLOW.TRIGGER_INVESTMENT_REQUEST, WORKFLOW.TRIGGER_INVESTMENT_CANCEL]);
  }
}
