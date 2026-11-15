
# KUAi — Know Us. Ask AI.

**Team Portfolio AI | AIE312 Final Project**

A bilingual team portfolio and AI chat application that introduces our team, showcases collaborative projects, and provides an interactive chat interface.

A web application that presents our team portfolio and provides an AI-powered chat interface. The project uses React and TypeScript for the frontend, with an Express API, PostgreSQL persistence, and Google Gemini integration in the backend.

## Project Status

| Component | Status |
|---|---|
| React + TypeScript Frontend | Implemented |
| Group Portfolio Page | Implemented |
| English / Thai Language Support | Implemented |
| Interactive Chat UI | Implemented |
| Unicode-aware Character Counter | Implemented |
| Project Image Fallback | Implemented |
| Frontend API Service | Implemented |
| Chat API Contract | Documented |

| Frontend Automated Tests | 65 tests passing |
| ESLint | Passing |
| Production Build | Verified |
| GitHub Actions Frontend CI | Passing |
| Production Website | Deployed |
| Express Backend | Implemented |
| PostgreSQL Integration | Implemented (tables created on startup) |
| Google Gemini Integration | Implemented (requires an API key) |

## Project Branding

- Product Name: KUAi
- Tagline: Know Us. Ask AI.
- Team Name: KNOW US. ASK AI.
- Production Website: https://vercel.app


> Chat requests require a configured backend, a running PostgreSQL database, and a Google Gemini API key.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Vitest
- React Testing Library

### Backend and Database

- Node.js
- Express
- PostgreSQL

## Repository Structure

```text
team-portfolio-ai/
├── package.json
├── package-lock.json
├── .github/
│   └── workflows/
│       └── frontend-ci.yml
├── docs/
│   └── chat-api-contract.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── database.ts
│       └── server.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 24 or compatible version
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/waru1549/team-portfolio-ai.git
cd team-portfolio-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create the backend environment file from the example.

PowerShell:

```powershell
Copy-Item backend/.env.example backend/.env
```

macOS / Linux:

```bash
cp backend/.env.example backend/.env
```

Set `DATABASE_URL` and `GOOGLE_API_KEY` in `backend/.env`. Create the PostgreSQL database named in `DATABASE_URL` before starting the backend; it creates its tables automatically.

For local development, the frontend uses the Vite proxy to connect to `http://localhost:3000` by default. No frontend environment file is required unless you need to override that configuration.

Do not put API keys, passwords, or other secrets in frontend variables prefixed with `VITE_`.

### 4. Start Frontend and Backend

```bash
npm run dev
```

Run this command from the repository root. It starts the Express backend on port `3000` and the Vite frontend on port `5173`; both stop when the command is stopped.

The backend requires PostgreSQL and the environment variables above. The frontend Vite proxy forwards `/api` requests to the backend.

Chat history is stored in PostgreSQL and indexed in the current browser, so restarting the app keeps conversations available in that browser. Each page load starts a fresh chat. Use the history button to reopen a conversation; its three-dot menu deletes that conversation and its messages from the database.

## Portfolio Project Slots

Edit `frontend/src/data/portfolioData.ts`. Each member has three blank entries in `projects`; fill each entry's `title.en`, `title.th`, `description.en`, `description.th`, and optional `coverImage` path. Add image files manually under `frontend/public/images/projects/` and use a path such as `/images/projects/member-1/project-1.webp`.

The three members use stable IDs `member-1`, `member-2`, and `member-3`. Update their names and profile fields in the same file. Set a member's `isPlaceholder` to `false` after its information is verified; placeholder member profiles are hidden from the portfolio page and AI context. Empty project slots are not displayed or sent to the AI. Portfolio data is edited in code only; there are no chat or website controls for adding, editing, uploading, or deleting portfolio data.

## Available Frontend Commands

These commands are for frontend-only development and quality checks. For the full application, use `npm run dev` from the repository root.

| Command | Description |
|---|---|
| `npm run dev` | Start the frontend only (without the backend) |
| `npm run lint` | Run ESLint |
| `npm run test` | Run automated tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |

## Chat API

The frontend communicates with the backend through:

```http
POST /api/chat
Content-Type: application/json
```

The request and response structures are documented in:

`docs/chat-api-contract.md`

The frontend API service is located at:

`frontend/src/services/chatApi.ts`

## Automated Quality Checks

GitHub Actions runs the Frontend CI workflow when relevant frontend files or the workflow configuration change.

Workflow file:

`.github/workflows/frontend-ci.yml`

The pipeline performs:

1. Checkout Repository
2. Setup Node.js
3. Install Dependencies using `npm ci`
4. Run ESLint
5. Run Automated Tests
6. Build Production App

The CI workflow runs from `frontend/` and still uses `frontend/package-lock.json`. Local development uses the root workspace and root `package-lock.json`; the backend lockfile is not needed.

## Team Portfolio Data

The sample team and member information is maintained in:

`frontend/src/data/portfolioData.ts`

Replace the placeholder names, skills, descriptions, profile links, and contact information with the actual information approved by the team.

## Security Notes

- Never commit `.env.local` or other environment files containing secrets.
- Use `.env.example` to document required environment variables.
- Do not expose private API keys in frontend code.
- Keep credentials and database secrets on the backend.

## Project Repository

GitHub:

https://github.com/waru1549/team-portfolio-ai

## License

This project is developed for academic purposes as part of the AIE312 course.
