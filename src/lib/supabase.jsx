import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hfbyctqhvfgudujgdgqp.supabase.co'; // Remplace par ton URL Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYnljdHFodmZndWR1amdkZ3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4NTc0MDIsImV4cCI6MjA1MTQzMzQwMn0.9g3N_aV4M5UWGYCuCLXgFnVjdDxIEm7TJqFzIk0r2Ho'; // Remplace par ta clé publique

export const supabase = createClient(supabaseUrl, supabaseAnonKey);