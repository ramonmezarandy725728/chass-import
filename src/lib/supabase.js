import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://plfktxhbqferbsyykjwj.supabase.co";

const supabaseKey =
  "sb_publishable_AZ1a2mh2_YjmFCkKh7xaaw_rKrSyydQ";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);