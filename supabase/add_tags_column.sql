-- Adds a `tags` column to profile_knowledge for free-form labels
-- (e.g. "Polywelding", "ISO", "Machinery"). Used by the admin UI and
-- by Lucas Bot's knowledge search to improve matching.

alter table profile_knowledge
  add column if not exists tags text[] not null default '{}';

create index if not exists profile_knowledge_tags_idx
  on profile_knowledge using gin (tags);
