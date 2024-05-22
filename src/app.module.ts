import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TemporalService } from './temporal/temporal.service';
import { KafkaModule } from './kafka/kafka.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnectionSource from './config/db/data-source';

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ConnectionSource.options,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [TemporalService, AppService],
})
export class AppModule {}
