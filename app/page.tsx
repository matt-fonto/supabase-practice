import { createClient } from "@/utils/supabase/server";
import { CreateToDoForm } from "./interactions/createToDo/ui";

export default async function Home() {
  const supabase = createClient();
  const { data: todos, error } = await supabase.from("todos").select(); //removed rls (row level security)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateToDoForm />

      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </main>
  );
}
