import { PubSub } from '@google-cloud/pubsub';
import { Message } from '../gen';

test('publish', async () => {
    const projectId = 'local-project';

    const topicNameOrId = 'local-topic';

    const pubsub = new PubSub({projectId});

    const topic= pubsub.topic(topicNameOrId);
  
    const message: Message = {
      id: '1',
      publishedAt: new Date().getTime(),
      status: Message.status.OK,
    }
  
    const topicId = await topic.publishMessage({data: Buffer.from(JSON.stringify(message))});
  
    console.log(`Message ${topicId} published.`);
});
