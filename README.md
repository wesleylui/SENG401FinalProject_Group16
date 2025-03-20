# SENG401FinalProject Group 16

## Getting Started

### Install Packages

```bash
npm install
```

### Setup Environment
Add required environment variables.
Get a gemini API key [here](https://aistudio.google.com/prompts/new_chat)
```bash;
DATABASE_URL="mysql://root:goSaShAHwUcqmjnRBBGTjgoCeKQGNbTt@hopper.proxy.rlwy.net:55825/railway"
PORT=5050

# Add your MySQL password here
DB_PASSWORD=""

# When running locally, add your gemini api key here
GEMINI_API=""
GEMINI_MODEL="gemini-2.0-flash"
```

### Start the Application Locally

run the application
```bash
npm start
```

run the frontend only
```bash
cd frontend
npm run dev
```

run the backend only
```bash
cd backend
node server.js
```


Open [http://localhost:5173](http://localhost:5173) (Vite default) with your browser to see the result.
