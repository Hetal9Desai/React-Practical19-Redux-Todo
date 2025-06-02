import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../store/TODO/todosSlice";
import themeReducer from "../features/theme/themeSlice";

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
