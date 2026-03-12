-- Migration: add contact_inquiries table
-- Run this in the Supabase SQL Editor

create table if not exists contact_inquiries (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  audience   text,
  context    text not null,
  created_at timestamptz default now()
);

alter table contact_inquiries enable row level security;

create policy "Anyone can insert contact inquiries"
  on contact_inquiries for insert
  with check (true);

create index if not exists idx_contact_created_at on contact_inquiries(created_at desc);
