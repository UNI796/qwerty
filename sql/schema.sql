-- Supabase > SQL Editor дээр энэ файлыг эхлээд ажиллуулна.

create table if not exists public.topics (
  id          integer primary key,
  position    integer not null,                 -- харуулах дараалал
  title       text    not null,
  category    text    not null,                 -- шүүлтүүрт ашиглана
  description text    not null,
  subtopics   text[]  not null default '{}',    -- дэд сэдвүүдийн жагсаалт
  goal        text    not null,
  link        text,
  status      text    not null default 'todo'
              check (status in ('todo', 'done')) -- todo = Хийгээгүй, done = Хийсэн
);

-- Row Level Security асаана
alter table public.topics enable row level security;

drop policy if exists "Хүн бүр сэдвүүдийг уншиж болно" on public.topics;
create policy "Хүн бүр сэдвүүдийг уншиж болно"
  on public.topics for select
  using (true);

drop policy if exists "Хүн бүр status-ыг шинэчилж болно" on public.topics;
create policy "Хүн бүр status-ыг шинэчилж болно"
  on public.topics for update
  using (true)
  with check (true);

-- Зөвхөн status баганыг өөрчлөх эрхтэй (title гэх мэтийг өөрчилж болохгүй)
revoke all on public.topics from anon, authenticated;
grant select on public.topics to anon, authenticated;
grant update (status) on public.topics to anon, authenticated;
