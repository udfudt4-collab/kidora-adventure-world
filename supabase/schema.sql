-- =========================================================
-- Adventure World — Complete Database Schema & RLS Policies
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- =========================================================

-- 1. Child profile (single child record per device / user)
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
  garden_items text[] DEFAULT '{}',
  voice_enabled boolean DEFAULT true,
  reduced_motion boolean DEFAULT false,
  daily_limit_min int DEFAULT 30,
  notifications_enabled boolean DEFAULT true,
  reminder_time text DEFAULT '08:00',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Migration support for existing tables:
ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS notifications_enabled boolean DEFAULT true;
ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS reminder_time text DEFAULT '08:00';

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
