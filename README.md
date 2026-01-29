Pastebin Lite:
Pastebin-Lite is a web application that allows users to create text pastes and receive shareable URLs. It supports optional constraints including time-based expiry (TTL) and view-count limits; once a constraint is triggered, the paste becomes unavailable and returns a 404 error

Persistence Layer:
This project uses MongoDB as the persistence layer to ensure data survives across requests in a serverless environment. It stores the paste content, expiration timestamps, and the remaining view counts.

How to Run Locally:
1.Backend
Navigate to the Backend directory: cd Backend
Install dependencies: npm install
Create a .env file with your MONGO_URI.
Start the server: npm start
The API will be available at http://localhost:4500.
2. Frontend
Navigate to the Frontend directory: cd Frontend
Install dependencies: npm install
Start the application: npm start
The UI will be available at http://localhost:3000.


Required Routes
Health Check
GET /api/healthz: Returns a 200 OK status and JSON to verify the app and database are reachable.
Paste Management
POST /api/pastes: Creates a new paste.
Body: Includes content (required), ttl_seconds (optional), and max_views (optional).
Response: Returns a unique id and the shareable url.
GET /api/pastes/:id: Fetches paste metadata and content in JSON format. This action decrements the view count.
GET /p/:id: Returns the

How It Works

Paste Creation: Users submit arbitrary text along with optional ttl_seconds and max_views. The system generates a unique ID and a shareable URL.
Availability Logic: On every request, the application checks if the paste has expired based on the current time or if the view limit has been reached.
Safe Rendering: When viewing a paste via the HTML route (/p/:id), content is rendered safely to prevent any script execution (XSS protection).
Deterministic Testing: If TEST_MODE=1 is enabled, the backend prioritizes the x-test-now-ms request header as the "current time" to allow for precise automated expiry testing.
