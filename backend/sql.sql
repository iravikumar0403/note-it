-- create
-- or replace function get_folders() returns table(
--   id uuid,
--   created_at timestamp,
--   folder_name varchar,
--   user_id uuid,
--   notes_count numeric
-- ) as $$
--    select folders.id, folders.created_at, folder_name, folders.user_id ,count(notes.id) as notes_count from notes right join folders on folders.id = notes.folder_id group by folders.id order by created_at desc
-- $$ language sql;


-- CREATE FOLDERS TABLE
-- create table if not exists public.folders (
--   id uuid not null primary key default uuid_generate_v4(),
--   user_id uuid references auth.users on delete cascade not null,
--   folder_name varchar not null,
--   create_at timestamp with time zone default timezone('utc' :: text, now()) not null
-- )


-- 
--   BEGIN
--     INSERT INTO public.folders (user_id)
--     VALUES (NEW.id);
--     RETURN NEW;
--   END;
  


-- CREATE NOTES TABLE
-- create table if not exists public.notes (
--     id uuid not null primary key DEFAULT uuid_generate_v4(),
--     folder_id uuid references public.folders on delete cascade not null,
--     user_id uuid references auth.users on delete cascade not null,
--     created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
--     title varchar not null,
--     tags varchar[],
--     content json,
--     text_content varchar,
--     html_content varchar
-- );