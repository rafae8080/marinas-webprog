# Portfolio Rebuild Plan — "Field Map"

Build guide for **Rafael Marinas's** portfolio, executed with Claude Code one phase at a time.

- **Part A** contains the rules Claude Code must follow (git, truthfulness, scope)
- **Part B** covers design system, content, site map, target file structure
- **Part C** lists the phases. Each one has a copy-paste prompt, steps, a verify list, and the commit hand-off
- **Part D** holds appendices: chatbot FAQ seed, copy drafts, env vars, troubleshooting prompts

---

## How Rafael uses this file

1. Open a terminal in `C:\Users\Rafael\Desktop\MARINAS_WEBPROG` and run `claude`.
2. Copy the **Prompt** block of the next unchecked phase in the [Progress tracker](#progress-tracker) and paste it.
3. Claude Code works, runs the checks, and stops with a **report + suggested commit message**.
4. You review in the browser (`npm run dev` in both folders), then commit and push **yourself** using the commands it prints.
5. Tick the phase in the tracker, then run `/clear` (fresh context) before starting the next phase.

> Claude Code is blocked from committing or pushing in two ways: `CLAUDE.md` (the rules) and `.claude/settings.json`
> (permission deny rules + attribution turned off). If Claude ever asks to commit, say no.

---

## Progress tracker

| # | Phase | Needs from Rafael first | Done |
|---|---|---|---|
| 0 | Security & prep | Create branch, Mongo `.env` working | [ ] |
| 1 | GitHub audit | `gh` installed + logged in | [ ] |
| 2 | Design system foundation | — | [ ] |
| 3 | Layout & navigation | — | [ ] |
| 4 | Project data + Work pages | Phase 1 tiers confirmed, screenshots | [ ] |
| 5 | Home page | Pick hero headline (§D2) | [ ] |
| 6 | About page + hobbies | Hobby photos, optional details | [ ] |
| 7 | Ops map | Confirm map pins | [ ] |
| 8 | Contact form + backend | Gmail App Password (optional) | [ ] |
| 9 | Radyo FAQ chatbot | Review FAQ answers (§D1) | [ ] |
| 10 | Field Notes (articles) | — | [ ] |
| 11 | Dashboard admin upgrade | — | [ ] |
| 12 | Motion polish | — | [ ] |
| 13 | SEO, performance, a11y | — | [ ] |
| 14 | Deploy & launch | Vercel access, env vars | [ ] |

---

# PART A — Rules for Claude Code

**A1. Git: Rafael does it.**
- NEVER run: `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git tag`, `git stash`,
  `git checkout -b`, `git switch -c`, `gh pr create`, `gh pr merge`.
- Allowed (read-only): `git status`, `git diff`, `git log`, `git branch`, `git show`.
- NO attribution of any kind: no `Co-Authored-By: Claude`, no "Generated with Claude Code", no AI credit in commit
  messages, PR descriptions, code comments, READMEs, or the site.
- End each phase with the **hand-off block** (A6).

**A2. Scope.** Do only the phase you were asked to do. If you spot something for a later phase, note it in the report
instead of doing it. Don't refactor unrelated code. Don't delete files except where a step says to.

**A3. Truthfulness.** Use only facts from §B2, the Phase 1 audit (`docs/project-audit.md`), or what Rafael confirms.
Missing information goes in a visible `TODO(rafael): …` (in code as a comment and in UI as placeholder text).
Never invent metrics, testimonials, clients, dates, or links.

**A4. Code conventions.**
- Client: function components, `.jsx`, Tailwind classes using **tokens only** (§B1.2), default exports like the existing code.
- Server: CommonJS (`require`), controllers/routes/models folders, matching the existing style.
- Before importing a new package: install it with `npm i` in the right folder, and say why in the report.
- No paid services. No AI/LLM APIs.

**A5. Verify before reporting.** Every phase must pass, at minimum:
- `cd marinas-client && npm run build` succeeds, and `npm run lint` has no *new* errors
- The server starts (`cd marinas-server && npm run dev`) with no crash, and the phase's curl checks pass
- The phase's own **Verify** list
If something can't be verified (for example missing `.env`), say so plainly. Don't claim it works.

**A6. Hand-off block.** Finish every phase with exactly this format:
```
PHASE N REPORT
Done: <bullets>
Verified: <what was run + result>
Not done / blocked: <bullets or "none">
TODO(rafael): <things only Rafael can provide>

Suggested commit (run these yourself):
  git add -A
  git status            # check nothing unexpected (no .env!)
  git commit -m "<type(scope): message>"
  git push -u origin portfolio-redesign
```

---

# PART B — Design, content, structure

## B1. Design system

### B1.1 Concept
A **field operations map**: faint topographic contour lines, monospace coordinates and section codes, projects as
**"case files"**, small status indicators (`● AVAILABLE`), and **dark red** used like an alert marker. It reflects
E-Telly (disaster mapping + mesh comms) without saying it out loud.

### B1.2 Color tokens (Day default, Night via toggle)
Defined as CSS variables in `marinas-client/src/assets/styles/index.css`, mapped into Tailwind v4 with `@theme inline`.

| Token | Day | Night | Tailwind usage | Use |
|---|---|---|---|---|
| `--bg` | `#E8E6E0` | `#0D1210` | `bg-bg` | page background |
| `--surface` | `#F6F5F1` | `#151C19` | `bg-surface` | cards, panels |
| `--ink` | `#1B1E1A` | `#DCE3DA` | `text-ink` | primary text |
| `--muted` | `#6B6A63` | `#7C8A82` | `text-muted` | secondary text, labels |
| `--line` | `#C8C2B3` | `#22302A` | `border-line` | borders, contour lines |
| `--accent` | `#8E1B1F` | `#E5484D` | `text-accent`, `bg-accent` | links, CTA, markers |
| `--accent-deep` | `#5E1014` | `#8E1B1F` | `bg-accent-deep` | hover / pressed |
| `--accent-wash` | `#8E1B1F14` | `#E5484D1F` | `bg-accent-wash` | highlighted rows |
| `--on-accent` | `#FFFFFF` | `#0D1210` | `text-on-accent` | text on accent fill |
| `--ok` | `#2F6B3A` | `#5FBF73` | `text-ok` | status dot only |

Reference implementation:
```css
@import "tailwindcss";

:root, [data-theme="day"] {
  --bg:#E8E6E0; --surface:#F6F5F1; --ink:#1B1E1A; --muted:#6B6A63; --line:#C8C2B3;
  --accent:#8E1B1F; --accent-deep:#5E1014; --accent-wash:#8E1B1F14; --on-accent:#FFFFFF; --ok:#2F6B3A;
}
[data-theme="night"] {
  --bg:#0D1210; --surface:#151C19; --ink:#DCE3DA; --muted:#7C8A82; --line:#22302A;
  --accent:#E5484D; --accent-deep:#8E1B1F; --accent-wash:#E5484D1F; --on-accent:#0D1210; --ok:#5FBF73;
}
@theme inline {
  --color-bg: var(--bg); --color-surface: var(--surface); --color-ink: var(--ink);
  --color-muted: var(--muted); --color-line: var(--line); --color-accent: var(--accent);
  --color-accent-deep: var(--accent-deep); --color-accent-wash: var(--accent-wash);
  --color-on-accent: var(--on-accent); --color-ok: var(--ok);
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```
- Contrast checked: accent on bg is about 7.2:1 (Day) and 4.8:1 (Night), so both pass WCAG AA.
- **Accent budget:** dark red covers under 10% of any screen.
- Theme: `data-theme` on `<html>`. Default follows `prefers-color-scheme`, the choice is saved in `localStorage` key `theme`
  (wrapped in try/catch). Set it with an inline script in `index.html` **before** React loads so the page doesn't flash.
- Toggle label: `DAY / NIGHT` in mono, like a map-legend switch (no sun/moon icon).

### B1.3 Typography (free, self-hosted)
`npm i @fontsource/space-grotesk @fontsource/inter @fontsource/jetbrains-mono` (import the weights in `main.jsx`).
- Headings: `font-display` (Space Grotesk 500/700), `tracking-[-0.02em]`, large sizes (hero `clamp(2.5rem,6vw,5rem)`)
- Body: `font-sans` (Inter 400/500), 16–18px, `leading-relaxed`
- Labels, coordinates, tags: `font-mono` (JetBrains Mono 400/500), uppercase, `tracking-[0.12em]`, 11–12px

### B1.4 Signature motifs
1. **Contour background**: `public/topo.svg`, generated once by `scripts/gen-topo.mjs` (devDeps `d3-contour`, `simplex-noise`),
   drawn in `--line` at ~35% opacity. Committed as a static file, so there's no runtime cost.
2. **Section codes**: `SEC-02 // CASE FILES` plus optional coordinates on the right.
3. **Status bar**: `RAFAEL MARINAS · 14.65°N 121.10°E · MARIKINA · ● AVAILABLE FOR WORK · 14:32 PHT` (live clock, Asia/Manila).
4. **Case-file cards**: corner tab `CASE 01`, status stamp (`DEPLOYED` / `IN PROGRESS` / `ARCHIVED`), thin accent rule, real metric.
5. **Corner marks**: small `+` registration marks at card corners.
6. **Hazard rule**: diagonal-stripe divider in `--accent`, used at most 3 times on the whole site.

### B1.5 Motion
Library: `motion` (`npm i motion`, import from `motion/react`). Everything respects `prefers-reduced-motion` (opacity only).
- Hero contour draw-in (stroke-dashoffset ~1.2s) + headline line-by-line reveal
- Status dot radar ping (CSS keyframes)
- Counters count up once when in view
- Case files rise + fade in, 60ms stagger
- Route change crossfade via React Router `viewTransition`
- Card hover: lift 2px, corner tab turns accent
- **Never:** scroll-jacking, cursor trails, particles, parallax overload, bouncing scale

### B1.6 Guardrails: avoid the "AI-made" look
- ❌ Purple/blue gradients, glassmorphism, glowing blobs, neon
- ❌ Cream background + serif + sage green
- ❌ Three equal feature cards with icon + title + vague text
- ❌ Stock Unsplash images (remove the existing ones)
- ❌ Phrases: "passionate", "crafting digital experiences", "clean, functional", "cutting-edge", "seamless"
- ❌ Emojis as icons, lorem ipsum, fake stats or testimonials, skill progress bars or percentages
- ✅ Real numbers, names, dates, screenshots. Every section has one sentence that could only be about Rafael

## B2. Source of truth (content)

**Identity:** Rafael Marinas · Marikina City, PH · Full-stack developer (MERN, Next.js, PHP) + Flutter mobile
**Public contact:** work.rafael22@gmail.com · linkedin.com/in/rafael-marinas-53703038b · github.com/rafae8080
**Never publish:** phone number, home/property address, tenant or client personal data.

**Education:** BS Information Technology, specialization in Mobile & Web Applications, National University Manila ·
expected June 2027 · Dean's Lister 8 terms (trimester) · GWA 3.68/4.00 · Coursework: Web Programming, Mobile Programming,
Database Systems, Information Assurance & Security

**Headline metrics:**
- E-Telly evaluated by **122 residents, 6 CDRRMO personnel, 5 IT professionals**, usability mean **4.05/5.00 (High)**
- **10+ client projects** as a freelancer (2024–present)
- **17 rental units** managed (14 residential, 3 commercial) since **2017**
- **8×** Dean's Lister

**Projects (from resume):**
- **E-Telly**: capstone, team of 5, 2025–present. Decentralized disaster preparedness & communication system: P2P report
  sending + mesh-network resident chat. *Rafael:* built the entire web app + backend (MERN) and designed the database,
  live disaster reporting module, multi-hazard map with resident reports, hazard-aware route navigation in the Flutter app
  connected to the backend with Firebase Auth.
- **Flutter apps** (2026): E-commerce app (catalog, cart, checkout) and a Facebook-style clone (feed, posts, profiles).
- **Apartment management system** (PHP) for a rental property client.
- **Airbnb-style booking system** (VB.NET, in progress, likely the `StayNest` repo): full-stack + system documentation.
- Also listed on the current About page (confirm in Phase 1): Gym Exercise Queue System, Hospital Management System,
  Bulldogs Exchange (Flutter shopping app).

**Experience:** Freelance Web & Software Developer (2024–present, 10+ projects from Android Studio storybook apps to full
management systems) · Property Management Assistant, family-owned apartment rental (2017–present: tenants, lease
contracts, monthly statements of account for 17 units).

**Certifications** (link each to Credly, `TODO(rafael): URLs`): ITS Cybersecurity (Certiport, May 2026) · PMI Project
Management Ready (Oct 2026) · Cisco Computer Hardware Basics (Oct 2026) · Lean Six Sigma Yellow Belt (MF OpEx/CSSC, Oct 2025)

**Skills ("Field Kit"):**
- Languages: JavaScript, Java, Dart, PHP, VB.NET, HTML, CSS
- Frameworks/Libraries: React, Next.js, Node.js, Express.js, Flutter, Tailwind CSS
- Data & backend services: MongoDB, MySQL, Microsoft SQL Server, Supabase, Firebase
- Tools: Git, GitHub, VS Code, NetBeans, Eclipse, Figma
- Networking & security: OPNsense, Linux, Wireshark, NetworkMiner, Cisco Packet Tracer
- Spoken: English, Filipino

**Hobbies ("Off the Clock"):** gym/fitness · basketball · taekwondo (`TODO(rafael): rank/years, optional`) · gaming:
used to play Mobile Legends, League of Legends, Call of Duty, NBA 2K, Tekken, and more (`TODO(rafael): mains, optional`).
Show game names as **text badges only**, with no official logos or key art (trademarks).

> ⚠️ The current pages say "05 Projects", "03 Years in IT", and "3rd-year student". Replace them with the metrics above.

## B3. Site map

| Route | Page |
|---|---|
| `/` | Home: hero, signal strip, featured case files, ops map, field kit, story teaser, field log, certifications, off the clock, contact |
| `/work` | All projects, filter `ALL · WEB · MOBILE · DESKTOP · CLIENT` |
| `/work/:slug` | Case study |
| `/about` | Full story, education, timeline, hobbies with photos |
| `/notes`, `/notes/:name` | Field Notes (the existing articles feature) |
| `/auth/signin` | Admin sign-in, linked only from the footer |
| `/dashboard/*` | Admin: overview, messages, notes, Radyo FAQ, unanswered questions, users |
| `*` | 404 "Signal lost" |

Redirects: `/articles` → `/notes`, `/articles/:name` → `/notes/:name`. Remove `/auth/signup` from public links
(admins are created by script, Phase 0).

## B4. Target file structure (new or changed items only)

```
marinas-client/
  index.html                      # title, meta, OG tags, theme no-flash script
  vercel.json                     # SPA rewrites (deep links)
  public/topo.svg  og.png  favicon.svg
  public/images/{me,projects,hobbies}/
  scripts/gen-topo.mjs
  src/
    assets/styles/index.css       # tokens + @theme
    data/projects.js  faqs.json  site.js (contact links, metrics, certs, skills, timeline)
    hooks/useTheme.js  useDocumentTitle.js  useInView.js
    lib/api.js                    # one axios instance + auth interceptor
    components/ui/                # SectionHeader, CaseFileCard, Tag, StatusDot, Button, HazardRule, CornerMarks, Counter
    components/                   # NavBar, Footer, StatusBar, ThemeToggle, ProtectedRoute, Lightbox
    components/radyo/             # RadyoAvatar, RadyoWidget
    sections/                     # Hero, SignalStrip, CaseFiles, OpsMap, FieldKit, StoryTeaser, FieldLog, Certifications, OffTheClock, Contact
    pages/LandingPages/           # HomePage, AboutPage, WorkPage, CaseStudyPage, NotesPage, NotePage
    pages/DashboardPages/         # + MessagesPage, FaqPage
marinas-server/
  .env.example
  middleware/auth.js  rateLimits.js
  models/Message.js  Faq.js  Unanswered.js  Article.js  (+ existing User.js)
  controllers/contactController.js  faqController.js
  routes/contactRoutes.js  faqRoutes.js
  scripts/create-admin.js  seed-faqs.js  seed-articles.js
docs/project-audit.md
```

---

# PART C — Phases

> Every prompt below starts with the same line so Claude reloads the rules. Paste the whole block.

---

## Phase 0: Security & prep

**Why first:** right now anyone on the internet can create, edit, or delete users (including admins) and post articles,
because `routes/userRoutes.js` and `routes/articleRoutes.js` have no auth checks. That must be fixed before the link goes on a resume.

**Rafael does first:**
```powershell
git switch deployment
git pull
git switch -c portfolio-redesign
```
Make sure `marinas-server/.env` has a working `MONGO_URI` and `JWT_SECRET`.

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 0 only: Security & prep.
Follow the steps exactly, run the Verify checks, and end with the Phase 0 hand-off block. Do not commit.
```

**Steps for Claude:**
1. `git branch --show-current` must be `portfolio-redesign`. Otherwise stop and tell Rafael.
2. Create `marinas-server/middleware/auth.js`:
   - `requireAuth`: reads `Authorization: Bearer <token>`, verifies with `JWT_SECRET`, sets `req.user`, returns 401 if missing or invalid
   - `requireAdmin`: 403 unless `req.user.type === "admin"` (check which claims `loginUser` puts in the token, and match them)
3. Protect routes:
   - `userRoutes.js`: `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` → `requireAuth, requireAdmin`. `POST /login` stays public.
   - `articleRoutes.js`: `POST /` → `requireAuth, requireAdmin`. GETs stay public.
4. `userController.js`: `createUser`/`updateUser` must not return `password` (use `.select("-password")` or delete it from the
   object). `updateUser` uses `{ new: true, runValidators: true }`.
5. `marinas-server/middleware/rateLimits.js`: `npm i express-rate-limit helmet`. Export `loginLimiter` (10/15 min) and
   `formLimiter` (5/hour). Apply `loginLimiter` to `POST /api/users/login`. Note in a comment that the in-memory store
   is best-effort on Vercel serverless.
6. `index.js`: remove `body-parser` (keep `express.json()` and add `express.urlencoded({ extended: true })`), add `helmet()`,
   and replace `origin: "*"` with an allowlist from `process.env.CLIENT_ORIGIN` (comma-separated) plus `http://localhost:5173`.
   Add a `GET /api/health` route that returns `{ ok: true }`.
7. `scripts/create-admin.js`: CLI script `node scripts/create-admin.js <email> <username> <password> <firstName> <lastName>`
   that connects with `MONGO_URI` and creates or updates an admin with a bcrypt-hashed password. The other required
   User fields get placeholder values like `"N/A"`. Add `"create-admin": "node scripts/create-admin.js"` to package.json scripts.
8. `marinas-server/.env.example` with: `MONGO_URI=`, `JWT_SECRET=`, `CLIENT_ORIGIN=https://marinas-client.vercel.app`,
   `MAIL_USER=`, `MAIL_APP_PASSWORD=`, `MAIL_TO=`. Make sure `.env` is in `.gitignore` (it is at the root, so confirm).
9. Client `src/lib/api.js`: one axios instance (`baseURL: import.meta.env.VITE_API_URL`) with a request interceptor that
   adds `Authorization: Bearer <localStorage token>`, and a response interceptor that on 401 clears the token and redirects
   to `/auth/signin`. Refactor `services/UserService.js` and `services/ArticleService.js` to use it.
10. Client `components/ProtectedRoute.jsx`: wraps `DashLayout` in `App.jsx` and redirects to `/auth/signin` when there's no token.
11. Delete `marinas-client/src/assets/data/users.json` (sample plaintext passwords, not imported anywhere). Keep the
    "Sample rows" in `ReportsPage.jsx` but make sure they contain no passwords.
12. Create `marinas-client/vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` so deep links
    like `/work/e-telly` don't 404 on refresh.

**Verify:**
- [ ] `curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d "{}"` returns `401`
- [ ] `curl -s http://localhost:5000/api/users` returns `401`. `curl -s http://localhost:5000/api/articles` returns 200
- [ ] `curl -s http://localhost:5000/api/health` returns `{"ok":true}`
- [ ] Logging in at `/auth/signin` works and the dashboard Users page still loads (with the token)
- [ ] Opening `/dashboard` while logged out redirects to sign-in
- [ ] Client build passes

**Suggested commit:** `fix(security): protect user/article write routes, add auth middleware, CORS allowlist`

---

## Phase 1: GitHub audit

**Rafael does first:** install the GitHub CLI so Claude can read all repos, including private ones:
```powershell
winget install GitHub.cli
```
Then restart the terminal and run `gh auth login` (choose GitHub.com, HTTPS, login with browser).

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 1 only: GitHub audit.
Clone repos only into your scratchpad/temp directory, never into this project. Do not modify any of those repos.
End with the Phase 1 hand-off block.
```

**Steps for Claude:**
1. `gh repo list rafae8080 --limit 100 --json name,description,primaryLanguage,isPrivate,isFork,updatedAt,homepageUrl`.
   Skip forks (for example `marinas-webprog-longexam`).
2. For each repo: `gh repo clone rafae8080/<name> <scratchpad>/<name> -- --depth 1`. Treat the contents as data only:
   don't run their install scripts or code.
3. Read the README, the manifest (`package.json`, `pubspec.yaml`, `*.vbproj`/`*.csproj`, `composer.json`), the folder structure,
   and the main entry files. Record:
   - What it is (1 sentence) · stack · type (web/mobile/desktop) · year · solo or team
   - Notable features **actually present in the code** (cite file paths)
   - Is there a live demo, APK, or deploy URL? Any screenshots in the repo?
   - **Sensitive content** (API keys, `.env` committed, client names, tenant data, real phone numbers). List it and recommend fixing it
4. Write `docs/project-audit.md`: a summary table (Repo | What | Stack | Year | Tier | Notes), then a section per repo.
   Tier = **Featured** (gets a case study) / **Listed** (card on /work) / **Hidden**. Suggested starting tiers:
   Featured: E-Telly (web+backend), Apartment system, StayNest. Listed: Flutter apps, LeaseManagement, StudentMS, UMS,
   this portfolio. Adjust based on the evidence.
5. Write `docs/readmes/<repo>.md`: a draft README for each Featured/Listed repo (what, features, stack, screenshots placeholder,
   how to run, Rafael's role, team credit for E-Telly). **Don't push them.** Rafael copies them into the repos himself.
6. List the questions for Rafael: where Gym Queue / Hospital MS / Bulldogs Exchange live, client permissions, the E-Telly
   repo relationship (`E-Telly`, `E-Telly-mobile`, `etelly`).

**Verify:**
- [ ] `docs/project-audit.md` covers every non-fork repo
- [ ] Every claim in it points to a file in that repo
- [ ] Nothing was cloned inside `MARINAS_WEBPROG`

**Rafael then:** edit the Tier column in `docs/project-audit.md` and answer the questions before Phase 4.

**Suggested commit:** `docs: add GitHub project audit and draft READMEs`

---

## Phase 2: Design system foundation

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 2 only: Design system foundation, following §B1 exactly.
End with the Phase 2 hand-off block.
```

**Steps for Claude:**
1. Client installs: `npm i motion @fontsource/space-grotesk @fontsource/inter @fontsource/jetbrains-mono`,
   `npm i -D d3-contour simplex-noise`.
2. Import font weights in `src/main.jsx` (space-grotesk 500, 700 · inter 400, 500 · jetbrains-mono 400, 500).
3. Rewrite `src/assets/styles/index.css` with the reference CSS from §B1.2, plus base styles: `body { @apply bg-bg text-ink font-sans antialiased }`,
   `:focus-visible` ring in accent, `::selection` in accent-wash, and a `@media (prefers-reduced-motion: reduce)` block that kills
   animations and transitions.
4. `index.html`: add an inline script in `<head>` that sets `data-theme` from localStorage or `prefers-color-scheme` (try/catch).
5. `src/hooks/useTheme.js` (`theme`, `toggle`, persists to localStorage) + `src/components/ThemeToggle.jsx` (`DAY / NIGHT`
   segmented mono switch, `aria-pressed`).
6. `scripts/gen-topo.mjs`: generates `public/topo.svg` (1600×1000 viewBox, ~14 contour levels from simplex noise, stroke
   `currentColor`, no fill, ≤ 60 KB). Run it once and add `"gen:topo": "node scripts/gen-topo.mjs"` to package.json.
7. Primitives in `src/components/ui/`:
   - `SectionHeader({ code, title, kicker, coords })` → `SEC-02 // CASE FILES` mono label + display title
   - `CaseFileCard({ index, title, status, year, stack, metric, summary, to })` with corner tab + CornerMarks + hover lift
   - `Tag({ children, tone })`: mono uppercase chip
   - `StatusDot({ label, tone })` with a ping animation
   - `Button({ to, href, variant: "primary"|"secondary"|"ghost", ... })`: replaces `components/Button.jsx` (keep the same
     import path working, or update all imports)
   - `HazardRule`, `CornerMarks`, `Counter({ value, suffix, decimals })` (counts up when in view, uses `useInView`)
8. Temporary route `/styleguide` (`pages/StyleguidePage.jsx`) that shows every primitive with a theme toggle.
   Mark it `// TEMP: remove in Phase 13`.

**Verify:**
- [ ] `/styleguide` renders correctly in Day and Night, with no flash of the wrong theme on reload
- [ ] `grep -rE "stone-|zinc-|#[0-9a-fA-F]{3,6}" src/components/ui` returns nothing
- [ ] With "reduce motion" on (Windows: Settings → Accessibility → Visual effects → Animation effects off), nothing moves
- [ ] Build passes

**Suggested commit:** `feat(design): add Field Map design tokens, fonts, theme toggle and UI primitives`

---

## Phase 3: Layout & navigation

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 3 only: Layout & navigation.
End with the Phase 3 hand-off block.
```

**Steps for Claude:**
1. `src/data/site.js`: export `contact` (email, github, linkedin), `coords`, `metrics`, `certifications`, `skills`, `timeline`, using
   §B2 only. Credly URLs and other unknowns become `TODO(rafael)`.
2. `components/StatusBar.jsx`: the strip from §B1.4 #3 with a live Asia/Manila clock (`Intl.DateTimeFormat`, updates every 30s).
   On mobile, show only the name + status dot.
3. `components/NavBar.jsx` rewrite: logo (`/raf_logo.png`, sized to fit), links `WORK · ABOUT · NOTES · CONTACT`
   (CONTACT → `/#contact`), ThemeToggle. **Remove the Sign In button.** Active link gets an accent underline.
   Mobile (<768px): a menu button opens a full-screen panel styled like a map legend, which closes on navigation and on Esc, with a focus trap.
4. `components/Footer.jsx` rewrite: coordinates, email, GitHub, LinkedIn, "Source on GitHub" link to the repo,
   © year, and a small muted `admin` link → `/auth/signin`.
5. `layouts/Layout.jsx`: StatusBar + NavBar + `<main>` + Footer, with the `topo.svg` background (fixed, `text-line`, low opacity,
   `pointer-events-none`, `aria-hidden`). Add a "Skip to content" link.
6. `App.jsx`: add the routes from §B3 (pages can be placeholders using SectionHeader for now) plus the redirects.
   Remove the `/auth/signup` link from any public page. Keep the route working only if the dashboard uses it, and note this in the report.
7. `pages/NotFoundPage.jsx`: "SIGNAL LOST · 404" + "This route isn't on the map." + a home button.

**Verify:**
- [ ] At 360px width there's no horizontal scroll and the mobile menu works by keyboard
- [ ] All §B3 routes render. `/articles` redirects to `/notes`. A random URL shows the 404
- [ ] No Sign In button in the nav
- [ ] Build passes

**Suggested commit:** `feat(layout): status bar, new nav, footer, topo background and route map`

---

## Phase 4: Project data + Work pages

**Rafael does first:** confirm tiers in `docs/project-audit.md`. Put screenshots in
`marinas-client/public/images/projects/<slug>/` (any names, PNG/JPG is fine, Claude converts them).

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 4 only: Project data + Work pages.
Use docs/project-audit.md (with my tier edits) and §B2 as the only sources. End with the Phase 4 hand-off block.
```

**Steps for Claude:**
1. `src/data/projects.js`: array of objects:
   `slug, title, tier ("featured"|"listed"), status ("DEPLOYED"|"IN PROGRESS"|"ARCHIVED"), year, type ("web"|"mobile"|"desktop"),
   client (bool), confidential (bool), role, team (e.g. "Team of 5"), stack[], summary (1 line), problem, built[] (Rafael's own
   contributions), metrics[] ({ value, label }), architecture (image path or null), screenshots[] ({ src, alt, caption }), repo, demo, nextSteps`.
   Order: featured first, then by year descending. Unknown fields → `TODO(rafael)`.
2. Convert screenshots to WebP (use `sharp` as a devDependency in a script `scripts/optimize-images.mjs`, max width 1600) and
   reference the `.webp` files.
3. `pages/LandingPages/WorkPage.jsx`: SectionHeader `SEC-03 // INDEX`, filter chips (ALL/WEB/MOBILE/DESKTOP/CLIENT, synced to
   `?type=` in the URL), and an index list in mono: `01  E-TELLY ............ MERN · 2025  [DEPLOYED]` (dot leaders via CSS).
   Optional grid view toggle using `CaseFileCard`. Each row links to `/work/:slug`.
