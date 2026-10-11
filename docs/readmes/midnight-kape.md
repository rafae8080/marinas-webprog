# The Midnight Kape — Sales & Management

A point-of-sale and management web app for a café. Cashiers ring up orders and look up transactions. Admins also
manage staff accounts and review an audit log.

**Live:** https://midnight-cafe-two.vercel.app
TODO(rafael): confirm whether this is a real client and that you may show its name.

## Screenshots

TODO(rafael): add screenshots of the sales screen, checkout/receipt, transactions and admin users / audit logs.

## Features

- **Sales (POS):** drink options, cart, checkout and receipt
- **Transactions:** paged history
- **Admin:** create users, reset passwords, deactivate accounts, audit log of actions. No public sign-up
- **Security:**
  - bcrypt password hashing
  - httpOnly, SameSite=Strict session cookie (8 h)
  - account lockout for 15 minutes after 5 wrong passwords, plus per-device rate limiting
  - forced password change on first sign-in
  - prices and totals always recalculated on the server
  - input validation with zod

## Tech stack

| Part | Tech |
|---|---|
| Web | React 19, Vite, React Router, lucide-react |
| API | Node.js, Express 5, Mongoose 9 (MongoDB Atlas), zod, JWT, helmet, express-rate-limit |
| Hosting | Vercel (`api/index.js`, `vercel.json`) |

## Run locally

```bash
cd server && copy .env.example .env   # fill in MONGODB_URI and JWT_SECRET
cd .. && npm install && npm run seed  # prints the first admin login
npm run dev:server                    # API on http://localhost:5000
npm run dev:web                       # web app
```

Deployment steps: [`DEPLOY.md`](DEPLOY.md).

## My role

Solo project by Rafael Marinas: design, front end, API and deployment.
