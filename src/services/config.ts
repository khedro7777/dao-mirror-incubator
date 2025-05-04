
import { createClient } from '@supabase/supabase-js';

// Initialize config variables from environment
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const payloadCmsUrl = import.meta.env.VITE_PAYLOAD_CMS_URL || 'http://localhost:3000';

// Create Supabase client only if URL is available
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Helper to check if Supabase is configured
export const checkSupabaseConfig = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
};
