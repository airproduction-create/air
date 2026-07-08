# AIR — Artificial Intelligence Revelations

Marketing site for **AIR**, an AI-native content studio. Dark, editorial, large-type
design (Arqos-inspired) with a single orange accent, built as a one-page scroll.

- **Live:** https://airstu.netlify.app
- **Stack:** Vite · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · React Router
- **Backend:** Supabase (Postgres) · Netlify Functions
- **Fonts:** Switzer (display + body, via Fontshare) · JetBrains Mono (labels)
- **Accent:** `#FF5700`

---

## Local development

```bash
npm install
cp .env.example .env.local     # fill in your Supabase keys (see below)
npm run dev                    # http://localhost:5173
```

Other scripts:

```bash
npm run build     # type-check (tsc -b) + production build to dist/
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

The site works **without** any environment variables — every data source falls back to
bundled content in `src/data/`. Supabase just makes that content live-editable.

---

## Environment variables

Copy `.env.example` → `.env.local` for local dev, and add the same keys in
**Netlify → Site settings → Environment variables** for production.

| Variable | Where | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL` | browser | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | browser | Public anon key (read-only content) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Netlify Functions | Server-side writes (contact form, LinkedIn pipeline) |
| `LINKEDIN_*`, `FREEPIK_API_KEY`, `RESEND_API_KEY`, … | Netlify Functions | Optional LinkedIn auto-publish + alerts |

Only the two `VITE_`-prefixed keys are needed for the public site to read content.

---

## Managing content

All content has a **Supabase-first, local-fallback** pattern: the site renders bundled
data instantly, then swaps in live Supabase data when the tables exist and are reachable.

### Portfolio / Work (videos & images)

Powered by the **`portfolio_items`** Supabase table
(`src/hooks/usePortfolio.ts` → `src/lib/supabase.ts`), with a fallback in
`src/data/portfolio.ts`.

**To add or edit work — no code needed:** open the Supabase **Table Editor →
`portfolio_items`** and add a row.

| Column | Notes |
|---|---|
| `slug` | Stable unique id, e.g. `azande-coffee` |
| `title`, `client`, `category` | Shown on the card |
| `description`, `narrative`, `impact` | Copy in the expanded case study |
| `tags` | Postgres text array, e.g. `{Commercial,Cinematic}` |
| `vimeo_id` | The number from `vimeo.com/<id>`. Leave **empty** for an image-only project |
| `thumbnail` | `https://vumbnail.com/<vimeo_id>.jpg` for video, or any image URL / `/local.jpg` |
| `year`, `featured` | Metadata |
| `sort_order` | Lower shows first |
| `published` | Uncheck to hide without deleting |

Videos are hosted on **Vimeo** and embedded by ID — they are never stored in the repo.
Images can be an external URL or a file placed in `public/` (referenced as `/name.jpg`).

To edit the bundled fallback list instead, change `src/data/portfolio.ts`.

### Journal (Daily Revelation)

Live from the **`daily_revelations`** table (`src/hooks/useDailyRevelation.ts`), with
real-time updates and a local fallback in `src/data/revelations.ts`.

### Services (Who We Work With)

Powered by the **`services`** Supabase table (`src/hooks/useServices.ts`), with a
fallback in `src/data/services.ts`. Edit rows in the Supabase **Table Editor →
`services`**: `audience`, `title`, `description`, `capabilities` (text array), `icon`
(`film` | `building` | `cpu`), `sort_order`, `published`.

### FAQ

Static content in `src/components/sections/FAQ.tsx` (edit + redeploy to change).

### Hero image

The hero portrait is a CSS placeholder in `src/components/sections/Hero.tsx`. Drop a
black-and-white photo into `public/` (e.g. `public/hero.jpg`) and replace the
placeholder block with an `<img … className="grayscale object-cover" />`.

---

## Supabase setup

The schema lives in `supabase/`:

- `supabase/schema.sql` — full canonical schema (all tables + RLS policies)
- `supabase/migrations/` — incremental migrations, run in order in the
  **Supabase SQL Editor**:
  - `20260312_contact_inquiries.sql`
  - `20260315_revelations.sql`
  - `20260708_portfolio.sql` — **portfolio table + seeds AIR's existing 3 films**
  - `20260708_services.sql` — **services table + seeds AIR's 3 service offerings**

To populate a fresh project, run the migrations (or paste `schema.sql`) in the SQL
Editor. Tables are public **read-only** via Row Level Security; writes happen through
the Table Editor or the service-role key in Netlify Functions.

---

## Project structure

```
src/
├── components/
│   ├── layout/        Header, Footer, Layout, custom cursor
│   ├── sections/      Hero, Statement, Services, About, Portfolio, FAQ, Contact
│   ├── quiz/          "Reveal Yourself" quiz
│   ├── revelation/    Daily Revelation (Journal)
│   └── ui/            RevealText, Tag, FloatingGeometry, …
├── data/              Bundled fallback content (portfolio, services, revelations, quiz)
├── hooks/             usePortfolio, useDailyRevelation, useCursor, …
├── lib/               supabase client + queries, utils
└── pages/             Home, ShareResult
netlify/functions/     contact form, LinkedIn auto-publish
supabase/              schema + migrations
```

Design tokens (colors, fonts) are defined in **`vite.config.ts`** (the active Tailwind
config; `tailwind.config.js` mirrors it for editor tooling).

---

## Deployment

Auto-deploys to **Netlify** (project `airstu`) on push. Build command `npm run build`,
publish directory `dist` (see `netlify.toml`). SPA routes and Netlify Functions are
configured there. Remember to set the environment variables in the Netlify dashboard.
