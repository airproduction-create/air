-- ============================================================
-- AIR — Artificial Intelligence Revelations
-- Supabase Schema
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Daily Revelations ─────────────────────────────────────────
create table if not exists daily_revelations (
  id          uuid primary key default uuid_generate_v4(),
  date        date not null unique,
  headline    text not null,
  narrative   text not null,
  why         text not null,
  subject     text not null,
  year        integer not null,
  category    text not null check (category in ('campaign', 'personality', 'movement', 'artwork', 'film', 'innovation')),
  tags        text[] not null default '{}',
  created_at  timestamptz default now()
);

-- Enable RLS
alter table daily_revelations enable row level security;

-- Public read access
create policy "Anyone can read daily revelations"
  on daily_revelations for select
  using (true);

-- Enable real-time
alter publication supabase_realtime add table daily_revelations;

-- ── Quiz Responses ─────────────────────────────────────────────
create table if not exists quiz_responses (
  id                uuid primary key default uuid_generate_v4(),
  session_id        text not null,
  answers           jsonb not null default '{}',
  result_archetype  text not null check (result_archetype in ('architect', 'revealer', 'connector', 'provocateur')),
  share_token       text not null unique,
  created_at        timestamptz default now()
);

-- Enable RLS
alter table quiz_responses enable row level security;

-- Anyone can insert
create policy "Anyone can insert quiz responses"
  on quiz_responses for insert
  with check (true);

-- Read by share token only
create policy "Anyone can read by share token"
  on quiz_responses for select
  using (true);

-- ── Seed Data: Daily Revelations ───────────────────────────────
-- Run this to seed initial revelation data.
-- Dates are illustrative — adjust to your desired calendar.

insert into daily_revelations (date, headline, narrative, why, subject, year, category, tags) values
(
  current_date,
  'Just Do It Was Never About Sport',
  'In 1988, Nike hired Wieden+Kennedy to create a campaign for a company struggling to stay relevant against Reebok. Dan Wieden wrote five words inspired by Gary Gilmore''s last words: "Let''s do it." He changed it to "Just Do It." What emerged wasn''t a sports campaign — it was a philosophy of will, of defiance against inertia. Nike''s revenue grew from $877 million to $9.2 billion in the following decade.',
  'The campaign solved a problem deeper than brand awareness: it answered the question of what stops people. Not lack of ability — lack of permission. Three words gave an entire generation permission to begin. That''s not advertising. That''s a cultural operating system.',
  'Nike / Wieden+Kennedy',
  1988,
  'campaign',
  ARRAY['Nike', 'Wieden+Kennedy', 'Dan Wieden', 'Brand Identity', 'Copywriting']
),
(
  current_date + interval '1 day',
  'The Director Who Invented Fear as Entertainment',
  'When Jaws opened in June 1975, it rewired the entire business model of Hollywood. Steven Spielberg, aged 27, was three weeks over schedule and $3 million over budget, working with a mechanical shark that barely functioned. The shark''s failure forced him to imply its presence rather than show it. The unseen became more terrifying than anything he could have put on screen.',
  'Spielberg discovered that the imagination is more powerful than the image. By solving a practical crisis — a broken prop — he accidentally created one of cinema''s enduring techniques. Constraint revealed truth.',
  'Steven Spielberg',
  1975,
  'film',
  ARRAY['Spielberg', 'Hollywood', 'Blockbuster', 'Direction', 'Constraint']
),
(
  current_date + interval '2 days',
  'Ogilvy''s Whisper That Outsold Every Shout',
  'In 1958, David Ogilvy wrote an advertisement for Rolls-Royce with the headline: "At 60 miles an hour the loudest noise in this new Rolls-Royce comes from the electric clock." He found the line in an engineering report. The ad made Rolls-Royce one of the most aspirational brands in America through a single, precise, utterly believable detail.',
  'Ogilvy proved that truth, told specifically and with craft, beats any invented glamour. One true thing, precisely placed, creates more trust than ten polished promises.',
  'David Ogilvy',
  1958,
  'personality',
  ARRAY['Ogilvy', 'Copywriting', 'Rolls-Royce', 'Advertising Principles']
);

-- ── Indexes ────────────────────────────────────────────────────
create index if not exists idx_revelations_date on daily_revelations(date);
create index if not exists idx_quiz_share_token on quiz_responses(share_token);
create index if not exists idx_quiz_created_at on quiz_responses(created_at desc);

-- ── LinkedIn Revelations ───────────────────────────────────────
-- 52-week content calendar for automated LinkedIn publishing
create table if not exists revelations (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  creative_figure   text not null,
  category          text not null check (category in (
                      'creative-personality',
                      'landmark-campaign',
                      'cultural-movement',
                      'cinematic-breakthrough',
                      'design-philosophy',
                      'advertising-wisdom'
                    )),
  problem_statement text not null,
  insight           text not null,
  narrative         text not null,
  post_copy         text not null,
  publish_date      date unique,
  day_of_week       text,
  tone_tag          text not null check (tone_tag in ('standard', 'sunday')),
  image_prompt      text not null,
  image_url         text,
  published         boolean default false,
  publish_error     text,
  created_at        timestamptz default now()
);

-- Enable RLS
alter table revelations enable row level security;

-- Service role can do everything (used by Netlify function)
-- Public can read published entries only
create policy "Public can read published revelations"
  on revelations for select
  using (published = true);

-- Index for daily publish lookup
create index if not exists idx_revelations_publish_date on revelations(publish_date);
create index if not exists idx_revelations_published on revelations(published) where published = false;

-- ── Contact Inquiries ───────────────────────────────────────────
create table if not exists contact_inquiries (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  audience   text,
  context    text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table contact_inquiries enable row level security;

-- Anyone can insert (public contact form)
create policy "Anyone can insert contact inquiries"
  on contact_inquiries for insert
  with check (true);

-- Service role reads all (for admin / Netlify functions)
-- No public select policy — submissions are private

create index if not exists idx_contact_created_at on contact_inquiries(created_at desc);
