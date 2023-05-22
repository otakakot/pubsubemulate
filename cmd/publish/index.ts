import { PubSub } from '@google-cloud/pubsub';

type Message = {
    id: string;
    publishedAt: number;
    status: string;
}

async function publish(
  projectId = 'local-project', // Your Google Cloud Platform project ID
  topicNameOrId = 'local-topic', // Name for the new topic to create
  subscriptionName = 'local-subscription' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const topic= pubsub.topic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  const message: Message = {
    id: '1',
    publishedAt: new Date().getTime(),
    status: 'ok',
  }

  // Send a message to the topic
  const topicId = await topic.publish(Buffer.from(JSON.stringify(message)));

  console.log(`Message ${topicId} published.`);
}

(async () => {
    process.env.PUBSUB_EMULATOR_HOST="localhost:8686"

    await publish();
})()
