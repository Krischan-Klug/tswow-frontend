# TSWoW Frontend

This repository contains the Next.js based front-end for the TSWoW project. It relies on the [TSWoW Backend](https://github.com/Krischan-Klug/tswow-backend) for authentication and data.

## Prerequisites

- Node.js (version 18 or later)
- A running instance of the TSWoW Backend or access to the API endpoints

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Ensure the backend service is running locally at `http://127.0.0.1:3001` or set the environment variables listed below to point to your backend.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Environment Variables

- `BACKEND_URL_LOGIN` – URL to the backend login endpoint (default: `http://127.0.0.1:3001/auth/login`).
- `BACKEND_URL_ME` – URL to the backend `me` endpoint (default: `http://127.0.0.1:3001/auth/me`).

## Available Scripts

- `npm run dev` – Run the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Start the production build.
- `npm run lint` – Run linting checks.

## Related Projects

- [TSWoW Backend](https://github.com/Krischan-Klug/tswow-backend) – the companion backend service powering this front-end.

