# KROO Management Interface

A web-based management system for KROO Coworking Space built on Google Apps Script. Streamlines member check-ins via QR code, service bookings, and billing — all backed by Google Sheets.

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-WebApp-blue)
![Status](https://img.shields.io/badge/Status-Production-green)

---

## Features

### QR Code Member Check-in
- Automatic camera detection (back camera preferred)
- Intelligent QR parsing: JSON, email, member ID, or name search
- Instant member lookup and selection

### Service Management
- **Public Area Access** — day passes with multipliers and discounts
- **Room Booking** — meeting rooms and private spaces
- **Desk Rental** — dedicated workspace reservations
- **Virtual Office** — business address and mail handling
- **Event Booking** — workshops and large gatherings
- **Member Checkout** — settlement and billing

### Billing
- Real-time cost calculations
- Multiple billing items per member per session
- Automatic receipt generation
- Google Sheets transaction logging

### UX
- Carousel navigation with smooth directional animations between screens
- Real-time form validation with required field enforcement
- Services configurable via a single `appSettings` object
- Touch-optimised, fully responsive interface

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Platform   | Google Apps Script                  |
| UI         | HTML5, CSS3, Vanilla JavaScript     |
| QR Scanner | [html5-qrcode](https://github.com/mebjas/html5-qrcode) |
| Database   | Google Sheets (Sheets API v4)       |
| Library    | KROOLibraries (internal GAS lib)    |
| Deploy     | clasp CLI                           |

---

## Project Structure

```
kroo-mgmt-app/
├── README.md
├── AGENT.md
├── .gitignore
└── src/
    ├── env.js          # Sheet IDs and config
    ├── Backend.js      # Data access layer (Sheets read/write)
    ├── Helpers.js      # Utility functions (Drive images, param encoding)
    ├── Middleware.js   # Template rendering (_R, _I helpers)
    ├── Server.js       # doGet() entry point
    └── index.html      # SPA shell (check-in, services, billing)
```

> **Note:** Default branch is `dev`, not `main`.

---

## Key Configuration

Enable or disable services via `appSettings` in `index.html`:

```javascript
const appSettings = {
  services: {
    'room': { enabled: true, title: 'Room Booking', form: { ... } },
    'desk': { enabled: true, title: 'Desk Rental',  form: { ... } },
    // ...
  }
};
```

Helper functions for runtime toggling:

```javascript
enableService('room');
disableService('locker');
enableServices(['desk', 'virtual-office']);
```

---

## Getting Started

### Prerequisites

- A Google account with Google Apps Script access
- [clasp](https://github.com/google/clasp) installed globally

```bash
npm install -g @google/clasp
clasp login
```

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedallam13/kroo-mgmt-app.git
   cd kroo-mgmt-app
   ```

2. Link to your Apps Script project:
   ```bash
   clasp create --type webapp --title "KROO Management" --rootDir src
   ```

3. Push source files:
   ```bash
   clasp push
   ```

---

## Deployment

1. In the Apps Script editor, go to **Deploy > New deployment**
2. Select type: **Web app**
3. Set access permissions as required
4. Click **Deploy** and copy the Web App URL

---

## Author

**Mohamed Allam** — [GitHub](https://github.com/mohamedallam13) · [Email](mailto:mohamedallam.tu@gmail.com)
