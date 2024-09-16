"use client";

import { addTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { Todo } from "@/types/custom";

function FormContent() {
  const { pending } = useFormStatus();

  return (
    <>
      <Textarea
        disabled={pending}
        minLength={4}
        name="title"
        required
        placeholder="Add a new todo"
      />
      <Textarea name="description" placeholder="Add a description" />

      <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm({
  optimisticUpdate,
}: {
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card>
      <CardContent className="p-3">
        <form
          className="flex gap-4"
          ref={formRef}
          action={async (data) => {
            // this is fake data, only for the optimistic update
            // Once the server is done updating, the real data will be returned
            const newTodo: Todo = {
              id: -1,
              created_at: "",
              title: data.get("title") as string,
              description: data.get("description") as string,
              is_complete: null,
              user_id: null,
            };

            optimisticUpdate({ action: "create", todo: newTodo });
            await addTodo(data);

            formRef.current?.reset();
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
