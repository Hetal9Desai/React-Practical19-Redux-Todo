import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
