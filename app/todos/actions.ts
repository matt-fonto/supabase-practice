"use server";

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const supabase = createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase.from("todos").insert({
    title,
    description,
    user_id: user.id,
  });

  if (error) {
    throw new Error(`Error adding todo: ${error.message}`);
  }

  revalidatePath("/todos");
}

export async function deleteTodo(id: number) {
  const user = await checkSupabaseUser();
  const supabase = createClient();

  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id, // check if the user owns the todo
    id, // check if the todo id matches the one passed in
  });

  if (error) {
    throw new Error(`Error deleting todo: ${error.message}`);
  }

  revalidatePath("/todos");
}

export async function updateTodo(todo: Todo) {
  const user = await checkSupabaseUser();
  const supabase = createClient();

  console.log("todo", todo);

  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  });

  if (error) {
    throw new Error(`Error updating todo: ${error.message}`);
  }

  revalidatePath("/todos");
}

export async function checkSupabaseUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  return user;
}
