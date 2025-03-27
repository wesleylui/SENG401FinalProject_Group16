# SENG401FinalProject Group 16

## Getting Started

### Install Packages

```bash
npm install
```

### Setup Environment
To run this program locally, you'll need to add the required environment variables.
Get a gemini API key [here](https://aistudio.google.com/prompts/new_chat)
```bash;
# gemini api
GEMINI_API="" # insert your API key here
GEMINI_MODEL="gemini-2.0-flash"

# local database hosting
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD="" # enter your mysql password here
MYSQLDATABASE=story_gen
PORT=5050

ENV=local

DATABASE_URL=mysql://root:ziZqdUyLxeiqsDKgfQcpGJdXPpLYheGo@mysql.railway.internal:3306/railway
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
