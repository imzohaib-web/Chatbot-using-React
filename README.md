# AI Chatbot Using React

A full-stack AI chatbot built with React, Vite, and Flask. The app lets users send chat messages from a React frontend and receive AI responses from a Flask backend using Gemini or OpenRouter.

## Features

- React chat interface powered by Vite
- Flask API endpoint for chatbot responses
- Gemini API support
- OpenRouter API support
- Environment-based API key configuration
- CORS enabled for local frontend/backend development

## Project Structure

```text
chatbot-project/
  backend/
    app.py
    database.py
    .env.example
  frontend/
    src/
    package.json
    vite.config.js
  README.md
```

## Prerequisites

- Node.js and npm
- Python 3.10 or newer
- A Gemini API key and/or an OpenRouter API key

## Backend Setup

From the project root:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install flask flask-cors python-dotenv google-genai requests
copy .env.example .env
```

Update `backend/.env` with your real API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Start the backend:

```bash
python app.py
```

By default, Flask runs at `http://127.0.0.1:5000`.

## Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Vite will print the local frontend URL, usually `http://localhost:5173`.

## API

The backend exposes:

```http
POST /chat
```

Request body:

```json
{
  "message": "Hello!",
  "provider": "gemini"
}
```

Use `"openrouter"` as the provider to route the message through OpenRouter.

## Security

Do not commit `.env` files or real API keys. Use `.env.example` as the template and keep secrets local.
