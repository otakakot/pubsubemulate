package main

import (
	"context"
	"os"
	"time"

	"cloud.google.com/go/pubsub"
)

func main() {
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	subscriptionID := os.Getenv("PUBSUB_SUBSCRIPTION_ID")

	topicID := os.Getenv("PUBSUB_TOPIC_ID")

	ctx := context.Background()

	ps, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		panic(err)
	}

	topic := ps.Topic(topicID)

	// https://cloud.google.com/pubsub/docs/create-subscription?hl=ja#pull_subscription
	if _, err := ps.CreateSubscription(ctx, subscriptionID, pubsub.SubscriptionConfig{
		Topic:       topic,
		AckDeadline: 10 * time.Minute,
	}); err != nil {
		panic(err)
	}
}
