# GitHub Project Audit

Audit of every non-fork repo under `github.com/rafae8080`, done 2026-10-11 for the portfolio rebuild (Phase 1).
Repos were shallow-cloned outside this project and read only. No code was run.

- **Skipped (fork):** `marinas-webprog-longexam`
- **Tier** is a suggestion: **Featured** (case study), **Listed** (card on /work), **Hidden**. Rafael edits the Tier column.
- **Evidence:** every feature below names the file it was found in. Paths are relative to that repo's root and default branch unless a branch is named.
- "Year" is the range of commit dates on GitHub. "Solo/team" comes from the GitHub contributor list and commit authors.

> ⚠️ **Security first:** two **public** repos contain live credentials. See [Sensitive content summary](#sensitive-content-summary).
> Rotate them before linking GitHub from the portfolio.

## Summary

| Repo | What | Stack | Year | Tier | Notes |
|---|---|---|---|---|---|
| `etelly-mern` (private) | E-Telly web dashboard + API: multi-hazard map, live reports, alerts, risk model | React 19, Vite, Leaflet, Express 5, MongoDB/Mongoose, Socket.IO | 2026 | **Featured** | Core of the E-Telly case study. 92 of 97 commits by rafae8080. Homepage URL returns 404 |
| `E-Telly-mobile` (public) | E-Telly Flutter app: P2P report relay, hazard-aware evacuation navigation, Firebase Auth | Flutter/Dart, Mapbox, Nearby Connections, Firebase | 2026 | **Featured** (with E-Telly) | Rafael's work is on branch `mapbox`, not the default `dev-kristine`. ⚠️ MongoDB credentials committed |
| `StayNest` (public) | Airbnb-style booking desktop app with Guest/Host/Admin roles and MySQL→Access backup | VB.NET, .NET 10 WinForms, MySQL, MS Access (OleDb) | 2026 | **Featured** | Best documentation of all repos (`docs/`), 10 UI screenshots. No root README |
| `Apartment` (public) | Lease / apartment management web app for a landlord | PHP, Microsoft SQL Server (`sqlsrv`) | 2025 | **Featured** | Matches the "apartment management system" on the resume. Needs cleanup and client permission. `master` branch is a separate history holding a full XAMPP htdocs folder |
| `midnight-kape` (private) | POS / sales & management web app for a café | React 19 (Vite), Express 5, MongoDB, zod, JWT cookie | 2026 | **Listed** | Live at midnight-cafe-two.vercel.app (200). Strong security practices. Featured candidate if it's a client project and permission is given |
| `marinas_advmobprogAY2627` (public) | E-commerce Flutter app with Firebase Auth, Firestore chat, cart | Flutter, Firebase Auth, Cloud Firestore, Provider, DummyJSON API | 2026 | **Listed** | Resume's "E-commerce app (catalog, cart, checkout)". Coursework (lab activities) |
| `marinas_mobprog` (private) | "Facebook Replication" Flutter UI: feed, posts, profile, notifications | Flutter | 2026 | **Listed** | Resume's "Facebook-style clone". UI only, no backend in code |
| `marinas_longexam1` (public) | NU Bulldogs Exchange merch shop UI | Flutter | 2026 | **Listed** | Probably "Bulldogs Exchange" from the About page. No backend in code, so the MongoDB Atlas claim in the article isn't supported |
| `marinas-webprog` (public) | This portfolio (MERN) | React 19, Vite 7, Tailwind v4, MUI, Express 5, MongoDB | 2026 | **Listed** | Being rebuilt. Homepage URL in repo settings returns 404; marinas-client.vercel.app returns 200 |
| `StudentMS` (public) | Student records CRUD web app | ASP.NET Core MVC (.NET 10), EF Core, SQL Server | 2026 | **Listed** | Single commit. `bin/`, `obj/` and `publish/` are committed (589+ build files) |
| `UMS` (public) | User Management System with Admin / Barangay Official roles | PHP (PDO), MySQL, vanilla JS | 2026 | **Listed** | Team: rafae8080 + kaia-cmd. Looks like an early E-Telly admin module (`assets/logtell1.png`) |
| `FitQueue` (private) | Workout exercise queue desktop app | Java Swing (NetBeans) | 2024 | **Listed** | Probably the "Gym Exercise Queue System". Code doesn't match the About-page description |
| `etelly` (public) | Early E-Telly admin dashboard prototype | Next.js 16, TypeScript, Supabase Auth, Tailwind | 2026 | **Hidden** | Superseded by `etelly-mern` |
| `E-Telly` (public) | Early E-Telly Flutter app | Flutter, google_maps_flutter | 2026 | **Hidden** | All 4 commits by kaia-cmd, so this isn't Rafael's code |
| `LeaseManagement` (public) | — | — | 2025 | **Hidden** | Empty repo (no commits) |
| `hospital` (private) | — | — | 2024 | **Hidden** | Empty repo (no commits) |

---

## etelly-mern

- **What:** Web dashboard and REST/Socket.IO API for E-Telly, a disaster preparedness system for Antipolo City, Rizal (`server/config/barangays.js:1`).
- **Stack:** React 19 + Vite + Leaflet + Recharts + socket.io-client (`client/package.json`). Express 5, Mongoose 9, Socket.IO, firebase-admin, web-push, node-cron, Cloudinary, multer, express-rate-limit (`server/package.json`).
- **Type / year / team:** web, 2026-03-15 → 2026-08-07. Contributors: rafae8080 (92 commits), krisomniac (5).
- **Features in code:**
  - Multi-hazard map page with flood, landslide, typhoon, earthquake, evacuation-center, resident-report and AI-prediction layers (`client/src/pages/HazardMapPage.jsx`, `client/src/components/map/*/`)
  - Live updates over Socket.IO with user, admin and request rooms (`server/index.js:101-117`, `client/src/utils/socket.js`)
  - Automated alerts from external hazard feeds (`server/services/floodAlerts.js`, `landslideAlerts.js`, `typhoonAlerts.js`, `earthquakeAlerts.js`, `gdacsAlerts.js`, `server/scripts/alertEngine.js`)
  - Hand-written L2-regularized logistic regression risk model, per barangay (`server/services/logisticRegression.js`, `predictionEngine.js`, `server/scripts/trainRiskModel.js`, `AI_HAZARD_PREDICTION.md`)
  - Historical dataset 2020–2025 imported to train the model; the doc says 399 raw rows (`server/data/Capstone_Antipolo-Dataset.xlsx`, `server/scripts/importHistoricalReports.js`, `HISTORICAL_DATA_PIPELINE.md`)
  - Roles admin / user / barangay_official (`server/models/user.js:8-10`), user management and forced password change (`client/src/pages/ManageUsersPage.jsx`, `client/src/pages/ChangePasswordPage.jsx`)
  - Rate limiting on login and public report posts (`server/index.js:81-83`)
  - PWA with offline fallback, offline cache and queued alerts (`client/src/sw.js`, `client/public/offline.html`, `client/src/hooks/useOfflineCache.js`, `useOfflineAlertQueue.js`)
  - Web push + FCM notifications (`server/routes/push.js`, `server/services/fcm.js`, `client/src/hooks/usePushNotifications.js`)
  - Community resource requests / donations (`client/src/pages/CommunitySharingPage.jsx`, `server/routes/community.js`, `server/models/ResourceRequest.js`)
  - Offline "barangay hall" mode on a local laptop, with sync to cloud (`barangay-setup/README.md`, `barangay-setup/*.bat`, `server/scripts/syncToCloud.js`, `server/routes/sync.js`)
  - Report image upload to Cloudinary, or local storage in local mode (`server/routes/uploadImages.js`)
- **Demo / screenshots:** homepage `https://etelly-mern.vercel.app` returned **404** on 2026-10-11. `Procfile` (`web: node server/index.js`) and a commit "proxy /api to Render" point to a separate API host. No screenshots in repo.
- **README:** `README.md` is the default Vite template. Needs a real one (draft in `docs/readmes/etelly-mern.md`).
- **Branches:** `master` is the newest. `development` ("E-TELLY Final Build…", 2026-05-07) has 1 commit that's not on master.
- **Sensitive:**
  - `client/.env.production` is committed. It only holds an API base URL and a VAPID **public** key, so risk is low, but stop tracking it.
  - `server/scripts/createAdmin.js` hard-codes a default admin email/password and prints them. Read them from args/env instead.
  - `server/data/Capstone_Antipolo-Dataset.xlsx` holds situational reports with locations. Confirm it contains no personal data before making the repo public.

## E-Telly-mobile

- **What:** Resident mobile app for E-Telly: emergency reporting, alerts, evacuation, community requests.
- **Stack (branch `mapbox`):** Flutter; flutter_mapbox_navigation (vendored fork in `packages/flutter_mapbox_navigation`), nearby_connections, Firebase Auth/Messaging, Hive, socket_io_client, flutter_map (`pubspec.yaml`).
- **Type / year / team:** mobile, 2026-03-28 → 2026-06-02. Default branch `dev-kristine` has commits by mynameisjungkook197-ui and krisomniac only. Branch `mapbox` (2026-05-30 → 06-02) has rafae8080's commits: "p2p…", "evac navigation", "mapbox fix", "sign in sign up", "production ready".
- **Features in code (branch `mapbox`):**
  - P2P report relay over Nearby Connections, `Strategy.P2P_CLUSTER`, with an auto-relay controller and queue (`lib/services/p2p_relay_service.dart:77`, `p2p_auto_relay_controller.dart`, `relay_queue_manager.dart`, `lib/screens/p2p_relay_screen.dart`, `P2P_MESH_REDESIGN.md`)
  - Hazard-aware evacuation routing: critical hazards near a route block that street, others only warn (`lib/services/hazard_routing_service.dart:28-56`, `lib/services/navigation_service.dart`, `HAZARD_AWARE_EVACUATION.md`)
  - Endpoint resolver: uses the barangay's local server when on an `ETelly-*` Wi-Fi, otherwise the cloud API (`lib/services/endpoint_resolver.dart`)
  - Firebase Auth with Google Sign-In and email verification (`lib/services/auth_service.dart`, `google_auth_service.dart`, `lib/screens/email_verification_screen.dart`, `FIREBASE_AUTH_GUIDE.md`)
  - Offline report storage (`lib/services/offline_report_storage.dart`, `hive_service.dart`)
  - Community board, requests, pledges and request chat. **Chat runs over Socket.IO through the server, not the P2P mesh** (`lib/screens/request_chat_screen.dart:3,74`, `community_board_screen.dart`, `COMMUNITY_SHARING_SPEC.md`)
  - Safety videos (`assets/videos/Earthquake.mp4`, `Firstaid.mp4`, `Flood.mp4`)
- **Demo / screenshots:** no APK or release found. The only screenshots belong to the vendored Mapbox plugin (`packages/flutter_mapbox_navigation/screenshots/`).
- **README:** default Flutter template.
- **Sensitive (public repo):**
  - 🔴 **MongoDB Atlas connection string with username + password:** `lib/dbhelper/constant.dart` (branches `dev-kristine`, `rafael`; the file also has the user/password in comments) and `server.js:22` (branch `mapbox`). **Rotate the database user's password in Atlas now** and move the URI to an env var.
  - 🟠 Mapbox access token in `android/app/src/main/AndroidManifest.xml:51` (public `pk.` token; restrict it to the app in the Mapbox dashboard).
  - 🟠 Firebase config: `google-services.json`, `android/app/google-services.json`, `lib/firebase_options.dart`. Normal for Firebase, but restrict the API keys in Google Cloud Console and check the Firestore/Storage rules.
  - 🟡 `android/hs_err_pid28116.log`: JVM crash log with local env vars (PATH, USERNAME). Delete it and add `hs_err_pid*.log` to `.gitignore`.
  - Phone numbers in `COMMUNITY_SHARING_SPEC.md` and `request_detail_screen.dart` are sample values (`0917123…`). OK.

## StayNest

- **What:** Airbnb-style booking desktop app where Guests book, Hosts list and Admins approve (`docs/FEATURES.md`).
- **Stack:** VB.NET on .NET 10 (`net10.0-windows`), WinForms + console admin tool, MySql.Data, System.Data.OleDb (`AirbnbSystem.Core/AirbnbSystem.Core.vbproj`, `AirbnbSystem.WinForms/AirbnbSystem.WinForms.vbproj`).
- **Type / year / team:** desktop, 2026-10-04 (22 commits, all rafae8080). Matches the resume's "Airbnb-style booking system (VB.NET, in progress)".
- **Features in code:**
  - Layered solution: Core (`AirbnbSystem.Core/Data/*Repository.vb`, `AirbnbSystem.Core/Services/*.vb`, `AirbnbSystem.Core/Validation/*.vb`), WinForms UI (`AirbnbSystem.WinForms/Pages/*.vb`), Console admin (`AirbnbSystem.Console/AdminMenu.vb`)
  - Guest browse/search, book, pay (Cash/GCash/Card recorded, no real payment), cancel, review (`docs/FEATURES.md`, `AirbnbSystem.Core/Services/BookingService.vb`, `AirbnbSystem.Core/Validation/BookingValidator.vb`)
  - Host dashboard, listings with photos, accept/decline bookings, earnings chart + CSV export (`AirbnbSystem.WinForms/Pages/HostEarningsPage.vb`, `AirbnbSystem.WinForms/EarningsChart.vb`, `AirbnbSystem.WinForms/CsvExport.vb`)
  - Admin listing approvals, users, reports (`AirbnbSystem.WinForms/Pages/ListingApprovalsPage.vb`, `AirbnbSystem.WinForms/Pages/UsersPage.vb`, `AirbnbSystem.Core/Services/ReportService.vb`)
  - MySQL primary with automatic MS Access backup mode and sync (`AirbnbSystem.Core/Services/SyncService.vb`, `AirbnbSystem.Core/Data/DbConnectionManager.vb`, `AirbnbSystem.WinForms/BackupBanner.vb`, `database/airbnb_backup.accdb`)
  - PBKDF2-SHA256 password hashing (`AirbnbSystem.Core/Security/PasswordHasher.vb:7`)
- **Demo / screenshots:** 10 UI screenshots in `docs/ui/` (Login, Register, Guest browse/details/bookings/payment, Host dashboard/add listing, Admin dashboard/sync). Desktop app, so no live demo.
- **Docs:** `docs/SETUP.md`, `docs/BUILD_GUIDE.md`, `docs/design.md`, `docs/CHALLENGES.md`, `docs/CODE_SNIPPETS.md`. No root `README.md`. `CLAUDE.md` is committed; remove it if you don't want AI-tool files in the public repo.
- **Sensitive:**
  - `database/airbnb_db.sql:140-145` seeds sample users (fictional names, `example.com`/`staynest.ph` emails, sample phones `0917123…`), and `docs/SETUP.md:193` documents their shared password. Fine for a demo, but say clearly that these are demo accounts.
  - `docs/Images/unit*.jpg` are listing photos. **Confirm they aren't photos of the real family rental units** (see questions).

## Apartment

- **What:** Landlord-facing apartment / lease management web app: apartments, units, leases, payments, transaction history.
- **Stack:** PHP with Microsoft SQL Server via `sqlsrv_*` (`loginConfig.php`, `add_apartment.php:4`), plain CSS/JS (`css/`, `javascript/`).
- **Type / year / team:** web, 2025-05-22 → 2025-06-10. 13 commits: 2 linked to GitHub user **maverivk**, 11 with no linked account and placeholder messages ("Your descriptive commit message"). Solo vs team is unclear (see questions).
- **Features in code:**
  - Landlord login / register with `password_hash` (`login.php:104-109`, `login_register.php:8,42`), session handling (`session_init.php`, `logout.php`)
  - Dashboard of available apartments, add apartment with image upload (`index.php:114`, `add_apartment.php`, `images/`)
  - Units per apartment (`units.php`, `units_action.php`, `javascript/unitInfo.js`)
  - Create lease, lease overview with tenant names (`form.php:130`, `lease.php:65-149`)
  - Submit payment, transaction history (`submit_payment.php`, `lease.php:170`, `transaction.php:73`)
- **Demo / screenshots:** none. SQL Server isn't free to host, so a live demo needs a port or a recorded video.
- **README:** none.
- **Branches:** `main` (default) holds the app. `master` is an **unrelated history** holding a whole XAMPP `htdocs` folder (`dashboard/`, `xampp/`, `webalizer/`) plus older copies of the app in `LM/` and `apartment/`. Delete `master` or turn it into a clean archive.
- **Sensitive:**
  - `loginConfig.php` contains the machine name of the SQL Server host (no password). Move it to config.
  - `images/*.jfif` are uploaded property photos. **Confirm they aren't the real rental property** before keeping the repo public.
  - Tenant data: no database dump is committed. Keep it that way.

## midnight-kape

- **What:** "The Midnight Kape: Sales & Management", a café POS with sales, transactions, user admin and audit logs (`README.md`).
- **Stack:** React 19 + Vite + react-router + lucide-react (`MidnightCafe/package.json`). Express 5, Mongoose 9, zod, helmet, express-rate-limit, cookie-parser, JWT (`server/package.json`). Deployed on Vercel (`vercel.json`, `api/index.js`, `DEPLOY.md`).
- **Type / year / team:** web, 2026-09-26 → 09-27, 4 commits, solo.
- **Features in code:**
  - POS with drink modal, cart, checkout and receipt (`MidnightCafe/src/pages/sales/Sales.jsx`, `DrinkModal.jsx`, `CheckoutModal.jsx`, `ReceiptModal.jsx`, `cart.js`)
  - Transactions history with paging (`MidnightCafe/src/pages/Transactions.jsx`, `src/lib/usePagedQuery.js`, `server/src/routes/transactions.js`)
  - Admin users + audit logs (`MidnightCafe/src/pages/admin/Users.jsx`, `AuditLogs.jsx`, `server/src/lib/audit.js`, `server/src/models/AuditLog.js`)
  - Security: httpOnly SameSite=Strict cookie session, lockout after 5 wrong passwords, server-side price recalculation, forced password change (`README.md` "Security notes", `server/src/routes/auth.js`, `server/src/middleware/auth.js`, `server/src/lib/passwords.js`)
- **Demo:** `https://midnight-cafe-two.vercel.app` returned **200**. Screenshots: none.
- **Sensitive:** `server/.env.example` and `DEPLOY.md` only use placeholders. `server/src/Environment` is an empty committed file (remove it). `.claude/skills/midnight-ui/SKILL.md` is committed; remove it if you don't want AI-tool files in the repo. Confirm whether "The Midnight Kape" is a real business, and get permission to show it.

## marinas_advmobprogAY2627

- **What:** "E-Commerce App" (`marinas_advmobprog/lib/main.dart:69`) with product catalog, cart, profile, settings and 1-to-1 chat.
- **Stack:** Flutter; firebase_auth, cloud_firestore, provider, http, flutter_dotenv (`marinas_advmobprog/pubspec.yaml`). Products come from DummyJSON (`lib/services/product_service.dart:8`, `assets/.env` HOST).
- **Type / year / team:** mobile, 2026-08-15 → 09-30, 7 commits, solo. Coursework (branches `lab_act3`, `lab_act4`, `production`).
- **Features in code:** cart with discount logic + unit test (`lib/providers/cart_provider.dart`, `test/cart_logic_test.dart`). Firestore chat rooms (`lib/services/chat_service.dart:41-57`). Firestore security rules limit profile writes to the owner and chats to members (`firestore.rules`). Theme provider (`lib/providers/theme_provider.dart`). Account update/delete (`lib/screens/profile_screen.dart:90-131`).
- **Demo / screenshots:** none.
- **README:** default Flutter template.
- **Sensitive:** `marinas_advmobprog/assets/.env` is committed (DummyJSON host + an `API_KEY` placeholder not used in `lib/`). Firebase config in `android/app/google-services.json` and `lib/firebase_options.dart`; restrict the keys. Low risk.
- **Note:** the repo checks out under a deep path (`marinas_advmobprog/ios/Runner.xcodeproj/...`, 101 chars). On Windows, clone with `-c core.longpaths=true`.

## marinas_mobprog

- **What:** "Facebook Replication" (`lib/main.dart:11,23`): splash, login/register, news feed, post detail, notifications, profile.
- **Stack:** Flutter; cached_network_image, carousel_slider, flutter_screenutil (`pubspec.yaml`).
- **Type / year / team:** mobile, 2026-01-01 → 07-23, 3 commits, solo.
- **Features in code:** post cards with like button (`lib/widgets/post_card.dart`, `lib/widgets/like_button.dart`), feed (`lib/screens/newsfeed_screen.dart`), form validation (`lib/screens/login_screen.dart:67`). **No backend or auth service in code:** the article "What replicating Facebook taught me about feeds" mentions user authentication and token expiry, which this repo doesn't show.
- **Demo / screenshots:** none. **Sensitive:** none found.

## marinas_longexam1

- **What:** Flutter shop UI for NU merchandise: "NU Bulldogs Exchange, in partnership with SM Surplus Shop…" (`lib/screens/shop_screen.dart:56`). Home, shop, product detail, cart, profile (`lib/screens/`).
- **Stack:** Flutter, flutter_screenutil, local image assets (`pubspec.yaml`, `assets/images/`).
- **Type / year / team:** mobile, 2026-01-04, 1 commit, solo. Exam project (`lib/main.dart:21` title "Marinas Long Exam 1").
- **Note:** probably the "Bulldogs Exchange" listed on the current About page. The article "Building a shopping app in Flutter" says it used MongoDB Atlas, but **no database code exists** in this repo.
- **Demo / screenshots:** none. **Sensitive:** none found. The product photos (`assets/images/NU Dri-fit.jpg` etc.) may be NU/SM-owned images.

## marinas-webprog

- **What:** This portfolio (MERN): landing pages, articles, admin dashboard.
- **Stack:** see `CLAUDE.md` in this repo.
- **Type / year / team:** web, 2026-03-10 → present (26 commits on GitHub, solo). Default branch `deployment`.
- **Demo:** repo homepage `https://marinas-webprog.vercel.app` returned **404**; `https://marinas-client.vercel.app` returned **200**. Update the repo's homepage URL.
- **Sensitive:**
  - `marinas-client/src/assets/data/users.json`, sample users with plaintext passwords, is **still in the repo** on `deployment` and `portfolio-redesign` (Phase 0 couldn't delete it). Phone numbers are sequential samples.
  - `marinas-server/node_modules/` is committed. Stop tracking it.

## StudentMS

- **What:** Student records CRUD (name, grade, email, course) (`Models/Student.cs`, `Controllers/StudentController.cs:19-83`).
- **Stack:** ASP.NET Core MVC on .NET 10, EF Core SQL Server with migrations (`StudentMS.csproj`, `Migrations/20260526132405_InitialCreate.cs`).
- **Type / year / team:** web, 2026-05-26, 1 commit, solo.
- **Features in code:** data-annotation validation (`Models/Student.cs`), full CRUD views (`Views/Student/*.cshtml`).
- **Demo / screenshots:** none.
- **Repo hygiene:** `bin/`, `obj/` and `publish/` (including `StudentMS.exe`) are committed. Add a .NET `.gitignore` and remove them.
- **Sensitive:** connection string uses `Trusted_Connection` with a local server name (`appsettings.json`), so no password. OK.

## UMS

- **What:** User Management System with Admin and Barangay Official roles (`readme`).
- **Stack:** PHP + PDO + MySQL (XAMPP), vanilla JS (`config.php`, `api/`, `js/`).
- **Type / year / team:** web, 2026-02-06 → 02-14. Contributors: rafae8080 (5), kaia-cmd (2). Branch `with-php` is 1 commit behind `main`.
- **Features in code:** session login with `password_verify` + `session_regenerate_id` (`api/login.php:48-62`), user CRUD + password reset API (`api/users/*.php`), prepared statements (`api/login.php:48`).
- **Note:** logo `assets/logtell1.png` and the "Barangay Official" role suggest an early E-Telly module.
- **Sensitive:** `readme` documents the default admin login (`admin@example.com` / a default password), and `database/ums.sql:45` seeds it. Fine for a local demo, but tell people to change it. `config.php` uses the XAMPP default user with an empty password (local only).

## FitQueue

- **What:** Java Swing app to build a list of exercises and step through them one by one (`src/ExerciseQueue.java` uses a `LinkedList` queue, `src/StartWorkoutFrame.java:31-46`).
- **Stack:** Java, Swing, NetBeans Ant project (`build.xml`, `nbproject/`).
- **Type / year / team:** desktop, 2024-11-02 → 11-04, 7 commits with no linked GitHub account (repo owned by rafae8080).
- **Note:** the current About page calls it "a scheduling and queue management tool for gym equipment usage… fair access" (`marinas-client/src/pages/LandingPages/AboutPage.jsx:101-103`). **The code is a personal workout queue, not equipment scheduling.** Fix the description.
- **Demo / screenshots:** none. **Sensitive:** none found.

## etelly

- **What:** Early E-Telly admin dashboard prototype: dashboard, alerts, dam monitoring, evacuation, flood prediction, hazard map, reports, users (`app/(admin)/*/page.tsx`).
- **Stack:** Next.js 16, React 19, TypeScript, Supabase Auth, Tailwind, Recharts (`package.json`, `lib/supabase.ts`).
- **Type / year / team:** web, 2026-01-15 → 03-15, 14 commits, solo.
- **Note:** only Supabase **Auth** is used (`app/login/page.tsx:23`, `app/(admin)/manage-users/page.tsx:234-342`); no table queries were found. Superseded by `etelly-mern`, so it stays Hidden, or gets mentioned in the E-Telly case study as "v1 prototype".
- **Sensitive:** keys are read from env (`lib/supabase.ts:3-4`). `manage-users/page.tsx:342` calls `supabase.auth.admin.deleteUser`, which needs a service-role key in the browser to work. Don't add one.

## E-Telly

- **What:** Early Flutter app for E-Telly ("Mobile component of our capstone project.", repo description): welcome, login/sign-up, dashboard, alerts, evacuation, flood monitoring, report, resources, safety tips (`e_telly_app/lib/screens/`).
- **Stack:** Flutter, google_maps_flutter, geolocator, camera (`e_telly_app/pubspec.yaml`).
- **Type / year / team:** mobile, 2026-02-07 → 02-10. **All 4 commits by kaia-cmd.**
- **Note:** not Rafael's code. Keep it Hidden. `E-Telly-mobile` continues from this code.

## LeaseManagement

Empty repository (no commits, created 2025-05-22). Probably an earlier home for the `Apartment` code (both reference `LeaseManagementDB`, in `Apartment/loginConfig.php`). Delete it or leave it hidden.

## hospital

Empty repository (no commits, created 2024-06-21). The "Hospital Management System" on the current About page (`AboutPage.jsx:116-118`) has **no code on GitHub**.

---

## Sensitive content summary

| Severity | Repo (visibility) | File | Issue | Fix |
|---|---|---|---|---|
| 🔴 Critical | `E-Telly-mobile` (public) | `lib/dbhelper/constant.dart` (dev-kristine, rafael), `server.js:22` (mapbox) | MongoDB Atlas URI with username + password | Change that DB user's password in Atlas **now**, move the URI to an env var, then (optional) purge history with `git filter-repo` |
| 🟠 High | `marinas-webprog` (public) | `marinas-client/src/assets/data/users.json` | Sample users with plaintext passwords | Delete the file (Phase 0 leftover) |
| 🟠 Medium | `E-Telly-mobile` (public) | `android/app/src/main/AndroidManifest.xml:51` | Mapbox public token | Restrict the token to the app (Mapbox dashboard) |
| 🟡 Low | `E-Telly-mobile`, `marinas_advmobprogAY2627` (public) | `google-services.json`, `lib/firebase_options.dart` | Firebase client config | Normal for Firebase. Restrict API keys and check rules |
| 🟡 Low | `E-Telly-mobile` (public) | `android/hs_err_pid28116.log` | JVM crash log with local env/paths | Delete it and gitignore `hs_err_pid*.log` |
| 🟡 Low | `marinas_advmobprogAY2627` (public) | `marinas_advmobprog/assets/.env` | Committed `.env` (DummyJSON host, unused key) | Stop tracking it and add an `.env.example` |
| 🟡 Low | `etelly-mern` (private) | `client/.env.production`, `server/scripts/createAdmin.js` | Committed env file; hard-coded default admin password | Untrack `.env.production`; read admin creds from args/env |
| ⚪ Check | `Apartment`, `StayNest` (public) | `images/*.jfif`, `docs/Images/unit*.jpg` | Property photos, possibly the real family rental | Confirm, and replace with stock photos if real |
| ⚪ Check | `etelly-mern` (private) | `server/data/Capstone_Antipolo-Dataset.xlsx` | Situational reports with locations | Confirm no personal data before making it public |
| ⚪ Hygiene | `StudentMS`, `marinas-webprog`, `Apartment` | `bin/`, `obj/`, `publish/`; `marinas-server/node_modules/`; `master` XAMPP branch | Build output / dependencies committed | Add `.gitignore` and remove them |

No real tenant or client personal data (names with contact details, addresses, statements) was found in any repo.

## Mismatches with §B2 / the current site

- **"Mesh-network resident chat" (§B2, E-Telly):** in code, the P2P mesh relays **reports** (`p2p_relay_service.dart`). Resident/request chat uses **Socket.IO through the server** (`request_chat_screen.dart`). Suggested wording: "P2P mesh report relay + real-time community chat".
- **"Connected to the backend with Firebase Auth" (§B2):** true on branch `mapbox` (`lib/services/auth_service.dart`), not on the default branch. Make `mapbox` the default branch, or merge it.
- **Gym Exercise Queue System:** the About-page description doesn't match `FitQueue` (see above).
- **Hospital Management System:** no code on GitHub (`hospital` is empty).
- **Bulldogs Exchange article:** claims MongoDB Atlas + cart state, but `marinas_longexam1` has no database code.
- **Facebook replication article:** claims auth and token expiry, but `marinas_mobprog` has no auth code.

## Questions for Rafael

1. **E-Telly repos:** confirm the relationship. My reading: `etelly` (Next.js v1 prototype) → `etelly-mern` (final web + API). Mobile: `E-Telly` (kaia-cmd's start) → `E-Telly-mobile` (team; your work on `mapbox`). Should the case study link `etelly-mern` (private) at all, or only show screenshots?
2. **E-Telly team credit:** GitHub shows krisomniac, kaia-cmd and mynameisjungkook197-ui. What names and roles should the site show for the team of 5? Do they agree to be named?
3. **E-Telly demo:** `etelly-mern.vercel.app` returns 404. Is there a working deployment (Render/Heroku API + Vercel client) to link, or should the case study use screenshots/video only?
4. **Apartment:** is this the system built for the rental-property client? Who is GitHub user **maverivk** (you on another account, or a teammate)? Do you have the client's permission to show it? Are the photos in `images/` the real property?
5. **StayNest:** are `docs/Images/unit*.jpg` photos of the real family units?
6. **Midnight Kape:** is it a real café / freelance client? Can it be shown, with its name and live link?
7. **Gym Queue / Hospital MS / Bulldogs Exchange:** is `FitQueue` the Gym Exercise Queue System? Where is the Hospital Management System code (if anywhere)? Is `marinas_longexam1` the Bulldogs Exchange app, or was there another version with MongoDB?
8. **UMS:** is it part of E-Telly (the `logtell1.png` logo, Barangay Official role), or a separate class project?
9. **Client permissions in general:** which of the "10+ client projects" can be shown, and do any live in repos not under `rafae8080`?
