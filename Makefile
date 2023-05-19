include .env
export

.PHONY: help
help: ## display this help screen
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z0-9_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: up
up: ## Make development.
	@docker compose --project-name ${APP_NAME} --file ./.docker/docker-compose.yaml up -d

.PHONY: down
down: ## Down development. (retain containers and delete volumes.)
	@docker compose --project-name ${APP_NAME} down --volumes

.PHONY: publish
publish: ## publish pubsub
	@go run internal/publish/main.go

.PHONY: subscribe
subscribe: ## subscribe pubsub
	@go run internal/subscribe/main.go

.PHONY: topic
topic: ## topic pubsub
	@go run internal/topic/main.go

.PHONY: subscription
subscription: ## subscription pubsub
	@go run internal/subscription/main.go
