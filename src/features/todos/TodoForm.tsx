import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { addTodo, editTodo, fetchTodos } from "../../store/Todo/todosSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { TodoStatus } from "../../types/Task/types";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.nativeEnum(TodoStatus),
});

type TodoFormValues = z.infer<typeof todoSchema>;

const statuses: TodoStatus[] = [
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.DONE,
];

export const TodoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const todos = useAppSelector((state) => state.todos.items);
  const existing = id ? todos.find((t: { id: string }) => t.id === id) : null;
  const isAddMode = !existing;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    mode: "onChange",
    defaultValues: {
      title: existing?.title ?? "",
      description: existing?.description ?? "",
      status: existing?.status ?? TodoStatus.TODO,
    },
  });

  useEffect(() => {
    if (id && !existing) {
      dispatch(fetchTodos());
    } else {
      reset({
        title: existing?.title ?? "",
        description: existing?.description ?? "",
        status: existing?.status ?? TodoStatus.TODO,
      });
    }
  }, [existing, id, dispatch, reset]);

  const onSubmit = async (data: TodoFormValues) => {
    try {
      const payload: TodoFormValues = {
        ...data,
        status: data.status as TodoStatus,
      };

      const action = existing
        ? await dispatch(
            editTodo({ ...existing, ...payload, createdAt: existing.createdAt })
          )
        : await dispatch(addTodo(payload));

      unwrapResult(action);
      navigate("/todos");
    } catch (error) {
      console.error(error);
      alert("Error saving todo. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, bgcolor: "background.paper" }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isAddMode ? "Add TODO" : "Update TODO"}
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {statuses.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    disabled={isAddMode && status !== TodoStatus.TODO}
                  >
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/todos")}
              disabled={isSubmitting}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isSubmitting}
              sx={{ flex: 1 }}
            >
              {isAddMode ? "Add TODO" : "Update TODO"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