4. `pages/LandingPages/CaseStudyPage.jsx` template, in this order:
   CASE FILE header (index, title, status stamp, year, role, team, type) → **Problem** → **What I built** (bullets from `built[]`;
   for E-Telly add "Team of 5. My part: …") → **Architecture** (image if present, else a hidden section) → **Screenshots**
   (grid + `components/Lightbox.jsx`, keyboard ← → Esc) → **Results** (metrics with `Counter`) → **Stack** (Tags) →
   **What I'd do next** → links (Repo / Live / APK; hide the ones that are missing) → prev/next case links.
   Unknown slug → NotFoundPage.
5. For `confidential: true`: don't show the client name or repo link, and add a mono note `CLIENT DETAILS REDACTED`.

**Verify:**
- [ ] Every project in the audit marked Featured or Listed appears on `/work`. Hidden ones don't
- [ ] Filters work and survive reload (`?type=mobile`)
- [ ] Each Featured case study renders, the lightbox works by keyboard, and refreshing `/work/<slug>` works
- [ ] No invented metrics: every metric matches §B2 or the audit
- [ ] Build passes

**Suggested commit:** `feat(work): project data, work index and case study pages`

---

## Phase 5: Home page

**Rafael does first:** pick a hero headline from §D2 (or write your own). Put your best photo at
`marinas-client/public/images/me/portrait.jpg`.

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 5 only: Home page.
Use hero headline option <A/B/own: "...">. End with the Phase 5 hand-off block.
```

**Steps for Claude:** rebuild `HomePage.jsx` from sections in `src/sections/`. Remove all Unsplash images and the old KPI/feature cards.
1. `Hero.jsx`: `SEC-01 // IDENT`, the chosen headline, subline (§D2), CTAs **View case files** (primary → `/work`) and
   **Contact** (secondary → `#contact`). Right side: portrait in a "field ID card" frame (CornerMarks, mono caption
   `ID · R. MARINAS · FULL-STACK`), plus an inline contour SVG that draws in.
