import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import API from "../../services/axiosInstance";
import type { Todo } from "../../types/Task/types";

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

const getTodos = () => API.get<Todo[]>("/");
const createTodo = (todo: Omit<Todo, "id" | "createdAt">) =>
  API.post<Todo>("/", todo);
const updateTodo = (todo: Todo) => API.put<Todo>(`/${todo.id}`, todo);
const deleteTodo = (id: string) => API.delete(`/${id}`);

export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
  const res = await getTodos();
  return res.data;
});

export const addTodo = createAsyncThunk(
  "todos/add",
  async (todo: Omit<Todo, "id" | "createdAt">) => {
    const res = await createTodo(todo);
    return res.data;
  }
);

export const editTodo = createAsyncThunk("todos/edit", async (todo: Todo) => {
  const res = await updateTodo(todo);
  return res.data;
});

export const removeTodo = createAsyncThunk(
  "todos/remove",
  async (id: string) => {
    await deleteTodo(id);
    return id;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch todos";
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const ix = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (ix !== -1) {
          state.items[ix] = action.payload;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
