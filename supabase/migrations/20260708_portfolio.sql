-- ═══════════════════════════════════════════════════════════════════
-- AIR — Portfolio / Work items
-- Run this in the Supabase SQL Editor:
--   https://supabase.com/dashboard/project/_/sql/new
-- Public read-only; managed from the Supabase Table Editor (or SQL).
-- ═══════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- 1. Table ----------------------------------------------------------------
create table if not exists portfolio_items (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,          -- stable id used in the URL/keys
  title       text not null,
  client      text not null,
  category    text not null,
  description text not null default '',
  narrative   text not null default '',
  impact      text not null default '',
  tags        text[] not null default '{}',
  thumbnail   text not null default '',       -- image URL (or https://vumbnail.com/<vimeo_id>.jpg)
  vimeo_id    text,                           -- null = image-only project
  year        integer not null,
  featured    boolean not null default false,
  sort_order  integer not null default 0,     -- lower shows first
  published   boolean not null default true,
  created_at  timestamptz default now()
);

-- 2. Row Level Security ---------------------------------------------------
alter table portfolio_items enable row level security;

-- Public can read published items only
create policy "Anyone can read published portfolio items"
  on portfolio_items for select
  using (published = true);

-- (Writes happen via the Supabase dashboard / service role — no public insert.)

-- 3. Indexes --------------------------------------------------------------
create index if not exists idx_portfolio_sort on portfolio_items(sort_order asc);
create index if not exists idx_portfolio_published on portfolio_items(published);

-- 4. Seed: AIR's existing work -------------------------------------------
insert into portfolio_items
  (slug, title, client, category, description, narrative, impact, tags, thumbnail, vimeo_id, year, featured, sort_order)
values
(
  'azande-coffee', 'Azande', 'Azande Coffee', 'Commercial',
  'A coffee ad that treats the product as a meditation, not a commodity.',
  'Azande approached us for a commercial. We made something closer to a ritual. South African specialty coffee occupies a strange position — it exists in a market flooded with aspirational brand language, yet the product itself is deeply, specifically local. We stripped back everything that wasn''t true. What remained was the cup, the hands, the light through the steam, and a silence that lets the viewer complete the thought. Thirty seconds. No voice-over. Every frame earned.',
  'Campaign ran across digital and OOH in Gauteng and the Western Cape. Brand recall in post-campaign research increased significantly among the specialty coffee segment. The ad continues to run as the brand''s primary commercial asset.',
  ARRAY['Commercial', 'CPG', 'Cinematic', 'Product'],
  'https://vumbnail.com/1199514877.jpg', '1199514877', 2024, true, 1
),
(
  'bishop-mosa-sono', 'Bishop', 'Bishop Mosa Sono', 'Origin Story',
  'An origin story that refuses easy hagiography.',
  'Origin stories about public figures follow a predictable arc: humble beginnings, defining struggle, triumphant emergence. We were not interested in that arc. Bishop Mosa Sono is one of South Africa''s most consequential faith leaders, and the story of how he became who he is contains contradictions, detours, and questions that a comfortable narrative would paper over. We gave those their full weight. The result is less a profile than a portrait — honest enough to sit with its own unresolved tension.',
  'Distributed through the church''s digital network and social channels. First-week engagement exceeded all previous content benchmarks. The film has been cited in theological education circles as an example of faith-community storytelling that doesn''t sacrifice intellectual honesty.',
  ARRAY['Documentary', 'Portrait', 'Origin Story', 'Faith'],
  'https://vumbnail.com/1199516622.jpg', '1199516622', 2024, true, 2
),
(
  'padral', 'Padral', 'Padral', 'Brand Film',
  'A brand introduction that earns its confidence.',
  'New brands face a choice: announce themselves loudly, or let the work announce them. Padral chose the latter. We built a film that opens with the problem — not the solution. The assumption was that an audience capable of recognising the problem would be sophisticated enough to appreciate a solution presented without overselling. The square format was deliberate: this lives on feeds, not screens. It needed to stop the scroll, not fill a cinema. Different disciplines, same rigour.',
  'Deployed as primary launch content across social and owned channels. Engagement metrics outperformed the category benchmark in the first month. The restrained approach established a visual language the brand has maintained across subsequent campaigns.',
  ARRAY['Brand Film', 'Launch', 'Social', 'Identity'],
  'https://vumbnail.com/1199518698.jpg', '1199518698', 2025, true, 3
)
on conflict (slug) do nothing;
