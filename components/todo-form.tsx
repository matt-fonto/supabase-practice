"use client";

import { addTodo } from "@/app/todos/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";

function FormContent() {
  return (
    <>
      <Textarea
        minLength={4}
        name="title"
        required
        placeholder="Add a new todo"
      />
      <Textarea name="description" placeholder="Add a description" />

      <Button type="submit" size="icon" className="min-w-10">
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card>
      <CardContent className="p-3">
        <form
          className="flex gap-4"
          ref={formRef}
          action={async (data) => {
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
