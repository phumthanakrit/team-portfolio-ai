
# Chat API Contract

## 1. Endpoint

POST /api/chat

Local URL:

http://localhost:3000/api/chat

## 2. Request Headers

Content-Type: application/json

Accept: application/json

## 3. Request Body

First message:

{
  "message": "Who are the team members?"
}

Follow-up message:

{
  "message": "What are their technical skills?",
  "conversationId": "uuid-from-previous-response"
}

Fields:

| Field | Type | Required | Description |
|---|---|---|---|
| message | string | Yes | User message |
| conversationId | string | No | Identifier returned by the previous response |

### Request Validation

1. `message` must be a non-empty string after trimming whitespace.
2. Maximum message length is 2,000 Unicode grapheme clusters (user-perceived characters).
3. Length validation must use grapheme-cluster counting, not JavaScript UTF-16 `string.length`.
4. Messages exceeding the limit must be rejected.
5. If provided, `conversationId` must be a non-empty string.
6. The Backend must independently validate every incoming request. Frontend validation is not a security boundary.

## 4. Success Response

HTTP 200 OK

{
  "reply": "Our team consists of three members...",
  "conversationId": "uuid-generated-by-backend"
}

Fields:

| Field | Type | Description |
|---|---|---|
| reply | string | AI response |
| conversationId | string | Conversation identifier |

Both fields must contain non-empty strings.

## 5. Error Response

### 400 Bad Request — Invalid Message

{
  "error": {
    "code": "INVALID_MESSAGE",
    "message": "Message is required."
  }
}

### 400 Bad Request — Message Too Long

{
  "error": {
    "code": "MESSAGE_TOO_LONG",
    "message": "Message cannot exceed 2000 characters."
  }
}

### 400 Bad Request — Invalid Conversation ID

{
  "error": {
    "code": "INVALID_CONVERSATION_ID",
    "message": "Invalid conversation ID."
  }
}

### 500 Internal Server Error

{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred."
  }
}

Error responses must not expose API keys, provider credentials, database credentials, or internal stack traces.

## 6. Backend Responsibilities

1. Validate incoming messages independently.
2. Enforce the 2,000-grapheme-cluster message limit.
3. Apply consistent Unicode grapheme segmentation rules.
4. Create or retrieve conversations.
5. Validate conversation identifiers before retrieving conversation data.
6. Load relevant team portfolio context.
7. Send the user's question and context to the AI service.
8. Save user messages and AI responses in PostgreSQL.
9. Return the documented response structure.
10. Handle errors without exposing secret API keys or internal implementation details.

## 7. Frontend Responsibilities

1. Send requests using the Fetch API.
2. Validate messages before sending.
3. Count message length using the shared grapheme utility.
4. Maintain conversationId between messages.
5. Display user and assistant messages.
6. Display loading and error states.
7. Handle network and server errors.
8. Abort requests after 30 seconds and display a timeout error.
9. Validate the successful response structure before using it.

Note: The 30-second timeout is a Frontend request timeout. It does not by itself guarantee that Backend processing has stopped.

## 8. Integration Requirements

1. Frontend and Backend must follow the same request and response contract.
2. Backend validation must remain authoritative.
3. Unicode message-length rules must be consistent across both sides.
4. Conversation history must use the returned conversationId.
5. PostgreSQL persistence and real AI provider integration must be verified independently before production readiness is claimed.

## 9. Conversation History

The frontend stores conversation IDs in the current browser. The browser requests a conversation by ID when the user opens it.

GET /api/chat/conversations/{conversationId}

HTTP 200 OK

{
  "conversationId": "uuid",
  "messages": [
    {
      "id": "1",
      "role": "assistant",
      "content": "Hello.",
      "createdAt": "2026-11-15T12:00:00.000Z"
    }
  ]
}

DELETE /api/chat/conversations/{conversationId}

HTTP 204 No Content

Deleting a conversation also deletes its messages. Conversation IDs are kept in the browser that created them; there is no global conversation-list endpoint.

## 10. Portfolio Data Source

Portfolio projects are maintained in `frontend/src/data/portfolioData.ts`, not through chat API mutations. Each of the three members has three project slots with bilingual title and details fields and an optional `coverImage` path. Add image assets manually under `frontend/public/images/projects/`; the website has no image-upload control.

The backend builds Gemini's verified portfolio context from this data module. Empty project slots and members still marked as placeholders are excluded. There are no API endpoints for adding, editing, or deleting portfolio data.

