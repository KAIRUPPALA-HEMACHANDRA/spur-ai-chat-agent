# 🤖 Spur AI Chat Agent

An AI-powered customer support chatbot that provides context-aware responses, persists full conversation history, and restores sessions across page refreshes — built with **Fastify**, **TypeScript**, **PostgreSQL**, **Google Gemini**, and **SvelteKit**.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| Frontend | https://spur-ai-chat-agent-chi.vercel.app |
| Backend API | https://spur-ai-chat-agent-p9si.onrender.com |
| Health Check | https://spur-ai-chat-agent-p9si.onrender.com/health |

> The backend is deployed on Render's free tier and may take a few seconds to wake up after periods of inactivity.

---

## ✨ Features

### 🧠 AI Customer Support Agent
- Powered by Google Gemini
- Context-aware responses using conversation history
- Built-in FAQ knowledge (shipping, returns, refunds, support hours)

### 💬 Conversation Management
- Session-based conversations with UUID tracking
- Persistent message history via PostgreSQL
- Automatic session restoration after page refresh

### 🖥️ User Experience
- Real-time chat interface with user/AI message bubbles
- Auto-scroll to latest message
- Enter key support and loading indicator
- Send button disabled during in-flight requests

### 🔒 Reliability & Security
- Input validation (empty messages, maximum length)
- Graceful AI failure handling with friendly error messages
- Secrets stored in environment variables — never committed to source control

---

## 🏗️ Architecture

```
SvelteKit Frontend  (Vercel)
        │
        ▼
    Fastify API      (Render)
        │
        ▼
    Chat Service
        │
 ┌──────┴──────┐
 ▼             ▼
Gemini AI   PostgreSQL  (Neon)
 Provider    Database
```

The backend follows a **layered architecture**:

| Layer | Responsibility |
|---|---|
| Controllers | Handle HTTP requests and responses |
| Services | Contain business logic |
| Repositories | Handle database interactions via Prisma |
| Providers | Integrate with external APIs (Gemini) |
| Validators | Validate and sanitize incoming request payloads |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit, TypeScript |
| Backend | Node.js, Fastify, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| AI | Google Gemini API |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

### Backend

```
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
└── validators/
```

### Frontend

```
frontend/src
├── lib/
│   ├── components/
│   ├── services/
│   └── types/
└── routes/
```

---

## 🗄️ Database Schema

### Conversation

| Field | Type |
|---|---|
| id | UUID |
| createdAt | DateTime |

### Message

| Field | Type |
|---|---|
| id | UUID |
| conversationId | UUID |
| sender | `USER` \| `AI` |
| content | String |
| createdAt | DateTime |

---

## 📡 API Reference

### Send Message

```http
POST /chat/message
```

Request:
```json
{
  "message": "What is your return policy?",
  "sessionId": "optional-existing-session-id"
}
```

Response:
```json
{
  "reply": "You can return items within 30 days of purchase.",
  "sessionId": "conversation-uuid"
}
```

---

### Get Conversation History

```http
GET /chat/:sessionId
```

Response:
```json
{
  "sessionId": "conversation-uuid",
  "messages": [
    { "sender": "USER", "content": "Hello", "createdAt": "..." },
    { "sender": "AI", "content": "Hi! How can I help?", "createdAt": "..." }
  ]
}
```

---

### Health Check

```http
GET /health
```

Response:
```json
{ "status": "ok" }
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or [Neon](https://neon.tech) free tier)
- Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone Repository

```bash
git clone https://github.com/KAIRUPPALA-HEMACHANDRA/spur-ai-chat-agent.git
cd spur-ai-chat-agent
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## ⚖️ Tradeoffs & Assumptions

- Conversation history is capped before being sent to the LLM to control token usage.
- FAQ knowledge is stored as prompt context rather than a dedicated vector database, keeping the architecture simple.
- Authentication is intentionally omitted to keep the scope focused on core chat and persistence features.

---

## 🚀 Future Improvements

- [ ] Streaming AI responses
- [ ] Redis caching for conversation history
- [ ] User authentication and accounts
- [ ] Rate limiting
- [ ] Markdown rendering for AI responses
- [ ] Docker support
- [ ] CI/CD pipeline
- [ ] Conversation search

---

## 👤 Author

**Hemachandra Kairuppala**  
[GitHub](https://github.com/KAIRUPPALA-HEMACHANDRA)
