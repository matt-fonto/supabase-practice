import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  const supabase = createClient(supabaseUrl, supabaseKey);

  let { data: todos, error } = await supabase.from("todos").select();

  console.log("error", error);
  console.log("todos", todos);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
