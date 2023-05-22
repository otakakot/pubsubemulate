import { PubSub } from '@google-cloud/pubsub';

test('subscribe', (done) => {
    const projectId = 'local-project';

    const topicNameOrId = 'local-topic';

    const subscriptionName = 'local-subscription'

    const pubsub = new PubSub({projectId});

    const topic= pubsub.topic(topicNameOrId);

    const subscription = topic.subscription(subscriptionName);

    subscription.on('message', (message) => {
        console.log(`Received message id ${message.id}`);
        console.log(`Received message data ${message.data}`);
        message.ack();
        done();
    })
    
    subscription.on('error', (error) => {
        console.log(`Received error ${error}`);
        done(error);
    })
});
