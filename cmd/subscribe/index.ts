import { PubSub } from '@google-cloud/pubsub';

async function subscribe(
  projectId = 'local-project', // Your Google Cloud Platform project ID
  topicNameOrId = 'local-topic', // Name for the new topic to create
  subscriptionName = 'local-subscription' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const topic= pubsub.topic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  const subscription = topic.subscription(subscriptionName);

  subscription.on('message', (message) => {
    console.log(`Received message ${message.id}`);
    console.log(`Received message ${message.data}`);
    message.ack();
  })

  subscription.on('error', (error) => {
    console.log(`Received error ${error}`);
  })
}

(async () => {
    process.env.PUBSUB_EMULATOR_HOST="localhost:8686"

    await subscribe();
})()
