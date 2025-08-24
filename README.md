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
2. Copy `.env.local.example` to `.env.local` and adjust the URLs if your backend is not running at `http://127.0.0.1:3001`.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Environment Variables

Copy `.env.local.example` to `.env.local` to provide the following variables:

- `BACKEND_URL_REGISTER` – URL to the backend register endpoint (default: `http://127.0.0.1:3001/auth/register`).
- `BACKEND_URL_LOGIN` – URL to the backend login endpoint (default: `http://127.0.0.1:3001/auth/login`).
- `BACKEND_URL_ME` – URL to the backend `me` endpoint (default: `http://127.0.0.1:3001/auth/me`).
- `BACKEND_URL_REALM` – URL to the backend realm info endpoint (default: `http://127.0.0.1:3001/realm/info`).

## Available Scripts

- `npm run dev` – Run the development server.
- `npm run build` – Build the application for production.
- `npm run start` – Start the production build.
- `npm run lint` – Run linting checks.

## Related Projects

- [TSWoW Backend](https://github.com/Krischan-Klug/tswow-backend) – the companion backend service powering this front-end.

