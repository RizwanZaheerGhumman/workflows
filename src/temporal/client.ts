import { Client, Connection } from '@temporalio/client';

// Temporal connection
export const connectToTemporal = async ()=>  {
  const connection = await Connection.connect();
  const client = new Client({
    connection
  });

  return client;
}
