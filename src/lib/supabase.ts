import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Safe check for Supabase credentials to prevent app crash during demo
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. The system is running in Demo Mode. To make it real, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

// We use an empty string fallback but handle potential errors gracefully
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {} as any; // Return mock object to prevent crash if not configured

