-- Align with dashboards / seeders using jsonb arrays; no-op when already jsonb.
do $$
declare
  dt text;
begin
  select c.data_type into dt
  from information_schema.columns c
  where
    c.table_schema = 'public'
    and c.table_name = 'contacts'
    and c.column_name = 'contact_groups';

  if dt in ('text', 'character varying') then
    execute $ddl$
      alter table public.contacts
      alter column contact_groups type jsonb
      using (
        case
          when contact_groups is null then '[]'::jsonb
          when btrim(contact_groups::text) = '' then '[]'::jsonb
          else contact_groups::text::jsonb
        end
      );
    $ddl$;
  end if;
end$$;