2. `SignalStrip.jsx`: 5 counters from `site.metrics`: 122 residents evaluated · 4.05/5 usability · 10+ client projects ·
   17 units managed · 8× Dean's Lister. Each one has a tiny mono source label (e.g. `E-TELLY EVAL`).
3. `CaseFiles.jsx`: `SEC-02 // CASE FILES` + the featured projects as `CaseFileCard`s + a "View all case files" link.
4. Leave a `<section id="map">` placeholder for Phase 7.
5. `FieldKit.jsx`: `SEC-04 // FIELD KIT`, skills grouped like an equipment loadout (mono category, Tags). No bars or percentages.
6. `StoryTeaser.jsx`: 2–3 sentences from §D3 + a link to `/about`.
7. `FieldLog.jsx`: vertical timeline from `site.timeline`: 2017 property mgmt → `TODO(rafael): BSIT start year` → 2024 freelance →
   2025 E-Telly + Lean Six Sigma → 2026 ITS Cybersecurity, PMI, Cisco, Flutter apps, StayNest → June 2027 expected graduation.
8. `Certifications.jsx`: 4 cards (issuer, date, Credly link, or TODO).
9. Leave `<section id="off-the-clock">` (Phase 6) and `<section id="contact">` (Phase 8) placeholders with SectionHeaders.
10. `useDocumentTitle("Rafael Marinas — Full-Stack Developer")`.

