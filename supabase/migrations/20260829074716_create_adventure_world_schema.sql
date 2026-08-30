/*
# Adventure World — Core Schema

## Overview
Single-tenant children's app (no sign-in). One child profile per device, persisted via Supabase.
Stores the child's avatar, pet, progress, stars, badges, adventure history, and creations.

## New Tables
1. `child_profile` — the single child using this device (avatar config, pet, name, age, stars, streak)
2. `adventure_log` — one row per completed daily adventure (date, theme, missions done, stars earned)
3. `creations` — artwork and stories the child creates (type, payload JSON, created_at)
4. `unlocks` — worlds, pets, badges, collectibles the child has earned (category, key, unlocked_at)
5. `activity_stats` — per-skill counters (math, reading, logic, science, creativity, vocabulary)

## Security
- No auth / sign-in screen → all policies use `TO anon, authenticated` with `USING (true)`.
- Data is intentionally local to this single device/app instance (single-tenant).
- RLS enabled on every table.
*/

-- 1. Child profile (single row per device)
CREATE TABLE IF NOT EXISTS child_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Explorer',
  age int2 NOT NULL DEFAULT 6,
  avatar jsonb NOT NULL DEFAULT '{}'::jsonb,
  pet jsonb NOT NULL DEFAULT '{}'::jsonb,
  stars int NOT NULL DEFAULT 0,
  streak int NOT NULL DEFAULT 0,
  last_adventure_date date,
  total_adventures int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE child_profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_child_profile" ON child_profile;
CREATE POLICY "anon_crud_child_profile" ON child_profile
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- 2. Adventure log
CREATE TABLE IF NOT EXISTS adventure_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  adventure_date date NOT NULL,
  theme text NOT NULL,
  missions_completed int NOT NULL DEFAULT 0,
  stars_earned int NOT NULL DEFAULT 0,
  badge text,
  payload jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE adventure_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_adventure_log" ON adventure_log;
CREATE POLICY "anon_crud_adventure_log" ON adventure_log
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- 3. Creations (drawings, stories, built worlds)
CREATE TABLE IF NOT EXISTS creations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_creations" ON creations;
CREATE POLICY "anon_crud_creations" ON creations
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- 4. Unlocks (worlds, pets, badges, collectibles)
CREATE TABLE IF NOT EXISTS unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  key text NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE (category, key)
);

ALTER TABLE unlocks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_unlocks" ON unlocks;
CREATE POLICY "anon_crud_unlocks" ON unlocks
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);

-- 5. Activity stats (per-skill counters)
CREATE TABLE IF NOT EXISTS activity_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill text NOT NULL UNIQUE,
  count int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE activity_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_crud_activity_stats" ON activity_stats;
CREATE POLICY "anon_crud_activity_stats" ON activity_stats
  FOR ALL TO anon, authenticated
  USING (true) WITH CHECK (true);
