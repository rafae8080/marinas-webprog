# Rafael Marinas — Portfolio

My personal portfolio site and admin dashboard, built with the MERN stack.

**Live:** https://marinas-client.vercel.app TODO(rafael): update after the Phase 14 launch.

## Screenshots

TODO(rafael): add screenshots after the redesign (home, work, case study, dashboard).

## Features

TODO(rafael): fill in after the rebuild is done. Planned in `PORTFOLIO_PLAN.md`: project case studies, Field Notes
articles, contact form, FAQ chatbot (no AI), admin dashboard.

Current:
- Landing pages (home, about) and an articles section
- Admin sign-in with JWT; admin-only user management and article creation
- Security: auth middleware, login rate limiting, helmet, CORS allowlist

## Tech stack

| Part | Tech |
|---|---|
| Client | React 19, Vite 7, Tailwind CSS v4, React Router 7, MUI (dashboard), Leaflet |
| Server | Express 5, Mongoose 9, JWT, bcryptjs, helmet, express-rate-limit |
| Hosting | Vercel (client + serverless API) |

## Run locally

```bash
# server
cd marinas-server
npm install
copy .env.example .env    # fill in MONGO_URI and JWT_SECRET
npm run create-admin -- <email> <username> <password> <firstName> <lastName>
npm run dev

# client (second terminal)
cd marinas-client
npm install
# .env: VITE_API_URL=http://localhost:<server port>/api
npm run dev
```

## My role

Solo project by Rafael Marinas.