**Verify:**
- [ ] No Unsplash URLs remain: `grep -r "unsplash" marinas-client/src` is empty, except in Notes data (handled in Phase 10)
- [ ] All numbers match §B2
- [ ] Looks right at 360px, 768px, 1280px in both themes
- [ ] Build passes

**Suggested commit:** `feat(home): rebuild home page with Field Map sections`

---

## Phase 6: About page + Off the Clock

**Rafael does first:** put hobby photos in `public/images/hobbies/` named like `gym-1.jpg`, `basketball-1.jpg`, `taekwondo-1.jpg`,
`gaming-1.jpg`. Optionally tell Claude: taekwondo rank/years, game mains, your BSIT start year.

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 6 only: About page + Off the Clock.
Extra details: <taekwondo rank / game mains / BSIT start year, or "none yet">. End with the Phase 6 hand-off block.
```

**Steps for Claude:**
1. `AboutPage.jsx` rewrite: `SEC-A1 // ORIGIN` with the story from §D3 (Rafael approves the wording) → Education block (NU, specialization,
   Dean's List 8 terms, GWA, coursework) → Experience (freelance + property management) → reuse `FieldLog` → `OffTheClock`.
   Use the real photo (`raf1.jfif` converted to WebP or `images/me/`). Remove the stock image and the hardcoded project list.
