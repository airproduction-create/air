-- ═══════════════════════════════════════════════════════════════════
-- AIR — Services / Who We Work With
-- Run this in the Supabase SQL Editor:
--   https://supabase.com/dashboard/project/_/sql/new
-- Public read-only; managed from the Supabase Table Editor (or SQL).
-- ═══════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- 1. Table ----------------------------------------------------------------
create table if not exists services (
  id           uuid primary key default uuid_generate_v4(),
  slug         text not null unique,          -- stable id, e.g. 'agencies'
  audience     text not null,                 -- e.g. 'Creative Agencies'
  title        text not null,
  description  text not null default '',
  capabilities text[] not null default '{}',
  icon         text not null default 'film',  -- one of: film | building | cpu
  sort_order   integer not null default 0,
  published    boolean not null default true,
  created_at   timestamptz default now()
);

-- 2. Row Level Security ---------------------------------------------------
alter table services enable row level security;

create policy "Anyone can read published services"
  on services for select
  using (published = true);

-- 3. Indexes --------------------------------------------------------------
create index if not exists idx_services_sort on services(sort_order asc);
create index if not exists idx_services_published on services(published);

-- 4. Seed: AIR's services -------------------------------------------------
insert into services (slug, audience, title, description, capabilities, icon, sort_order)
values
(
  'agencies', 'Creative Agencies', 'Production Without Compromise',
  'You have the idea. We have the infrastructure to make it real — at the pace modern campaigns demand, without the quality erosion that pace usually brings.',
  ARRAY[
    'Cinematic advertising and commercials',
    'Visual treatments and creative direction',
    'Trailer and teaser production',
    'AI-accelerated pre-production',
    'Post-production and colour grading',
    'Music, sound design and mix',
    'Rapid creative iteration'
  ],
  'film', 1
),
(
  'corporate', 'Corporate Communications', 'The Story You Haven''t Told Yet',
  'Most corporate communications describe what a company does. We help you articulate what a company means — to its people, its partners, and the culture it operates in.',
  ARRAY[
    'Training and instructional video',
    'Internal communications campaigns',
    'External brand and culture content',
    'Executive positioning films',
    'Brand identity and values content',
    'Annual report and ESG storytelling',
    'Event and keynote production'
  ],
  'building', 2
),
(
  'production', 'Production Companies', 'From Treatment to Screen',
  'AIR partners with production companies to bring intelligent creative tools to every stage of the process — from the first treatment to the final frame.',
  ARRAY[
    'Visual treatment development',
    'Trailer and promo production',
    'Visual character development',
    'Short film production',
    'Commercial and branded content',
    'AI-integrated production workflows',
    'Post-production and delivery'
  ],
  'cpu', 3
)
on conflict (slug) do nothing;
