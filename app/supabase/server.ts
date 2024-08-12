import { cookies } from "next/headers";
import { cache } from "react";
import { getEnvSafe } from "../lib/utils";
import { createServerClient } from "@supabase/ssr";

const NEXT_PUBLIC_SUPABASE_URL = getEnvSafe("NEXT_PUBLIC_SUPABASE_URL");
const NEXT_PUBLIC_SUPABASE_ANON_KEY = getEnvSafe(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
);

export const createClient = cache((config?: { mutateCookies?: boolean }) => {
  const cookieStore = cookies();

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies) {
          if (!config?.mutateCookies) {
            return;
          }

          for (const cookie of cookies) {
            cookieStore.set(cookie);
          }
        },
      },
    }
  );
});
