import { createClient } from "./supabase/server";

export default function Home() {
  const supabase = createClient();

  console.log("supabase", supabase);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
