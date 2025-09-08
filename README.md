## Affordmed URL Shortener Project

This project is a full-stack URL shortener application with logging middleware for both backend and frontend.

### Structure

- **backend-test-submission/**: Go backend service for creating, redirecting, and tracking short URLs.
- **frontend-test-submission/**: React frontend for users to shorten URLs and view stats.
- **logging-middleware/**: Shared logging clients for backend (Go) and frontend (JS).

### Features

- Shorten any URL with a custom expiry time
- Redirect to original URLs using short codes
- View stats for all shortened URLs
- Centralized logging for important actions (short URL creation, etc.)

### How to Run

1. **Backend**

   - Go to `backend-test-submission/`
   - Run: `go run main.go`

2. **Frontend**

   - Go to `frontend-test-submission/`
   - Run: `npm install && npm run dev`
   - Open [http://localhost:5173](http://localhost:5173) in your browser

3. **Logging**
   - Logging is automatic for short URL creation in both backend and frontend.
   - Configure your log access token in environment variables as needed.

---
