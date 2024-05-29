import { Kafka } from 'kafkajs';
import { WORKFLOW } from 'src/enums/workflow.enum';
import { InvestmentService } from 'src/temporal/services/investment.service';

/**
 * Kafka consumer module for consuming messages from Kafka topics.
 */

// Create a new Kafka instance
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers: [process.env.KAFKA_BROKER as string || 'localhost:9092']
});

// Create a new Kafka consumer
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'my-group'});

/**
 * Consumes messages from the specified Kafka topics.
 * @param topics The Kafka topics to consume messages from.
 */
export const consumeMessages = async (topics: string[]) => {

  // Connect the consumer to the Kafka broker
  await consumer.connect();
  
  // Subscribe to the specified topics
  await topics.forEach(async (topic) => {
    await consumer.subscribe({ topic, fromBeginning: true });
  });

  // Consume messages from the topics
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log({
        value:JSON.parse(message.value.toString()),
      });

      // Handle messages based on the topic
      switch (topic) {
        case WORKFLOW.TRIGGER_INVESTMENT_REQUEST:
          // Call the investmentRequestWorkflow method of the InvestmentService
          InvestmentService.investmentRequestWorkflow(JSON.parse(message.value.toString()));
          break;
      
        case WORKFLOW.TRIGGER_INVESTMENT_CANCEL:
          // Call the investmentCancelWorkflow method of the InvestmentService
          InvestmentService.investmentCancelWorkflow(JSON.parse(message.value.toString()));
          break;
      
        default:
          // Log a warning for unhandled topics
          console.warn(`Unhandled topic: ${topic}`);
      }
    },
  });
};
