import { Client, Connection } from '@temporalio/client';

/**
 * Connects to the Temporal server and returns a client instance.
 * @returns {Promise<Client>} A promise that resolves to a Temporal client instance.
 */
export const connectToTemporal = async ()=>  {
  const connection = await Connection.connect();
  const client = new Client({
    connection
  });

  return client;
}
