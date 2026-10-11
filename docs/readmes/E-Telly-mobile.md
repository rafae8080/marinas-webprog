# E-Telly — Mobile App

Flutter app for residents, part of **E-Telly**, a disaster preparedness and communication system for Antipolo City, Rizal.
Residents send emergency reports (even without internet, by relaying them phone-to-phone), get alerts, and navigate to
evacuation centers on routes that avoid reported hazards. The backend and dashboard live in
[etelly-mern](TODO(rafael): link or "private repo").

> Capstone project, National University Manila. Team of 5 (see [Team](#team)).
> The latest code is on the `mapbox` branch. TODO(rafael): make `mapbox` the default branch, or merge it.

## Screenshots

TODO(rafael): add screenshots (home, report emergency, P2P relay, evacuation navigation, community board).

## Features

- **P2P report relay:** when there's no internet, reports hop between nearby phones (Google Nearby Connections,
  `P2P_CLUSTER`) until one reaches the barangay server. See `P2P_MESH_REDESIGN.md`
- **Hazard-aware evacuation navigation:** turn-by-turn navigation (Mapbox) to evacuation centers. Streets near critical
  hazards are blocked and nearby hazards trigger warnings. See `HAZARD_AWARE_EVACUATION.md`
- **Local or cloud backend:** on a barangay `ETelly-*` Wi-Fi the app talks to the local server, otherwise to the cloud API
- **Accounts:** Firebase Authentication with email verification and Google Sign-In. See `FIREBASE_AUTH_GUIDE.md`
- **Offline reports:** reports are saved on the device (Hive) and sent when a connection is back
- **Community board:** resource requests, pledges, and real-time request chat (Socket.IO)
- **Alerts and safety content:** push notifications (FCM), safety tips and videos

## Tech stack

Flutter / Dart · Mapbox Navigation (vendored plugin in `packages/flutter_mapbox_navigation`) · nearby_connections ·
Firebase Auth & Cloud Messaging · Hive · socket_io_client · flutter_map · geolocator

## Run locally

Requirements: Flutter SDK, an Android device (P2P needs real devices), a Mapbox account and a Firebase project.

```bash
flutter pub get
# create .env in the project root (loaded in lib/main.dart). TODO(rafael): list the keys and add a .env.example
flutter run
```

TODO(rafael): describe the Mapbox token setup (`MAPBOX_DOWNLOADS_TOKEN` for the Android build, and the access token,
which should come from config rather than `AndroidManifest.xml`).

## My role

I (Rafael Marinas) the P2P relay, and the Firebase Auth sign-in / sign-up, and
connected the app to the backend.

## Team

TODO(rafael): names and roles of the 5 team members (and confirm they agree to be listed).