2. `sections/OffTheClock.jsx`: 4 tiles (Gym, Basketball, Taekwondo, Gaming), each with a photo (or a tasteful mono placeholder
   `PHOTO PENDING` if missing), a one-line caption, and mono stats if provided (e.g. `RANK: …`). Gym tile links to the Gym Queue
   project if it exists in `projects.js`. Gaming tile shows game names as Tags. **No game logos.**
3. Add `OffTheClock` to the Home page (`#off-the-clock`) in a compact form.
4. `useDocumentTitle("About — Rafael Marinas")`.

**Verify:**
- [ ] No phone number, no address, no trademarked game art
- [ ] Missing photos show the placeholder (no broken images)
- [ ] Build passes

**Suggested commit:** `feat(about): origin story, education, experience and hobbies`

---

## Phase 7: Ops map

**Rafael does first:** confirm pins. Default pins are **Marikina (Base)** and **NU Manila (Training ground)**. Add the E-Telly pilot
area only if you're allowed to (city or barangay level only).

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 7 only: Ops map.
Pins: <Marikina, NU Manila, + any others>. End with the Phase 7 hand-off block.
```

**Steps for Claude:**
1. `sections/OpsMap.jsx` using the existing `react-leaflet` + `leaflet` (import `leaflet/dist/leaflet.css`).
2. Free tiles that swap with the theme: Day `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`, Night
   `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`, with attribution `© OpenStreetMap contributors © CARTO`.
3. Pins come from `site.js` (`mapPins: [{ label, code, lat, lng, text, link }]`), at city-level coordinates only. Custom `L.divIcon`
   with an accent dot + ping ring (CSS). Popup styled as a mini case file.
4. Lazy-load: render the map only when the section scrolls into view (`useInView` + `React.lazy`). Disable scroll-wheel zoom until clicked.
   Provide a text list of the pins below the map for screen readers.
5. Replace the `#map` placeholder on Home with `SEC-05 // OPS MAP`.

