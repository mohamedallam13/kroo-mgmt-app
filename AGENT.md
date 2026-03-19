# AGENT.md — kroo-mgmt-app

## Purpose
A web-based management interface for KROO Coworking Space. Handles member check-ins (QR code), service bookings (rooms, desks, virtual office, events), and billing, all backed by Google Sheets.

## Structure
```
kroo-mgmt-app/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── env.js          ← Sheet IDs / config
    ├── Backend.js      ← data access layer (Sheets read/write)
    ├── Helpers.js      ← pure utility functions
    ├── Middleware.js   ← server-side routing / auth
    ├── Server.js       ← doGet() / doPost() entry points
    └── index.html      ← SPA shell (QR check-in, services, billing)
```

## Key Facts
- **Platform:** Google Apps Script WebApp
- **Data store:** Google Sheets (IDs in `env.js`)
- **Default branch:** `dev` (not `main`) — always push to `dev`
- **Features:** QR member check-in, multi-service booking, carousel navigation, receipt generation
- **Entry point:** `Server.js` → `doGet()` / `doPost()`

## Development Notes
- All source files live under `src/` — push with clasp from that directory
- **Branch is `dev`** — do not push to `main`
- No Node/npm at runtime; ES5-compatible GAS code only
- Sheet IDs and secrets live in `env.js` (not committed with real values)
