import { APIGatewayProxyHandler } from 'aws-lambda';
import { Kinesis } from 'aws-sdk';

const kinesis = new Kinesis({ region: process.env.REGION });

export const produceMessages: APIGatewayProxyHandler = async (event) => {
  const streamName = process.env.STREAM_NAME!;
  const body = JSON.parse(event.body || '{}');

  try {
    await kinesis
      .putRecord({
        StreamName: streamName,
        PartitionKey: '1',
        Data: JSON.stringify(body),
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data sent to Kinesis stream!' }),
    };
  } catch (error) {
    console.error('Error writing to Kinesis:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send data to Kinesis.' }),
    };
  }
};
