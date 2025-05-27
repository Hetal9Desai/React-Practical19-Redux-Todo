import axios from "axios";
import type { Todo } from "../types/Task/types";

const API = axios.create({
  baseURL: "https://cada098223b17ac7900d.free.beeceptor.com/todo/",
  headers: { "Content-Type": "application/json" },
});

export const getTodos = () => API.get<Todo[]>("/");
export const createTodo = (todo: Omit<Todo, "id" | "createdAt">) =>
  API.post<Todo>("/", todo);
export const updateTodo = (todo: Todo) => API.put<Todo>(`/${todo.id}`, todo);
export const deleteTodo = (id: string) => API.delete(`/${id}`);
