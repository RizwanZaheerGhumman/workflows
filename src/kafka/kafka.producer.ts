import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

export const sendMessage = async (topic: string, message: string) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
};