**Verify:**
- [ ] The map loads only when scrolled to (check the Network tab), and tiles switch when the theme toggles
- [ ] No precise home or property coordinates
- [ ] Build passes

**Suggested commit:** `feat(map): themed Leaflet ops map with project pins`

---

## Phase 8: Contact form + backend ($0)

**Rafael does first (optional, for email alerts):** turn on Google 2-Step Verification, create an **App Password**
(Google Account → Security → App passwords), and put it in `marinas-server/.env` as `MAIL_USER`, `MAIL_APP_PASSWORD`, `MAIL_TO`.
Without it, messages are still saved and visible in the dashboard.

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 8 only: Contact form + backend.
End with the Phase 8 hand-off block.
```

**Steps for Claude:**
1. Server `npm i nodemailer`.
2. `models/Message.js`: `name` (req, ≤80), `email` (req, valid), `subject` (≤120), `body` (req, 10–4000), `read` (default false), timestamps.
3. `controllers/contactController.js` + `routes/contactRoutes.js`:
   - `POST /api/contact` (public, `formLimiter`): validate + trim. If the honeypot field `company` is filled, return 200 but don't save.
     Save the message. If the `MAIL_*` env vars exist, send a notification email via Nodemailer Gmail; mail failure must **not** fail the request.
   - `GET /api/contact`, `PATCH /api/contact/:id` (read toggle), `DELETE /api/contact/:id`, all `requireAuth, requireAdmin`.
   - Mount in `index.js`.
4. Client `sections/Contact.jsx`: `SEC-09 // TRANSMIT`. Fields name/email/subject/message + a hidden honeypot. Button `TRANSMIT ▸`.
   States: idle / sending (`TRANSMITTING…`) / sent (`MESSAGE RECEIVED · I'll reply within 48h` — `TODO(rafael): confirm`) / error
   (shows the email address as a fallback). Client-side validation with inline errors and `aria-live`.
   Also show direct links: email, LinkedIn, GitHub.
5. Replace the `#contact` placeholder on Home.

**Verify:**
- [ ] `curl -X POST localhost:5000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"t@t.com","body":"Hello from curl test"}'` returns 201
- [ ] Bad email → 400. Honeypot filled → 200 and nothing saved. 6th request within an hour → 429
- [ ] `GET /api/contact` without a token → 401
- [ ] The form works end to end locally
- [ ] Build passes

**Suggested commit:** `feat(contact): contact form with MongoDB storage and optional Gmail notification`

---

## Phase 9: "Radyo" FAQ chatbot (no AI, $0)

**Rafael does first:** read the FAQ answers in §D1 and fix anything that's wrong or that you don't want public.
You may rename "Radyo".

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 9 only: Radyo FAQ chatbot.
Bot name: <Radyo or other>. Use §D1 as the FAQ seed. No AI/LLM APIs. End with the Phase 9 hand-off block.
```

**Steps for Claude:**
1. **Mascot** `components/radyo/RadyoAvatar.jsx`: an inline SVG walkie-talkie. Rounded body `fill: var(--ink)`, screen
   `var(--surface)` with two pixel eyes (`var(--ink)`), 3-line speaker grille, antenna with an LED tip `var(--accent)`.
   Prop `state`: `idle` (blink every ~4s), `listening` (LED pulse), `thinking` (three signal arcs animating from the antenna),
   `happy` (eyes become `^ ^`). Sizes via prop (56 launcher, 32 in bubbles). Respects reduced motion. `role="img"` + `aria-label`.
2. **Server:** `models/Faq.js` (`question`, `answer`, `keywords[]`, `links[{label,url}]`, `order`, `active`), `models/Unanswered.js`
   (`text` ≤300, `createdAt`, `resolved`). Routes in `routes/faqRoutes.js`:
   - `GET /api/faqs` (public, active only, `Cache-Control: public, max-age=300`)
   - `POST /api/faqs/unanswered` (public, `formLimiter`)
   - Admin CRUD: `POST/PUT/DELETE /api/faqs/:id`, `GET /api/faqs/unanswered`, `PATCH /api/faqs/unanswered/:id`
3. `scripts/seed-faqs.js` + npm script `seed:faqs`: upserts §D1 entries (match by question). Also write the same data to
   `marinas-client/src/data/faqs.json` as the offline fallback.
4. **Client** `npm i fuse.js`. `components/radyo/RadyoWidget.jsx`:
   - Floating launcher (bottom-right, avatar 56px, tooltip "Ask Radyo"). Opens a panel (380px wide on desktop, full-width sheet on mobile)
   - Fetch `/api/faqs` once when opened, falling back to `faqs.json` on error
   - Fuse over `question` (weight 0.6) + `keywords` (0.4), `threshold: 0.4`
   - Greeting: "Radyo here. Ask me about Rafael's work." + chips: `Tech stack` · `E-Telly` · `Is he available?` · `Education` · `Contact`
   - Match → answer bubble (+ link buttons). Brief `thinking` state (400ms) for feel
   - No match → "Copy that — I don't have that on file yet. I've logged your question for Rafael. Want to send him a message?"
     with a button that scrolls to `#contact` (or navigates to `/#contact`), and POSTs the question to `/unanswered`
   - Accessibility: `role="dialog"`, `aria-modal`, focus trap, Esc closes, `aria-live="polite"` on the message list, works by keyboard
   - Renders in `Layout.jsx` (public pages only, not the dashboard)

**Verify:**
- [ ] "what stack do you use", "tell me about etelly", "are you available" each return the right answer
- [ ] Gibberish → fallback + the question appears in the DB
- [ ] With the server stopped, the bot still answers from `faqs.json`
- [ ] Works by keyboard alone, and avatar states animate (static with reduced motion)
- [ ] Build passes

**Suggested commit:** `feat(radyo): rule-based FAQ chatbot with mascot, fallback data and unanswered log`

---

## Phase 10: Field Notes (restyle articles)

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 10 only: Field Notes.
End with the Phase 10 hand-off block.
```

**Steps for Claude:**
0. **Move articles into MongoDB.** Right now `marinas-server/controllers/articleController.js` keeps the articles in a hard-coded
   in-memory array, so `POST /api/articles` is lost on every Vercel cold start. Create `models/Article.js` (`name` unique slug,
   `tag`, `title`, `cover` (optional), `alt`, `content[]`, `published` (default true), timestamps), and `scripts/seed-articles.js` +
   npm script `seed:articles` that upserts the current array (drop the Unsplash `img` URLs). Rewrite the controller to use the
   model, keeping the same response shape the client expects. Add admin-only `PUT /:id` and `DELETE /:id`. Public GETs
   return only `published` articles.
1. Move `ArticleListPage`/`ArticlePage` to `NotesPage`/`NotePage` (routes `/notes`, `/notes/:name`) with the redirects kept.
2. Restyle with tokens: mono index list (date · tag · reading time), readable article column (`max-w-[68ch]`), and prev/next links.
3. Reading time = words / 200, rounded up.
4. Replace Unsplash covers with generated SVG covers (contour + mono title, made in a `NoteCover.jsx` component, seeded by slug).
5. In the report, list the suggested future posts (Rafael writes them): *Building E-Telly's live reporting with MERN* ·
   *What 122 residents taught me about usability* · *Why I build management systems: 17 units since 2017*.
   Don't write fake posts.

**Verify:**
- [ ] `grep -r "unsplash" marinas-client/src marinas-server` is empty (excluding node_modules)
- [ ] `npm run seed:articles` then `curl localhost:5000/api/articles` returns the articles from MongoDB, and they survive a server restart
- [ ] Old `/articles/...` links redirect
- [ ] Build passes

**Suggested commit:** `feat(notes): restyle articles as Field Notes with generated covers`

---

## Phase 11: Dashboard admin upgrade

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 11 only: Dashboard admin upgrade.
Keep MUI for the dashboard. End with the Phase 11 hand-off block.
```

