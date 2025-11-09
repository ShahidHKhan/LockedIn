# LockedIn — Focused Study Companion

![LockedIn](/assets/LockedIn.png)

Demo: https://locked-2vbnpd0an-shahidhkhans-projects.vercel.app/home https://lockedin-1m1h.onrender.com

Members: Shahid Khan, Cedric Petilos, Christian Copeland 

LockedIn is a lightweight study companion built for focused study sessions. It helps users plan study blocks, log sessions, and get AI-powered feedback on short notes. Built during a hackathon, LockedIn combines a polished React front-end with a small agent-powered backend to provide instant feedback and study suggestions.

#Why we chose this project?
One of the growing challenges students face as technology advances is a decreasing attention span, especially when it comes to traditional studying methods. To tackle this issue in a fun and effective way, we developed an application based on the Pomodoro Technique. Students can select subjects of their choice, set a desired study duration, and let the application handle the rest. Our goal is to help students “lock in” for their exams in a humorous yet functional way. Additionally, since one of the best ways to retain information is through teaching, students can use their break periods to explain, or ask, what they’ve learned so far to the built-in AI Agent for feedback and clarification in their understanding.


# Key Functionalities
- Study Session logged for future references
- Session timer, subject selection, and AI "Teach Me" tool
- User authentication/login flow


![Project Diagram](/assets/ProjectDiagram.png)

![Data Flow](/assets/DataFlow.png)


# Demo
You can run the app locally to see the full experience: login → transition scene → main timer → teach-me (AI feedback).

Getting started (dev)
1. Clone the repo

```bash
git clone https://github.com/ShahidHKhan/LockedIn.git
cd LockedIn
```

2. Install dependencies

```bash
# from the root (if you use a single package manager like npm)
npm install
npm --prefix client install
npm --prefix server install
```

3. Start the backend (dev)

This project contains two lightweight server entry points under `server/src/`.
- To run the API that the client expects by default (`POST /ask`):

```bash
npm --prefix server run api
```

- Alternatively, if you use the other server entry, run:

```bash
npm --prefix server run dev
```

4. Start the frontend

```bash
npm --prefix client run dev
```

The Vite dev server proxies `/ask` to `http://localhost:5000` by default. If you deploy the backend separately, set `VITE_API_URL` to your API base URL.

Environment variables
- `VITE_API_URL` (optional) — base URL for the AI API, e.g. `https://your-api-host/ask`
- The server uses environment variables for provider credentials (LangChain/Google) — add them to `.env` in the `server/` directory when required.

Production build

Build the client and then deploy the server as you normally would:

```bash
npm --prefix client run build
npm --prefix server run start
```

Architecture
- client/ — React + Vite web app
- server/ — lightweight Express API exposing `/ask` (LangChain agent)
- Primary datastore - firebase/firebase cloudstore 


# Good luck and get LockedIn!