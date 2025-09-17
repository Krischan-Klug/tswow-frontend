# TSWoW Frontend

Next.js frontend for TSWoW. Uses the TSWoW backend for authentication and data access via Next.js API routes.

## Requirements

- Node.js 18+
- A running backend or reachable API endpoints

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.local.example` to `.env.local` and adjust URLs if needed (defaults point to `http://127.0.0.1:3001`).
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the app: `http://localhost:3000`

## Environment Variables

Set these in `.env.local` (defaults shown in parentheses):

- `BACKEND_URL_REGISTER` (http://127.0.0.1:3001/auth/register)
- `BACKEND_URL_LOGIN` (http://127.0.0.1:3001/auth/login)
- `BACKEND_URL_ME` (http://127.0.0.1:3001/auth/me)
- `BACKEND_URL_REALM` (http://127.0.0.1:3001/realm/info)
- `BACKEND_URL_CHARACTER` (http://127.0.0.1:3001/character)
- `BACKEND_URL_CASINO_COIN_FLIP` (http://127.0.0.1:3001/casino/coin-flip)
- `BACKEND_URL_CASINO_CHARACTERS` (optional; defaults to `${BASE}/casino/characters` if not set)
- `NEXT_PUBLIC_BACKEND_URL` (optional; used by some API routes to derive defaults)

Tip: You should not call the backend directly from the browser. Keep backend URLs in server-only environment variables and use the app's `/api/*` routes from the client.

## API (How the frontend talks to the backend)

The browser never calls the backend directly. Instead, it calls Next.js API routes under `/api/*`. Those routes run on the server, forward the request to the backend, and return the response. Benefits:

- Centralized configuration via environment variables
- Secure login using an `HttpOnly` cookie for the JWT (set by `/api/login`)
- Avoids CORS and avoids browser mixed-content issues

Main API routes provided by this app:

- `POST /api/register` -> proxies to `BACKEND_URL_REGISTER`
- `POST /api/login` -> proxies to `BACKEND_URL_LOGIN`, sets `auth` HttpOnly cookie, returns `{ account }`
- `GET  /api/me` -> proxies to `BACKEND_URL_ME` using the cookie as Bearer token, returns `{ account }`
- `POST /api/realm` -> proxies to `BACKEND_URL_REALM`
- `POST /api/character` -> proxies to `BACKEND_URL_CHARACTER` (requires auth)
- `GET  /api/casino/characters` -> proxies to casino characters endpoint (requires auth)
- `POST /api/casino/coin-flip` -> proxies to `BACKEND_URL_CASINO_COIN_FLIP` (requires auth)

The implementation lives under `src/pages/api/*`. Example files:

- `src/pages/api/login.js`
- `src/pages/api/me.js`
- `src/pages/api/realm.js`
- `src/pages/api/character.js`
- `src/pages/api/casino/characters.js`
- `src/pages/api/casino/coin-flip.js`

## Example: calling the backend from the client

From client components, always call the same-origin API routes. You can use the small helpers in `src/lib/api.js`:

```js
import { jsonPost, jsonGet } from "@/lib/api";

async function loginAndLoad(username, password) {
  // 1) Login -> server sets HttpOnly cookie if successful
  await jsonPost("/api/login", { username, password });

  // 2) Read current account via cookie-backed session
  const { account } = await jsonGet("/api/me");
  console.log("Logged in as:", account.username);
}
```

Or with plain `fetch` (as used in `src/pages/login.js`):

```js
const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password })
});
const data = await res.json();
```

## No Mixed Content (HTTPS/HTTP)

Mixed content happens when an HTTPS page loads HTTP resources in the browser. This app avoids that by design:

- In the browser, always call same-origin paths like `/api/login` or `/api/me` - never `http://127.0.0.1:3001/...`.
- The Next.js API route (server) talks to the backend. Server-to-server HTTP calls are not "mixed content" because they do not run in the browser. For public networks and production, prefer HTTPS to the backend.
- If you ever expose a backend URL to the browser (not recommended), it must be `https://` and properly configured for CORS; otherwise the browser will block it due to mixed content.
- In production, serve the frontend over HTTPS. The login route sets the cookie with `Secure` when `NODE_ENV=production`.

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - lint the codebase

## UI Components

Shared building blocks under `src/components/ui/*` (styled-components):

- Layout: `Container`, `ContentWrapper`, `Row`, `Column`, `Toolbar`, `Grid`
- Controls: `Button`, `Input`, `Select`, `NavLink`
- Feedback: `Alert`, `Card`, Text: `Muted`, `Pre`, `Center`
- Auth: `LogoutButton` (`src/components/auth/LogoutButton.js`)

Design tokens (colors/spacing/radius/shadows) are defined in `src/styles/globals.css`.
