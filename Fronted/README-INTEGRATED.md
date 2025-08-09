# Integrated E-commerce Application

This project combines both the frontend (React + Vite) and backend (JSON Server) into a single deployable package.

## Project Structure

```
Fronted/
├── backend/
│   └── api.json          # Backend data (users, orders)
├── src/                  # Frontend React components
├── public/              # Static assets
├── package.json         # Combined dependencies and scripts
└── README-INTEGRATED.md # This file
```

## Available Scripts

- `npm run dev` - Start only the frontend development server
- `npm run backend` - Start only the backend JSON server (port 3001)
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm start` - Alias for `npm run dev:full`
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the full application (frontend + backend):
   ```bash
   npm start
   ```

3. Open your browser:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

The backend provides the following endpoints:
- `GET/POST /users` - User management
- `GET/POST /orders` - Order management

## Deployment

For deployment, you can:
1. Build the frontend: `npm run build`
2. Deploy the `dist/` folder to any static hosting service
3. For the backend, deploy the `backend/` folder to a service that supports JSON Server

## Notes

- The backend runs on port 3001 to avoid conflicts with the frontend
- Both frontend and backend can be developed simultaneously
- The API data is stored in `backend/api.json`
