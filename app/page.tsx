import { createClient } from "@/utils/supabase/server";
import { Separator } from "@/components/ui/separator";
import { TodoList } from "@/components/todo-list";

export default async function Home() {
  const supabase = createClient();
  const { data: todos, error } = await supabase.from("todos").select(); //removed rls (row level security)

  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todos
      </h1>

      <Separator className="w-full " />
      <TodoList todos={todos ?? []} />
    </section>
  );
}
