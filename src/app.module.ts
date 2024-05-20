import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TemporalService } from './temporal/temporal.service';
import { KafkaModule } from './kafka/kafka.module';
import { AppService } from './app.service';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [TemporalService,AppService],
})
export class AppModule {}
