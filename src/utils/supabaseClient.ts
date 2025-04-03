import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Ensure environment variables are loaded
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing!");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
