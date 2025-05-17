# Kaize-assignamnet
# LeadPulse - Marketing Analytics Dashboard

A powerful SaaS platform designed for marketing agencies to manage and analyze lead generation across multiple channels. Built with React, Node.js, and real-time data capabilities.

![LeadPulse Dashboard](https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Real-time Analytics Dashboard**
  - Live lead tracking and campaign performance
  - Interactive data visualization with Recharts
  - Customizable metrics and KPIs

- **Multi-channel Campaign Management**
  - Google Ads, Facebook, LinkedIn, Email integration
  - Campaign performance comparison
  - ROI tracking and optimization

- **Advanced Lead Management**
  - Lead quality scoring
  - Source attribution
  - Conversion tracking
  - Custom filtering and segmentation

- **Performance Optimization**
  - Efficient handling of large datasets
  - Real-time WebSocket updates
  - Responsive design for all devices

## Tech Stack

- **Frontend**
  - React 18
  - Recharts for data visualization
  - Tailwind CSS for styling
  - Socket.io-client for real-time updates

- **Backend**
  - Node.js with Express
  - Socket.io for real-time communication
  - RESTful API architecture

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/leadpulse.git
cd leadpulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
npm run dev:all
```

This will start both the frontend and backend servers:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
leadpulse/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   ├── services/         # API and service functions
│   └── App.jsx           # Main application component
├── server/                # Backend source code
│   └── index.js          # Express server setup
├── public/               # Static assets
└── package.json          # Project configuration
```

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run start:backend` - Start the backend server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build locally

## API Documentation

### Endpoints

- `GET /api/analytics/overview` - Get dashboard overview statistics
- `GET /api/analytics/conversion` - Get conversion rate data
- `GET /api/analytics/lead-quality` - Get lead quality distribution
- `GET /api/campaigns/top` - Get top performing campaigns

### WebSocket Events

- `new-lead` - Emitted when a new lead is captured
- `campaign-update` - Emitted when campaign metrics update

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Acknowledgments

- [React](https://reactjs.org/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.io](https://socket.io/)
