with users as (
  select id from auth.users order by created_at asc limit 50
),
generated as (
  select u.id as user_id, gs.i
  from generate_series(1, 120) as gs(i)
  left join lateral (select id from users order by random() limit 1) as u on true
)
insert into public.articles (user_id, title, description, category, created_at, updated_at)
select g.user_id, f.title, f.description, f.category, date_trunc('second', f.created_at), date_trunc('second', now())
from generated g
cross join lateral public.factory_article(g.i) as f;

with users as (
  select id from auth.users order by created_at asc limit 50
),
generated as (
  select u.id as user_id, gs.i
  from generate_series(1, 120) as gs(i)
  left join lateral (select id from users order by random() limit 1) as u on true
)
insert into public.contacts (
  user_id, first_name, last_name, email, personal_phone, work_phone,
  address, birthday, contact_groups, role, created_at, updated_at
)
select
  g.user_id, f.first_name, f.last_name, f.email, f.personal_phone, f.work_phone,
  f.address, f.birthday, to_jsonb(f.contact_groups), f.role, date_trunc('second', f.created_at), date_trunc('second', now())
from generated g
cross join lateral public.factory_contact(g.i) as f;

with users as (
  select id from auth.users order by created_at asc limit 50
),
generated as (
  select u.id as user_id, gs.i
  from generate_series(1, 120) as gs(i)
  left join lateral (select id from users order by random() limit 1) as u on true
)
insert into public.money (
  user_id, sender, receiver, count, title, description, category, created_at, updated_at
)
select
  g.user_id, f.sender, f.receiver, f.count, f.title, f.description, f.category, date_trunc('second', f.created_at), date_trunc('second', now())
from generated g
cross join lateral public.factory_money(g.i) as f;
