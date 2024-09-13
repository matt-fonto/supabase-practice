"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const supabase = createClient();

  const title = formData.get("title") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { error } = await supabase.from("todos").insert({
    title,
    user_id: user.id,
  });

  if (error) {
    throw new Error(`Error adding todo: ${error.message}`);
  }

  revalidatePath("/todos");
}

// 51:56
