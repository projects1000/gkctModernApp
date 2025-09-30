# GKCT Modern App

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status.svg)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

A modern React application built with Vite and Tailwind CSS.

## Features

- 🚀 Built with Vite for fast development and building
- ⚛️ React 18 with modern hooks
- 🎨 Tailwind CSS for styling
- 🧩 Radix UI components for accessibility
- 📱 Responsive design
- 🔄 Automatic deployment with Netlify

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/projects1000/gkctModernApp.git
cd gkctModernApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

This project is configured for automatic deployment to Netlify:

- Push to the `main` branch to trigger a production deployment
- Pull requests will create preview deployments
- Build command: `npm run build`
- Publish directory: `dist`

## Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── customer/       # Customer-specific components
│   ├── dashboards/     # Dashboard components
│   ├── shared/         # Shared/common components
│   └── ui/             # UI components (buttons, inputs, etc.)
├── lib/                # Utility functions
└── App.jsx             # Main App component
```

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Deployment:** Netlify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and proprietary.