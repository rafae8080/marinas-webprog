# CLAUDE.md

This repo is Rafael Marinas's portfolio (MERN). The full build guide is **`PORTFOLIO_PLAN.md`**. Read it before
starting any phase, and follow "Part A — Rules for Claude Code" in it.

## Non-negotiable rules
1. **Git: Rafael commits and pushes himself.** Never run `git add`, `git commit`, `git push`, `git merge`, `git rebase`,
   `git reset`, `git tag`, `git stash`, `git checkout -b`/`git switch -c`, or `gh pr create`. Read-only git (`status`, `diff`, `log`, `branch`)
   is fine. At the end of a phase, print a suggested commit message and the commands for Rafael to run.
2. **No Claude attribution anywhere.** No `Co-Authored-By: Claude`, no "Generated with Claude Code", no AI credit lines
   in commit messages, PR text, code comments, READMEs, or the site footer.
3. **One phase per session/request.** Stop when that phase's "Verify" list passes and report the results.
4. **Never invent facts** (metrics, projects, dates, clients, testimonials). Use `PORTFOLIO_PLAN.md` §B2 or leave `TODO(rafael): …`.
5. **Design tokens only** (§B1). No `stone-*`/`zinc-*`/raw hex in new components. Follow the guardrails in §B1.6.
6. **$0 budget.** No paid APIs or services. The chatbot (RMO) may use a **free-tier** OpenAI-compatible LLM API
   (Rafael's decision): key on the server only, answers grounded in `marinas-server/data/rmo-facts.js` + the FAQs,
   and it must fall back to the FAQ list when the AI is off or unavailable. Never enable paid billing.
7. **Never commit secrets.** `.env` stays gitignored. Document new variables in `marinas-server/.env.example`.

## Project layout
- `marinas-client/`: React 19 + Vite 7 + Tailwind v4 (`@tailwindcss/vite`), React Router 7, MUI (dashboard only), Leaflet
- `marinas-server/`: Express 5 + Mongoose 9, JWT auth, deployed to Vercel as a serverless function (`vercel.json`)

## Commands
- Client: `cd marinas-client && npm run dev` (http://localhost:5173), `npm run build`, `npm run lint`
- Server: `cd marinas-server && npm run dev` (http://localhost:5000, needs `.env`)
