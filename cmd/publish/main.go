package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"time"

	"cloud.google.com/go/pubsub"
	"github.com/google/uuid"
	"github.com/otkakot/pubsubemulate/internal/openapi"
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

	msg := openapi.Message{
		Id:          uuid.NewString(),
		PublishedAt: time.Now().Unix(),
		Status:      openapi.Ok,
	}

	mj, err := json.Marshal(msg)
	if err != nil {
		panic(err)
	}

	res := topic.Publish(ctx, &pubsub.Message{
		Data: mj,
	})

	id, err := res.Get(ctx)
	if err != nil {
		panic(err)
	}

	log.Printf("published a message with ID %s", id)
}
