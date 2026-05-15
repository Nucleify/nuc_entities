drop function if exists public.factory_article(integer);

create or replace function public.factory_article(i integer)
returns table(title text, description text, category text, created_at timestamptz)
language sql
as $$
  select
    format('Article %s', i),
    format('Generated article description %s', i),
    (array['tech', 'finance', 'other'])[(i % 3) + 1],
    date_trunc('second', now() - ((i % 365) || ' days')::interval);
$$;

drop function if exists public.factory_contact(integer);

create or replace function public.factory_contact(i integer)
returns table(
  first_name text,
  last_name text,
  email text,
  personal_phone text,
  work_phone text,
  address text,
  birthday date,
  contact_groups text,
  role text,
  created_at timestamptz
)
language sql
as $$
  select
    format('First%s', i),
    format('Last%s', i),
    format('contact_%s@nucleify.local', i),
    lpad(((500000000 + i) % 999999999)::text, 9, '0'),
    lpad(((600000000 + i) % 999999999)::text, 9, '0'),
    format('Street %s, City', i),
    (current_date - ((i % 12000) || ' days')::interval)::date,
    (array['friends', 'work', 'family'])[(i % 3) + 1],
    (array['user', 'tech', 'admin'])[(i % 3) + 1],
    date_trunc('second', now() - ((i % 365) || ' days')::interval);
$$;

drop function if exists public.factory_money(integer);

create or replace function public.factory_money(i integer)
returns table(
  sender text,
  receiver text,
  count integer,
  title text,
  description text,
  category text,
  created_at timestamptz
)
language sql
as $$
  select
    format('PL%s', lpad((10000000000000000000000000 + i)::text, 26, '0')),
    format('PL%s', lpad((20000000000000000000000000 + i)::text, 26, '0')),
    ((i * 37) % 100000) - 50000,
    format('Transfer %s', i),
    format('Generated transfer description %s', i),
    (array['salary', 'invoice', 'other'])[(i % 3) + 1],
    date_trunc('second', now() - ((i % 365) || ' days')::interval);
$$;
