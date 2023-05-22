import { PubSub } from '@google-cloud/pubsub';

type Message = {
    id: string;
    publishedAt: number;
    status: string;
}

test('publish', async () => {
    process.env.PUBSUB_EMULATOR_HOST="localhost:8686"

    const projectId = 'local-project';

    const topicNameOrId = 'local-topic';

    const pubsub = new PubSub({projectId});

    const topic= pubsub.topic(topicNameOrId);
  
    const message: Message = {
      id: '1',
      publishedAt: new Date().getTime(),
      status: 'ok',
    }
  
    const topicId = await topic.publishMessage({data: Buffer.from(JSON.stringify(message))});
  
    console.log(`Message ${topicId} published.`);
});
