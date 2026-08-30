import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn('Supabase env vars missing — running in offline mode');
}

export const supabase = createClient(
  url ?? 'http://localhost',
  anonKey ?? 'placeholder',
  {
    auth: { persistSession: false },
  },
);

export const isSupabaseConfigured = Boolean(url && anonKey);
