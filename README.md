# Spur AI Chat Agent

An AI-powered customer support chatbot built as part of the Spur Software Engineer take-home assignment.

The application allows users to interact with a support agent backed by Google's Gemini model, while maintaining conversation history and persisting messages in a database.

---

## Features

### AI Customer Support Agent

* Powered by Google Gemini
* Context-aware responses using conversation history
* FAQ/domain knowledge support

### Conversation Management

* Session-based conversations
* Persistent message history
* Conversation restoration after page refresh

### User Experience

* Real-time chat interface
* Auto-scroll to latest message
* Enter key support
* Loading indicator
* Disabled send button during requests
* User and AI message bubbles

### Reliability

* Input validation
* Session validation
* Graceful AI failure handling
* Friendly error messages
* No hardcoded secrets

---

## Tech Stack

### Frontend

* SvelteKit
* TypeScript

### Backend

* Node.js
* Fastify
* TypeScript
* Prisma ORM

### Database

* PostgreSQL

### AI

* Google Gemini API

---

## Project Structure

### Backend

```text
backend/src
├── config/
├── constants/
├── controllers/
├── db/
├── errors/
├── providers/
├── repositories/
├── routes/
├── services/
├── types/
├── validators/
```

### Frontend

```text
frontend/src
├── lib/
│   ├── components/
│   ├── services/
│   └── types/
├── routes/
```

---

## Architecture

The backend follows a layered architecture:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

### Responsibilities

#### Controllers

Handle HTTP requests and responses.

#### Services

Contain business logic.

#### Repositories

Handle database interactions.

#### Providers

Integrate with external services such as Gemini.

#### Validators

Validate incoming request payloads.

---

## Database Schema

### Conversation

| Field     | Type     |
| --------- | -------- |
| id        | UUID     |
| createdAt | DateTime |

### Message

| Field          | Type      |
| -------------- | --------- |
| id             | UUID      |
| conversationId | UUID      |
| sender         | USER | AI |
| content        | String    |
| createdAt      | DateTime  |

---

## Environment Variables

### Backend

Create:

```env
backend/.env
```

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

Create:

```env
frontend/.env
```

```env
VITE_API_URL=http://localhost:3000
```

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
cd spur-ai-chat-agent
```

### Backend Setup

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Send Message

#### Request

```http
POST /chat/message
```

```json
{
  "message": "What is your return policy?",
  "sessionId": "optional-session-id"
}
```

#### Response

```json
{
  "reply": "You can return items within 30 days of purchase.",
  "sessionId": "conversation-id"
}
```

---

### Get Conversation History

#### Request

```http
GET /chat/:sessionId
```

#### Response

```json
{
  "sessionId": "conversation-id",
  "messages": []
}
```

---

## Functional Requirements Covered

### Chat UI

* Scrollable chat history
* User/AI distinction
* Send button
* Enter key support
* Auto-scroll

### Backend API

* Message endpoint
* Conversation history endpoint
* Session management

### LLM Integration

* Gemini integration
* Conversation context
* Environment variable configuration
* Graceful error handling

### FAQ Knowledge

* Shipping policy
* Return policy
* Refund policy
* Support hours

### Persistence

* Conversations
* Messages
* Session restoration

### Robustness

* Empty message validation
* Maximum length validation
* Invalid session handling
* AI failure handling
* Clean error responses

---

## Tradeoffs & Assumptions

* Conversation history is capped before being sent to the LLM to control token usage.
* FAQ knowledge is stored as prompt context rather than in a dedicated knowledge base.
* Authentication is intentionally omitted to keep the scope focused on the assignment requirements.

---

## Future Improvements

* Streaming AI responses
* Redis caching
* Authentication and user accounts
* Rate limiting
* Markdown rendering
* Docker support
* CI/CD pipeline
* Conversation search

---

## Author

Hemachandra
