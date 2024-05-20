import { Module, OnModuleInit } from '@nestjs/common';
import { consumeMessages } from './kafka.consumer';

@Module({})
export class KafkaModule implements OnModuleInit {
  onModuleInit() {
    consumeMessages('example-topic');
  }
}
