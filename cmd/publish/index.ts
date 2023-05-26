import { PubSub } from '@google-cloud/pubsub';

type Message = {
    id: string;
    publishedAt: number;
    status: string;
}

async function publish(
  projectId = 'local-project', // Your Google Cloud Platform project ID
  topicNameOrId = 'local-topic', // Name for the new topic to create
) {
  const pubsub = new PubSub({projectId});

  const topic= pubsub.topic(topicNameOrId);

  const message: Message = {
    id: '1',
    publishedAt: new Date().getTime(),
    status: 'ok',
  }

  const messageId = await topic.publishMessage({data: Buffer.from(JSON.stringify(message))});

  console.log(`Message ${messageId} published.`);
}

(async () => {
    process.env.PUBSUB_EMULATOR_HOST="localhost:8686"

    await publish();
})()
