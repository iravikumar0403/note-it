import { createClient } from "@supabase/supabase-js";

const { REACT_APP_SUPABASE_CLIENT, REACT_APP_PUBLIC_KEY } = process.env;

const supabase = createClient(
  REACT_APP_SUPABASE_CLIENT || "",
  REACT_APP_PUBLIC_KEY || ""
);

export { supabase };
