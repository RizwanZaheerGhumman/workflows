// kafka.consumer.ts

import { Kafka } from 'kafkajs';
import { TemporalService } from '../temporal/temporal.service';
import { WORKFLOW } from 'src/enums/workflow.enum';

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

export const consumeMessages = async (topics: string[]) => {
  await consumer.connect();
  await topics.forEach(async (topic) => {
    await consumer.subscribe({ topic, fromBeginning: true });
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log({
        value:JSON.parse(message.value.toString()),
      });

      if (topic === WORKFLOW.TRIGGER_EXAMPLE_WORKFLOW) {
        TemporalService.startExampleWorkflow(JSON.parse(message.value.toString()));
      }
      if (topic === WORKFLOW.TRIGGER_INVESTMENT_REQUEST) {
        TemporalService.investmentRequestWorkflow(JSON.parse(message.value.toString()));
      }
    },
  });
};
