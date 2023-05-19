package main

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/pubsub"
)

func main() {
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	subscriptionID := os.Getenv("PUBSUB_SUBSCRIPTION_ID")

	ctx := context.Background()

	ps, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		panic(err)
	}

	sub := ps.Subscription(subscriptionID)

	if err := sub.Receive(ctx, func(ctx context.Context, m *pubsub.Message) {
		defer m.Ack()
		log.Printf("received message id: %s, data: %s", m.ID, m.Data)
	}); err != nil {
		panic(err)
	}
}
