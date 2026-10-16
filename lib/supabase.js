import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nvbjctltnrhhnuqnmjdv.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52YmpjdGx0bnJoaG51cW5tamR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4ODQyNDYsImV4cCI6MjEwNzQ2MDI0Nn0.lGPm9U9JXT5FI6Yx3exGPrndoMclEdm3hgJFlluFn-I";

export const supabase = createClient(url, key);
