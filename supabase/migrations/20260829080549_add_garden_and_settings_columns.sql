/*
# Add garden + settings columns to child_profile

## Overview
Adds columns to support the garden/plant growth system and parent-configurable settings.

## Modified Tables
- `child_profile`:
  - `garden_items` (text[]) — items the child has placed in their garden world
  - `voice_enabled` (boolean, default true) — whether voice narration is on
  - `reduced_motion` (boolean, default false) — whether to reduce animations
  - `daily_limit_min` (int, default 30) — parent-set daily screen time limit in minutes

## Security
- No policy changes. Existing anon CRUD policy still applies.
*/

ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS garden_items text[] DEFAULT '{}';
ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS voice_enabled boolean DEFAULT true;
ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS reduced_motion boolean DEFAULT false;
ALTER TABLE child_profile ADD COLUMN IF NOT EXISTS daily_limit_min int DEFAULT 30;
