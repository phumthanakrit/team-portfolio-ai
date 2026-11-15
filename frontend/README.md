# KUAi — Know Us. Ask AI.

**AIE312 Final Project | Team Portfolio and AI Chat Application**

KUAi is a bilingual team portfolio application that introduces our team, showcases collaborative projects, and provides an interactive AI chat interface.

The frontend is built with React, TypeScript, Vite, and Tailwind CSS. The backend, PostgreSQL persistence, and live AI integration are planned for a later development phase.

**Project:** Team Portfolio AI

**Brand:** KUAi — Know Us. Ask AI.

**Production Website:** https://team-portfolio-ai.vercel.app/

---

## 1. Current Project Status

| Feature | Status |
|---|---|
| React + TypeScript Frontend | Implemented |
| Team Portfolio Page | Implemented |
| English / Thai Language Support | Implemented |
| Project Showcase | Implemented |
| Project Image Fallback | Implemented |
| Interactive Chat Interface | Implemented |
| Unicode-aware Character Counter | Implemented |
| Frontend Chat API Service | Implemented |
| Chat API Contract | Documented |
| Automated Frontend Tests | Implemented |
| ESLint | Configured |
| Production Build | Verified |
| Express Backend | Pending Integration |
| PostgreSQL Persistence | Pending |
| Live AI Model Integration | Pending |

> Important: The Chat interface and frontend API client are implemented, but this does not mean that a live AI backend is available. Real AI responses and persistent conversation history require backend and database integration.

---

## 2. Technology Stack

### Frontend

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- React Router
- Lucide React
- React Icons

### Testing and Quality Assurance

- Vitest
- React Testing Library
- Testing Library User Event
- Jest DOM
- JSDOM
- ESLint

### Planned Backend and Database

- Node.js
- Express
- PostgreSQL

---

## 3. Project Structure

```text
frontend/
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── chat/
│   │   ├── layout/
│   │   └── portfolio/
│   │
│   ├── contexts/
│   │   ├── LanguageProvider.tsx
│   │   └── language-context.ts
│   │
│   ├── data/
│   │   └── portfolioData.ts
│   │
│   ├── pages/
│   │   ├── PortfolioPage.tsx
│   │   └── ChatPage.tsx
│   │
│   ├── services/
│   │   └── chatApi.ts
│   │
│   ├── types/
│   │   └── chat.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json
```

---

## 4. Prerequisites

Install the following tools before running the project:

- Node.js 24 or a compatible version
- npm
- Git

Verify your installation:

```bash
node --version
npm --version
git --version
```

---

