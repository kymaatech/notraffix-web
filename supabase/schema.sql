-- Notraffix enquiries. Run once in the Supabase SQL editor.

create extension if not exists pgcrypto;

create sequence if not exists enquiry_ref_seq start 1001;

create table if not exists public.enquiries (
  id           uuid primary key default gen_random_uuid(),
  reference    text unique not null default ('NTX-' || nextval('enquiry_ref_seq')),
  created_at   timestamptz not null default now(),
  status       text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  name         text not null,
  email        text not null,
  phone        text,
  organisation text,
  org_type     text not null,
  services     text[] not null default '{}',
  location     text not null,
  kit          text,
  message      text not null,
  source_ip    text,
  user_agent   text
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Lock the table down: only the server (service role key) can read or write.
alter table public.enquiries enable row level security;
-- No policies are created on purpose: anon and authenticated users get no access.
-- Add a select policy later if you build an admin dashboard for signed-in staff.

-- If you already created the table from an earlier version of this file:
-- alter table public.enquiries add column if not exists kit text;
-- (the old scale/timeline columns can stay; the site no longer fills them)
