"use client";
import { useState } from "react";
import { createToDo } from "./action";

export function CreateToDoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitAction = async () => {
    await createToDo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form className="flex flex-col gap-y-4" action={submitAction}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="text-black rounded p-2"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="text-black rounded p-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Create ToDo
      </button>
    </form>
  );
}
