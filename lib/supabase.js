import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// .env.local тохируулаагүй бол null болно (Roadmap.jsx дээр алдаа харуулна)
export const supabase = url && key ? createClient(url, key) : null;
