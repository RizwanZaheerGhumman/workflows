import { Kafka } from 'kafkajs';

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
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};
