import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tfoipuycfvwsjiidgzkf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmb2lwdXljZnZ3c2ppaWRnemtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTc2NjIsImV4cCI6MjA0MzQ5MzY2Mn0.dAcSiIiwV6EGUn08iNCJ4NUIOeORVyA9cIyV8xDzUt8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
