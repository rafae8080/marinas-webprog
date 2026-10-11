# E-Telly — Web Dashboard & API

Web dashboard and backend for **E-Telly**, a disaster preparedness and communication system for Antipolo City, Rizal.
Barangay officials and admins use it to watch hazards, receive resident reports in real time, and send alerts.
The same API serves the [E-Telly mobile app](TODO(rafael): link to E-Telly-mobile).

> Capstone project, National University Manila. Team of 5 (see [Team](#team)).

## Screenshots

TODO(rafael): add screenshots (dashboard, live report feed, multi-hazard map, alerts, community sharing).

## Features

- **Multi-hazard map:** flood, landslide, typhoon, earthquake, evacuation-center, resident-report and risk-prediction layers on Leaflet
- **Live reports:** resident reports and request updates pushed to the dashboard over Socket.IO
- **Automated alerts:** server jobs check external hazard feeds and raise flood, landslide, typhoon and earthquake alerts
- **Per-barangay risk model:** a small, auditable L2-regularized logistic regression, trained on historical situational reports (2020–2025) and weather snapshots. No external ML service. See `AI_HAZARD_PREDICTION.md` and `HISTORICAL_DATA_PIPELINE.md`
- **Roles:** admin, barangay official and resident accounts, user management, forced password change for new accounts
- **Works offline:** installable PWA with offline fallback and cached data, plus a "barangay hall" mode that runs the whole system on a local laptop during outages and syncs to the cloud afterwards (`barangay-setup/`)
- **Notifications:** web push and Firebase Cloud Messaging
- **Community sharing:** residents post resource requests and donations; officials track them
- **Hardening:** rate-limited login and public report endpoints

## Tech stack

| Part     | Tech                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| Client   | React 19, Vite, React Router, Leaflet / react-leaflet, Recharts, Tailwind CSS, socket.io-client   |
| Server   | Node.js, Express 5, Mongoose 9 (MongoDB), Socket.IO, JWT, bcryptjs, node-cron, express-rate-limit |
| Services | Cloudinary (report images), Firebase Admin (FCM), web-push                                        |

## Run locally

Requirements: Node.js 22 (`engines` in `package.json`), a MongoDB database (Atlas free tier works).

```bash
# server
cd server
npm install
# create server/.env (see below)
npm run dev

# client (second terminal)
cd client
npm install
# create client/.env with VITE_API_BASE=http://localhost:5000
npm run dev
```

`server/.env` variables used by the code: `MONGO_URI`, `JWT_SECRET`, `PORT`, `SERVER_BASE_URL`,
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `FIREBASE_SERVICE_ACCOUNT_JSON`,
`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_MAILTO`, and for local/barangay mode `LOCAL_MODE`, `LOCAL_MONGO_URI`,
`BARANGAY_NAME`, `CLOUD_SYNC_URL`, `SYNC_SECRET`. TODO(rafael): add a `server/.env.example`.

Create the first admin: `node server/scripts/createAdmin.js` (TODO(rafael): make it read the email/password from arguments instead of hard-coded values).

## Live demo

TODO(rafael): working URL (etelly-mern.vercel.app currently returns 404).

## My role

I (Rafael Marinas) built the web app and backend: the database design, the live disaster reporting module, the
multi-hazard map with resident reports, the alert services and the API used by the mobile app.
i also do the frontend of web

## Team

TODO(rafael): names and roles of the 5 team members (and confirm they agree to be listed).
