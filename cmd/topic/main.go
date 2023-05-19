package main

import (
	"context"
	"os"

	"cloud.google.com/go/pubsub"
)

func main() {
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	topicID := os.Getenv("PUBSUB_TOPIC_ID")

	ctx := context.Background()

	ps, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		panic(err)
	}

	if _, err := ps.CreateTopic(ctx, topicID); err != nil {
		panic(err)
	}
}
