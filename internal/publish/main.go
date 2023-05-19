package main

import (
	"context"
	"log"
	"os"

	"cloud.google.com/go/pubsub"
	"github.com/google/uuid"
)

func main() {
	projectID := os.Getenv("GOOGLE_PROJECT_ID")

	topicID := os.Getenv("PUBSUB_TOPIC_ID")

	ctx := context.Background()

	ps, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		panic(err)
	}

	topic := ps.Topic(topicID)

	res := topic.Publish(ctx, &pubsub.Message{
		Data: []byte(uuid.NewString()),
	})

	id, err := res.Get(ctx)
	if err != nil {
		panic(err)
	}

	log.Printf("published a message with ID %s", id)
}
