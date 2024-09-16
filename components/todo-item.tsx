"use client";

import { deleteTodo, updateTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/custom";
import { Pen, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { TodoOptimisticUpdate } from "./todo-list";
import { useState } from "react";

export function TodoItem({
  todo,
  optimisticUpdate,
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  return (
    <form>
      <TodoCard todo={todo} optimisticUpdate={optimisticUpdate} />
    </form>
  );
}

export function TodoCard({
  todo,
  optimisticUpdate,
}: {
  todo: Todo;
  optimisticUpdate: TodoOptimisticUpdate;
}) {
  const { pending } = useFormStatus();
  const [checked, setChecked] = useState(todo.is_complete); // instead of using useOptimistic, on checks we can use simple states

  return (
    <Card
      className={cn("w-full", {
        "opacity-50": pending,
      })}
    >
      <CardContent className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center justify-center ml-4">
          <span className="size-10 flex items-center justify">
            <Checkbox
              disabled={pending}
              checked={Boolean(checked)}
              onCheckedChange={async (checked) => {
                if (checked === "indeterminate") {
                  return;
                }

                setChecked(checked);

                await updateTodo({
                  ...todo,
                  is_complete: checked,
                });
              }}
            />
          </span>

          <div className="flex items-center justify-center gap-x-4">
            <p>{todo.title}</p> |{" "}
            <p className="text-gray-500">
              {todo.description ? todo.description : "No description provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-gray-100 rounded-md shadow-inner border border-gray-300">
          <Button variant="ghost" size="icon">
            <Pen className="h-5 w-5" />
            <span className="sr-only">Edit Todo</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="submit"
            disabled={pending}
            // because it's inside a form
            formAction={async () => {
              optimisticUpdate({ action: "delete", todo });

              await deleteTodo(todo.id);
            }}
          >
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Delete Todo</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
