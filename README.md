# KROO Management Interface

A modern, responsive web-based management system for co-working spaces built with Google Apps Script. Streamlines member check-ins, service bookings, and billing operations with an intuitive touch-friendly interface.

![KROO Interface](https://img.shields.io/badge/Status-Production%20Ready-green) ![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-TypeScript-blue) 

## ✨ Features

### 📱 **QR Code Member Check-in**
- Automatic camera detection (back camera preferred)
- Intelligent QR code parsing (JSON, email, member ID, or name search)
- Instant member lookup and selection

### 🏢 **Service Management**
- **Public Area Access** - Day passes with multipliers and discounts
- **Room Booking** - Meeting rooms and private spaces
- **Desk Rental** - Dedicated workspace reservations
- **Virtual Office** - Business address and mail handling
- **Event Booking** - Workshops and large gatherings
- **Member Checkout** - Settlement and billing

### 💳 **Integrated Billing System**
- Real-time cost calculations
- Multiple billing items per member
- Automatic receipt generation
- Google Sheets transaction logging

### 🎯 **Advanced Features**
- **Form Validation** - Real-time validation with required field enforcement
- **Carousel Navigation** - Smooth directional animations between screens
- **Service Configuration** - Easy enable/disable via settings object
- **Mobile Responsive** - Touch-optimized interface
- **Error Handling** - Graceful fallbacks and user feedback

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Google Apps Script (JavaScript)
- **Database**: Google Sheets (with Sheets API v4)
- **External Libraries**: KROOLibraries (custom Google Apps Script library)
- **QR Scanner**: [html5-qrcode](https://github.com/mebjas/html5-qrcode) library
- **Template Engine**: Custom middleware with server-side rendering
- **Deployment**: Google Apps Script Web App
- **CLI**: Google Clasp for development and deployment

## 🚀 Installation & Setup

### Prerequisites
- Google account with Google Apps Script access
- Node.js and npm installed
- Google Clasp CLI tool

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/KROO-MGMT-Interface.git
cd KROO-MGMT-Interface
```

### Step 2: Install Clasp
```bash
npm install -g @google/clasp
clasp login
```

### Step 3: Setup Google Apps Script
1. Update `.clasp.json` with your Google Apps Script project ID:
```json
{
  "scriptId": "your-script-id-here",
  "filePushOrder": [
    "appsscript.json"
  ]
}
```

2. Copy server files to root directory for deployment:
```bash
# Copy server files to root for Google Apps Script
cp server/*.js ./
```

3. Push code to Google Apps Script:
```bash
clasp push
```

### Step 4: Backend Configuration
The current backend architecture:
- **`Server.js`** serves the `index.html` template via `doGet()` function
- **`Helpers.js`** provides Google Drive utilities and parameter encoding
- **`Middleware.js`** handles HTML template rendering with `_R()` and `_I()` functions
- **Google Sheets API** enabled via `appsscript.json` dependencies
- **KROOLibraries** external library integrated for additional functionality

The system uses **server-side rendering** where the backend serves the HTML template with dynamic parameters.

### Step 5: Deploy Web App
1. Open Google Apps Script editor
2. Go to Deploy → New Deployment
3. Choose "Web app" type
4. Set execute permissions as needed
5. Deploy and copy the web app URL

### Step 6: Add Your Logo
Place your logo image as `logo.png` in the project root, or use the JavaScript helper:
```javascript
changeLogo('path/to/your-logo.png')
```

## ⚙️ Configuration

### Service Management
Enable/disable services via the `appSettings` object in `index.html`:

```javascript
const appSettings = {
    services: {
        'public-area': {
            enabled: true,
            title: 'Public Area Access',
            form: {
                accessType: { 
                    label: 'Access Type', 
                    type: 'select', 
                    options: ['Daily Plus', 'Daily Basic', 'Hourly Plus'],
                    required: true 
                }
                // ... more fields
            }
        }
        // ... other services
    }
};
```

### Helper Functions
```javascript
// Enable/disable services
enableService('room');
disableService('locker');

// Toggle service state
toggleService('event');

// Bulk operations
enableServices(['room', 'desk', 'virtual-office']);
disableServices(['locker', 'event']);

// Check service status
showServiceStatus();
```

## 📱 Usage

### For Members
1. **Check-in**: Click QR scan button, scan member QR code
2. **Select Service**: Choose from available services
3. **Fill Form**: Complete required fields with validation
4. **Submit**: Process request and receive confirmation

### For Staff
1. **Member Lookup**: Search members by name or scan QR
2. **Service Processing**: Handle various service requests
3. **Billing**: Process multiple items and payments
4. **Data Review**: Access Google Sheets for records

## 📁 Project Structure

```
KROO-MGMT-Interface/
├── index.html              # Main frontend application
├── server/
│   ├── Server.js           # Main Google Apps Script entry point
│   ├── Helpers.js          # Utility functions (Google Drive, encoding, etc.)
│   ├── Middleware.js       # Template rendering middleware
│   ├── Backend.js          # Backend functions (placeholder)
│   └── env.js              # Environment configuration (placeholder)
├── appsscript.json         # Apps Script manifest
├── .clasp.json             # Clasp configuration
├── logo.png                # Your organization logo
└── README.md               # This file
```

## 🔧 Key Functions

### Backend (Google Apps Script)
- **Server.js:**
  - `doGet(e)` - Main entry point, serves index.html with parameters and viewport metadata
- **Middleware.js:**
  - `_R(file, props, options)` - Render HTML templates with props and options
  - `_I(file, props)` - Include HTML file with properties
  - `MW.render()` - Core template rendering with XFrame, favicon, title, metadata support
- **Helpers.js utilities:**
  - `getGDriveImgById(id)` / `getGDriveImgByLink(link)` - Convert Google Drive to direct image URLs
  - `convertImageToDataUri(link)` - Convert Google Drive images to base64 data URIs
  - `encodeParams(email, name, discount, admin)` - Base64 encode user parameters
  - `decodeParams(hash)` - Decode hash back to parameters
  - `generateLink(email, name, discount, admin)` - Generate secure links with encoded params
  - `getWhatsappLink(number)` / `getEmailLink(email)` - Communication link generators

### Frontend (JavaScript)
- `openQRScanner()` - Initialize camera and QR scanning
- `navigateToView(targetView)` - Carousel-style navigation
- `validateForm()` - Real-time form validation
- `submitService()` - Process service submissions
- `populateServices()` - Dynamic service rendering

## 🎨 Customization

### Theming
Modify CSS variables in the `<style>` section:
```css
:root {
    --color-primary: #007AFF;
    --color-success: #28a745;
    --color-danger: #dc3545;
    /* ... more variables */
}
```

### Adding New Services
1. Add service configuration to `appSettings.services`
2. Create corresponding backend function in `Code.ts`
3. Add switch case in frontend `submitService()` function

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs and request features via GitHub Issues
- **Documentation**: Check inline code comments for detailed function documentation
- **Google Apps Script**: Refer to [official documentation](https://developers.google.com/apps-script)

## 🌟 Acknowledgments

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) for QR code scanning
- Google Apps Script platform for backend infrastructure
- Font Awesome for icons

---

**Made with ❤️ for co-working communities**