Chat Application
WhatsApp-Style Tagging & Dynamic Autocomplete

This project is a full-stack assessment for DataStride.
It includes a complete chat application with:

WhatsApp-style tagging using @

Dynamic autocomplete suggestions from backend

Next.js frontend with Redux Toolkit

Node.js + Express backend with in-memory data

🚀 How to Run the Project

Follow these steps to run both backend and frontend locally.

1️⃣ Clone the Repository

git clone https://github.com/Sneha-c-c/Chat-Application.git

cd Chat-Application

2️⃣ Start the Backend (Node.js + Express)

Open Terminal 1:

cd backend
npm install
npm run dev

Backend runs on:
http://localhost:5000

3️⃣ Start the Frontend (Next.js)

Open Terminal 2:

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:3000

4️⃣ Open the Application

Open your browser and go to:
http://localhost:3000

Frontend communicates with backend at:

http://localhost:5000/api/tags

http://localhost:5000/api/messages

🧱 Tech Stack
Frontend

Next.js

React

Redux Toolkit

CSS Modules / global CSS

Backend

Node.js

Express

CORS

Nodemon (dev mode)

Frontend detects trigger

User types characters → frontend calls
/api/tags?query=text

Backend filters tags dynamically

User selects tag → inserted as pill element

Backspace removes entire tag

Sending message posts data to backend

🧪 API Endpoints

GET /api/tags
GET /api/tags?query=abc
POST /api/tags
GET /api/messages
POST /api/messages
