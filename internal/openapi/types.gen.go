// Package openapi provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.12.4 DO NOT EDIT.
package openapi

// Defines values for MessageStatus.
const (
	Ng MessageStatus = "ng"
	Ok MessageStatus = "ok"
)

// Message defines model for Message.
type Message struct {
	// Id ID
	Id string `json:"id"`

	// PublishedAt プッシュ日時
	PublishedAt int64 `json:"publishedAt"`

	// Status ステータス
	Status MessageStatus `json:"status"`
}

// MessageStatus ステータス
type MessageStatus string
