"use client";

import { Todo } from "@/types/custom";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { useOptimistic } from "react";

export type Action = "delete" | "update" | "create";
export type TodoReducer = { action: Action; todo: Todo };
export type TodoOptimisticUpdate = (action: TodoReducer) => void;

export function toDoReducer(state: Array<Todo>, { action, todo }: TodoReducer) {
  switch (action) {
    case "create":
      return [todo, ...state];
    case "delete":
      return state.filter((t) => t.id !== todo.id);
    case "update":
      return state.map((t) => (t.id === todo.id ? todo : t));
    default:
      return state;
  }
}

export function TodoList({ todos }: { todos: Array<Todo> }) {
  // useOptimistic is quite cool for a snappy feel
  // useOptimistic: adds to the ui before the server responds
  const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(
    todos,
    toDoReducer
  );

  return (
    <>
      <TodoForm optimisticUpdate={optimisticTodosUpdate} />
      <div className="w-full flex flex-col gap-4">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              optimisticUpdate={optimisticTodosUpdate}
            />
          );
        })}
      </div>
    </>
  );
}
