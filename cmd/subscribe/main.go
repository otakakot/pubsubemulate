package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"cloud.google.com/go/pubsub"
	"github.com/otkakot/pubsubemulate/internal/openapi"
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
		var msg openapi.Message

		if err := json.Unmarshal(m.Data, &msg); err != nil {
			panic(err)
		}

		log.Printf("received message: %+v", msg)
	}); err != nil {
		panic(err)
	}
}
