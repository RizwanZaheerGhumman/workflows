import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { KafkaModule } from './kafka/kafka.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnectionSource from './config/db/data-source';
import { Module } from '@nestjs/common';
import { InvestmentService } from './temporal/services/investment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...ConnectionSource.options,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [InvestmentService, AppService],
})
export class AppModule {}
