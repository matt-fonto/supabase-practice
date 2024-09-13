"use server";

import { createClient } from "@/utils/supabase/server";

export async function createToDo(title: string, description: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, description }])
    .select();

  return { data, error };
}
