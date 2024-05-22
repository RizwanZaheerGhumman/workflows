import { Kafka } from 'kafkajs';
import { TemporalService } from '../temporal/temporal.service';

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'my-group' });

export const consumeMessages = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if(topic === 'TRIGGER_EXAMPLE_WORKFLOW') {
        TemporalService.startExampleWorkflow(message.value.toString());
      } 
      if (topic === 'TRIGGER_INVESTMENT_REQUEST') {
        TemporalService.investmentRequestWorkflow({amount:2,load_id:1,user_id:1});
      }
    }
  });
};