## 5. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/waru1549/team-portfolio-ai.git
```

Navigate to the project:

```bash
cd team-portfolio-ai/frontend
```

### Step 2: Install Dependencies

```bash
npm ci
```

### Step 3: Configure Environment Variables

Create your local environment file.

**PowerShell:**

```powershell
Copy-Item .env.example .env.local
```

**macOS / Linux:**

```bash
cp .env.example .env.local
```

Default development configuration:

```env
API_PROXY_TARGET=http://localhost:3000
VITE_API_BASE_URL=
```

Environment variable descriptions:

| Variable | Purpose |
|---|---|
| `API_PROXY_TARGET` | Express Backend URL used by the Vite development proxy |
| `VITE_API_BASE_URL` | Optional API base URL exposed to the frontend |

Leave `VITE_API_BASE_URL` empty to use the development proxy configuration.

For production integration, configure the backend API URL through the deployment platform when required.

**Security:** Never store API secrets, passwords, tokens, or database credentials in variables prefixed with `VITE_`. These variables are exposed to the browser.

---

## 6. Available Scripts

Run all commands inside the `frontend` directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Run TypeScript checks and create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run all automated tests once |
| `npm run test:watch` | Run Vitest in watch mode |

### Start Development Server

```bash
npm run dev
```

Open the local URL displayed by Vite.

### Run Automated Tests

```bash
npm run test
```

### Run ESLint

```bash
npm run lint
```

### Create Production Build

```bash
npm run build
```

Vite generates the production files in:

```text
frontend/dist/
```

### Preview Production Build

```bash
npm run preview
```

Run the build command before starting the preview server.

---

## 7. Application Routes

| Route | Description |
|---|---|
| `/` | Main team portfolio |
| `/chat` | Interactive AI chat interface |
| Other routes | Redirect to the main portfolio page |

The application uses React Router for client-side navigation.

The `vercel.json` configuration provides an SPA rewrite to `index.html` so that application routes can be refreshed directly.

---

## 8. Language Support

KUAi supports:

- English (`en`)
- Thai (`th`)

The language state is managed through the existing `LanguageProvider` and `LanguageContext`.

The selected language is stored in browser local storage using:

```text
team-portfolio-ai-language
```

New UI components should use the existing language context and follow the established bilingual content structure.

Avoid introducing separate language-management systems inside individual components.

---

## 9. Chat API Integration

The frontend communicates with the planned backend through:

```http
POST /api/chat
Content-Type: application/json
```

The API client is located at:

```text
src/services/chatApi.ts
```

The API contract is documented in the repository:

```text
docs/chat-api-contract.md
```

The frontend currently supports:

- Message submission
- Conversation ID handling
- Loading indicators
- Error handling
- Retry functionality
- New conversation handling
- English and Thai interface labels

**Backend limitation:** The frontend API service is implemented, but actual chat responses require the Express backend to be running and connected. The frontend tests use mocked API responses and do not prove that a live AI integration exists.

---

## 10. Portfolio Data Management

Team and project information is maintained in:

```text
src/data/portfolioData.ts
```

When updating portfolio information:

1. Verify the accuracy of team and project information.
2. Maintain both English and Thai content.
3. Do not publish placeholder information as verified team facts.
4. Confirm external links before including them.
5. Keep the TypeScript interfaces consistent with the data structures.

---

## 11. Frontend Quality Checks

Before submitting frontend changes, run the following commands:

```bash
npm run lint
npm run test
npm run build
```

Recommended verification sequence:

1. Run ESLint.
2. Run all automated tests.
3. Build the production application.
4. Run the production preview.
5. Check both English and Thai interfaces.
6. Verify relevant routes and browser refresh behavior.

The project uses Vitest and React Testing Library for component and page tests.

---

## 12. Deployment Configuration

The frontend includes:

```text
vercel.json
```

This file configures SPA rewrites to serve `index.html` for application routes.

The deployment project must use the `frontend` directory as its application root and execute the configured production build.

Environment variables required for backend integration should be configured in the deployment platform.

**Important:** Local changes are not automatically reflected in the deployed production website. A new deployment is required after the changes have been reviewed and authorized for release.

---

## 13. Security Guidelines

- Never commit `.env.local`.
- Never expose API keys in frontend source code.
- Never expose database credentials through Vite environment variables.
- Keep private credentials on the backend.
- Validate external URLs before rendering links.
- Do not treat frontend validation as a substitute for backend validation.
- Keep API and database security responsibilities on the server side.

---

## 14. Related Documentation

For additional project information, refer to:

| Document | Description |
|---|---|
| `../README.md` | Repository overview and general setup |
| `../docs/README.md` | Documentation index |
| `../docs/PROJECT_OVERVIEW_TH.md` | Thai project overview |
| `../docs/FRONTEND_FILE_MAP_TH.md` | Frontend file and component guide |
| `../docs/FRONTEND_SETUP_HISTORY_TH.md` | Frontend development history |
| `../docs/TEAM_HANDOFF_TH.md` | Backend and database handoff |
| `../docs/chat-api-contract.md` | Chat API request and response contract |

---

## 15. Project Information

**Project Name:** KUAi — Know Us. Ask AI.

**Course:** AIE312

**Project Type:** Team Portfolio and AI Chat Application

**Repository:** https://github.com/waru1549/team-portfolio-ai

This project is developed for academic purposes. Backend and database integration remain part of the planned development work.
