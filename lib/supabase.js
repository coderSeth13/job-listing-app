import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