**Steps for Claude:**
1. `DashboardPages/MessagesPage.jsx`: MUI DataGrid (date, name, email, subject, read), row click opens the message, mark read/unread,
   delete with a confirm dialog, unread count badge in the sidebar.
2. `DashboardPages/FaqPage.jsx`: two tabs. **FAQs** (CRUD form: question, answer, keywords as chips, links, order, active)
   and **Unanswered** (list + "Convert to FAQ" which pre-fills the form, then marks it resolved).
3. `DashArticleListPage.jsx` → "Field Notes" manager: create, edit, publish/unpublish, delete (uses the Phase 10 Article API).
4. `DashboardPage.jsx` overview: cards for unread messages, unanswered questions, notes count, users count (real API data).
5. Add sidebar links in `DashLayout.jsx`. Apply the Field Map tokens to the MUI theme (`createTheme` palette from the CSS
   variables, mono font for headers) so the admin area matches the site.
6. Make sure every dashboard call goes through `src/lib/api.js` (token attached).

**Verify:**
- [ ] Logged in as admin: messages, notes, FAQs, and unanswered questions all work end to end
- [ ] Logged out: every `/dashboard/*` page redirects
- [ ] Build passes

**Suggested commit:** `feat(dashboard): messages inbox, FAQ manager and overview stats`

---

## Phase 12: Motion polish

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 12 only: Motion polish per §B1.5.
End with the Phase 12 hand-off block.
```

**Steps for Claude:**
1. Hero: contour stroke draw-in + headline lines staggered (motion `variants`), once per session.
2. CaseFiles / Work index: rise + fade, 60ms stagger, `whileInView` with `once: true`.
3. Route transitions: `viewTransition` on `NavLink`/`Link` + CSS `::view-transition-old/new(root)` crossfade 180ms.
4. Check the existing pieces: Counter, StatusDot ping, card hover, Radyo states. Tune durations (150–400ms UI, ≤1.2s hero).
5. A global `MotionConfig reducedMotion="user"` in `main.jsx`.

**Verify:**
- [ ] No layout shift from animations (Lighthouse CLS < 0.1)
- [ ] Reduced motion → no movement anywhere
- [ ] Build passes

**Suggested commit:** `feat(motion): hero draw-in, staggered reveals and view transitions`

---

## Phase 13: SEO, performance, accessibility

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 13 only: SEO, performance, accessibility.
End with the Phase 13 hand-off block including the Lighthouse scores.
```

**Steps for Claude:**
1. `index.html`: `<title>Rafael Marinas — Full-Stack Developer</title>`, meta description (≤155 chars, from §B2),
   canonical, Open Graph (`og:title`, `og:description`, `og:image` = `/og.png`, `og:url`, `og:type=website`), Twitter
   `summary_large_image`, `theme-color` for both schemes, and `favicon.svg` (made from the logo mark). Remove `vite.svg`.
2. `public/og.png` 1200×630: generate it with a script (`scripts/gen-og.mjs` using `sharp` to render an SVG with the topo background,
   name, role, and accent marker).
3. `useDocumentTitle` on every page (Work: "Work — Rafael Marinas", case study: "<Project> — Case File", etc.).
4. `public/robots.txt` + `public/sitemap.xml` (static list of routes + project slugs, using `scripts/gen-sitemap.mjs` from `projects.js`).
5. JSON-LD `Person` schema in `index.html` (name, jobTitle, url, sameAs GitHub/LinkedIn, alumniOf NU).
6. Images: all WebP, `loading="lazy"` except the hero, explicit `width`/`height`. Hero portrait gets `fetchpriority="high"`.
7. Code-split: lazy-load the dashboard routes, OpsMap, Lightbox, and Radyo panel. Check that the main bundle stays under ~250 KB gzip and report the size.
8. Accessibility pass: one `h1` per page, logical headings, alt text, labels on every input, visible focus, contrast in both themes,
   `lang="en"`.
9. **Remove `/styleguide`** and its page file.
10. Run Lighthouse (mobile) on `npm run build && npm run preview`: `npx lighthouse http://localhost:4173 --preset=desktop --quiet --chrome-flags="--headless"`
    and the mobile default. Report the scores. Fix anything under 90 if it's within this phase's scope.

**Verify:**
- [ ] Lighthouse mobile ≥ 90 in Performance, Accessibility, Best Practices, SEO (report actual numbers)
- [ ] Sharing preview: paste the meta into https://www.opengraph.xyz after deploy (Phase 14)
- [ ] `/styleguide` returns 404
- [ ] Build passes

**Suggested commit:** `perf(seo): meta/OG tags, sitemap, image optimization, code splitting and a11y fixes`

---

## Phase 14: Deploy & launch

**Rafael does first:** have Vercel access to both projects (client: `marinas-client`, server: the API project).

**Prompt:**
```
Read CLAUDE.md and PORTFOLIO_PLAN.md (Part A rules apply). Do Phase 14 only: Deploy & launch checklist.
Do NOT push or deploy yourself — prepare everything and give me the exact steps. End with the Phase 14 hand-off block.
```

**Steps for Claude:**
1. Produce `docs/deploy-checklist.md` with the env vars for each Vercel project (§D4), where to set them
   (Vercel → Project → Settings → Environment Variables), and the order: server first, then client.
2. Check `marinas-server/vercel.json` still routes everything to `index.js` and that the new routes are mounted.
3. Write the post-deploy smoke test as copy-paste commands: health check, articles GET, contact POST, faqs GET, users GET (expect 401),
   deep link refresh `/work/e-telly`, and the Radyo fallback.
4. Write the first-admin step: `cd marinas-server && npm run create-admin -- <email> <username> <password> Rafael Marinas`
   (run locally against the production `MONGO_URI`, then remove it from your shell history if typed inline).
5. Launch extras (as a checklist for Rafael): update the resume link, LinkedIn Featured section, the GitHub profile README
   (draft it in `docs/github-profile-README.md`), pin the 6 best repos, copy the `docs/readmes/*` into each repo.

**Rafael then:** merge `portfolio-redesign` → `deployment` (or open a PR yourself), push, and Vercel deploys.

**Suggested commit:** `docs: deployment checklist and launch notes`

---

# PART D — Appendices

## D1. Radyo FAQ seed (Rafael: review before Phase 9)

