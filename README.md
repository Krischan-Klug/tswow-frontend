# TSWoW Frontend

Next.js-Frontend für TSWoW. Nutzt das TSWoW-Backend für Authentifizierung und Daten.

## Voraussetzungen

- Node.js 18+
- Laufendes Backend oder erreichbare API-Endpunkte

## Schnellstart

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. `.env.local.example` nach `.env.local` kopieren und bei Bedarf URLs anpassen (Standard: `http://127.0.0.1:3001`).
3. Dev-Server starten:
   ```bash
   npm run dev
   ```
4. App öffnen: `http://localhost:3000`

## Umgebungsvariablen

In `.env.local` können folgende Variablen gesetzt werden (Default siehe Klammern):

- `BACKEND_URL_REGISTER` (http://127.0.0.1:3001/auth/register)
- `BACKEND_URL_LOGIN` (http://127.0.0.1:3001/auth/login)
- `BACKEND_URL_ME` (http://127.0.0.1:3001/auth/me)
- `BACKEND_URL_REALM` (http://127.0.0.1:3001/realm/info)

## Skripte

- `npm run dev` – Entwicklungsserver
- `npm run build` – Produktion bauen
- `npm run start` – Produktion starten
- `npm run lint` – Linting

## UI-Komponenten

Gemeinsame Bausteine unter `src/components/ui/*` (styled-components):

- Layout: `Container`, `ContentWrapper`, `Row`, `Column`, `Toolbar`, `Grid`
- Controls: `Button`, `Input`, `Select`, `NavLink`
- Feedback: `Alert`, `Card`, Text: `Muted`, `Pre`, `Center`
- Auth: `LogoutButton` (`src/components/auth/LogoutButton.js`)

Design-Tokens (Farben/Abstände/Radius/Schatten) unter `src/styles/globals.css`.
