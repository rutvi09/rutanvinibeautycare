create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  whatsapp text not null,
  city text not null,
  instagram text,
  created_at timestamptz not null default now()
);

alter table public.submissions enable row level security;

revoke all on table public.submissions from anon, authenticated;
grant usage on schema public to anon;
grant insert on table public.submissions to anon;

drop policy if exists "Allow public form submissions" on public.submissions;
create policy "Allow public form submissions"
  on public.submissions
  for insert
  to anon
  with check (true);