| # | Question | Keywords | Answer |
|---|---|---|---|
| 1 | What is Rafael's tech stack? | stack, tech, technologies, languages | Mainly MERN (MongoDB, Express, React, Node), plus Next.js, PHP and Flutter. Databases: MongoDB, MySQL, SQL Server, Supabase, Firebase. |
| 2 | What is E-Telly? | etelly, capstone, disaster | A disaster preparedness and communication system (capstone, team of 5) with P2P report sending and mesh-network resident chat. Rafael built the entire web app, backend and database. |
| 3 | What did Rafael build in E-Telly? | role, contribution, etelly | The MERN web app and backend, the database design, live disaster reporting, the multi-hazard map, and hazard-aware route navigation in the Flutter app with Firebase Auth. |
| 4 | How was E-Telly evaluated? | evaluation, usability, results | By 122 residents, 6 CDRRMO personnel and 5 IT professionals, with an overall usability mean of 4.05/5.00 (High). |
| 5 | Is Rafael available for work? | available, hire, freelance, internship | `TODO(rafael): e.g. "Yes — open to internships and freelance projects. Send a message below."` |
| 6 | Does he do freelance work? | freelance, client, commission | Yes. Since 2024 he has delivered 10+ client projects, from Android storybook apps to complete management systems. |
| 7 | Where is Rafael based? | location, where, city | Marikina City, Philippines. |
| 8 | Where does he study? | school, university, education | BS Information Technology (Mobile & Web Applications) at National University Manila, expected to graduate June 2027. |
| 9 | What are his grades? | deans list, gwa, grades | 8-time Dean's Lister with a GWA of 3.68/4.00. |
| 10 | What certifications does he have? | certification, certified, credly | ITS Cybersecurity, PMI Project Management Ready, Cisco Computer Hardware Basics, and Lean Six Sigma Yellow Belt. |
| 11 | Does he build mobile apps? | mobile, flutter, android, app | Yes, with Flutter and Dart: an e-commerce app, a Facebook-style clone, and E-Telly's route navigation. |
| 12 | Does he know backend development? | backend, api, server, node | Yes. Express/Node REST APIs with JWT auth and MongoDB, plus PHP and VB.NET systems. This site's own API is one example. |
| 13 | What is StayNest? | staynest, booking, airbnb | `TODO(rafael): confirm`. An Airbnb-style booking system in VB.NET he's currently building, including full-stack development and documentation. |
| 14 | Why does he build management systems? | why, story, apartment, property | He has helped manage his family's 17-unit rental since 2017 (tenants, leases, monthly statements), so he knows what these systems need. |
| 15 | Does he know cybersecurity? | security, cybersecurity, network | He's ITS Cybersecurity certified and has used OPNsense, Linux, Wireshark, NetworkMiner and Cisco Packet Tracer. |
| 16 | Can I see his code? | github, code, repo, source | Yes, at github.com/rafae8080. Each case file links to its repo when it's public. |
| 17 | How do I contact Rafael? | contact, email, message, reach | Use the contact form on this page, or email work.rafael22@gmail.com. LinkedIn works too. |
| 18 | Can I get his resume? | resume, cv | `TODO(rafael): "Ask through the contact form" or link a PDF without the phone number.` |
| 19 | What languages does he speak? | language, english, filipino, tagalog | English and Filipino. |
| 20 | How was this website built? | website, portfolio, built, this site | React + Vite + Tailwind on the front end, Express + MongoDB on the back end, deployed on Vercel. I'm a rule-based FAQ bot, with no AI and no cost. |
| 21 | What does he do for fun? | hobbies, fun, free time | Gym, basketball and taekwondo. He also used to play Mobile Legends, LoL, Call of Duty, NBA 2K and Tekken. |
| 22 | Does he do UI design? | design, figma, ui, ux | Yes. He designs in Figma and builds with Tailwind CSS. |
| 23 | Does he have project management skills? | project management, pmi, lean | PMI Project Management Ready and Lean Six Sigma Yellow Belt certified. |
| 24 | Who are you? | radyo, bot, who are you | I'm Radyo, Rafael's field radio. I answer common questions about his work. |

## D2. Hero copy options

- **A:** "I build systems that keep working when the network doesn't." *(E-Telly angle)*
- **B:** "I've managed 17 rental units since 2017. Now I build the systems behind places like it." *(origin angle)*
- **Subline (both):** "Full-stack developer (MERN · Next.js · PHP) and Flutter dev from Marikina. BSIT at National University,
  8× Dean's Lister."

## D3. About / story draft (Rafael approves the wording)

> Since 2017 I've helped run my family's apartment rental: 17 units, 14 residential and 3 commercial. I handle tenants,
> lease contracts, and the monthly statements of account. That's where I learned what a management system actually
> needs to do, because I was the person who needed one.
>
> Today I build those systems for clients, and bigger ones at school. My capstone, E-Telly, is a disaster preparedness
> platform where I built the entire web app, backend, and database. It was evaluated by 122 residents, 6 CDRRMO personnel,
> and 5 IT professionals.

Teaser version (Home): first paragraph + "Read the full story →".

## D4. Environment variables

| Where | Variable | Example / note |
|---|---|---|
| Server | `MONGO_URI` | MongoDB Atlas connection string (free M0 cluster) |
| Server | `JWT_SECRET` | long random string (`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) |
| Server | `CLIENT_ORIGIN` | `https://marinas-client.vercel.app` (comma-separate if several) |
| Server | `MAIL_USER` | your Gmail address (optional) |
| Server | `MAIL_APP_PASSWORD` | Gmail App Password (optional) |
| Server | `MAIL_TO` | where notifications go, e.g. work.rafael22@gmail.com (optional) |
| Client | `VITE_API_URL` | `https://<server-project>.vercel.app/api` |

## D5. Assets Rafael provides

| Asset | Where | Needed by |
|---|---|---|
| Portrait (good light, high-res) | `public/images/me/portrait.jpg` | Phase 5 |
| E-Telly screenshots (dashboard, live report, hazard map, Flutter navigation) | `public/images/projects/e-telly/` | Phase 4 |
| Apartment system / StayNest screenshots (sanitized) | `public/images/projects/<slug>/` | Phase 4 |
| Flutter app screenshots | `public/images/projects/<slug>/` | Phase 4 |
| Architecture diagrams (Figma/Excalidraw export, SVG or PNG) | `public/images/projects/<slug>/architecture.svg` | Phase 4 (optional) |
| Hobby photos (gym, basketball, taekwondo, gaming setup) | `public/images/hobbies/` | Phase 6 |
| Credly badge URLs | tell Claude | Phase 3/5 |
| Permission from E-Telly team + clients | — | before Phase 4 |

## D6. Troubleshooting prompts (paste when needed)

- **Looks generic:** `This section looks generic/AI-made. Re-check §B1.6 and redesign <section> using the Field Map motifs (§B1.4). Show me what you changed.`
- **Build broke:** `npm run build fails. Find the root cause, fix it without changing unrelated code, and re-run the Phase N verify list.`
- **Went out of scope:** `You changed things outside Phase N. List every file you touched, revert the out-of-scope changes, and keep only Phase N work.`
- **Made something up:** `<X> isn't in §B2 or the audit. Replace it with TODO(rafael) and list any other unverified claims.`
- **Mobile issues:** `Check every page at 360px and 768px. Fix horizontal scroll, overlapping text and tap targets under 44px.`
- **Resume after a break:** `Read CLAUDE.md and PORTFOLIO_PLAN.md. Run git status and git diff to see where Phase N stopped, then continue Phase N only.`
- **Review before commit:** `Review the uncommitted diff for bugs, secrets, leftover TODOs and console.logs. Report only, don't fix.`
