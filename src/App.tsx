import React, { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./features/theme/themeSlice";
import type { RootState } from "./app/store";
import { NavBar } from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { TodoList } from "./features/todos/TodoList";
import { TodoForm } from "./features/todos/TodoForm";
import NotFound from "./components/NotFound";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((s: RootState) => s.theme.mode);

  // Memoize theme so it only rebuilds when `mode` changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* resets background/text for light/dark */}
      <NavBar
        // e.g. add a toggle button in your NavBar
        onThemeToggle={() => dispatch(toggleTheme())}
        currentMode={mode}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/form" element={<TodoForm />} />
        <Route path="/todos/form/:id" element={<TodoForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};
