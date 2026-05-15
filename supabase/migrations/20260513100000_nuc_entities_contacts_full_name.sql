-- Datatable reads `full_name`; API returns raw rows from Supabase (no Laravel resource).
do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where
      table_schema = 'public'
      and table_name = 'contacts'
      and column_name = 'full_name'
  ) then
    execute $ddl$
      alter table public.contacts
      add column full_name text generated always as (
        nullif(
          trim(
            both
            from
              trim(coalesce(first_name, '')) || ' ' || trim(coalesce(last_name, ''))
          ),
          ''
        )
      ) stored
    $ddl$;
  end if;
end$$;
