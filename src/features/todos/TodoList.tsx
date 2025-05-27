import React, { useEffect, useState, useMemo, type ChangeEvent } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  useTheme,
  alpha,
  type Theme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTodos, removeTodo, editTodo } from "./todosSlice";
import { useNavigate } from "react-router-dom";
import TaskFilter, { type FilterKey } from "./TaskFilter";
import TaskStatusLegend from "./TaskStatusLegend";
import type { Todo } from "../../types/Task/types";
import { TodoStatus } from "../../types/Task/types";
import { unwrapResult } from "@reduxjs/toolkit";

const statuses: TodoStatus[] = [
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.DONE,
];

const getStatusStyles = (theme: Theme, status: TodoStatus) => {
  switch (status) {
    case TodoStatus.TODO:
      return {
        backgroundColor: alpha(theme.palette.error.main, 0.25),
        border: `1px solid ${theme.palette.error.main}`,
      };
    case TodoStatus.IN_PROGRESS:
      return {
        backgroundColor: alpha(theme.palette.warning.main, 0.25),
        border: `1px solid ${theme.palette.warning.main}`,
      };
    case TodoStatus.DONE:
      return {
        backgroundColor: alpha(theme.palette.success.main, 0.25),
        border: `1px solid ${theme.palette.success.main}`,
      };
    default:
      return {};
  }
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const { items: tasks, loading } = useAppSelector((state) => state.todos);

  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    title: "",
    desc: "",
    both: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: FilterKey
  ) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const clearAllFilters = () =>
    setFilters({ title: "", desc: "", both: "", status: "" });

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task: { title: string; description: string; status: string }) => {
          const titleMatch = filters.title
            ? task.title.toLowerCase().includes(filters.title.toLowerCase())
            : true;
          const descMatch = filters.desc
            ? task.description
                .toLowerCase()
                .includes(filters.desc.toLowerCase())
            : true;
          const bothMatch = filters.both
            ? task.title.toLowerCase().includes(filters.both.toLowerCase()) ||
              task.description
                .toLowerCase()
                .includes(filters.both.toLowerCase())
            : true;
          const statusMatch = filters.status
            ? task.status === filters.status
            : true;
          return titleMatch && descMatch && bothMatch && statusMatch;
        }
      ),
    [tasks, filters]
  );

  const handleStatusChange = async (task: Todo, newStatus: TodoStatus) => {
    try {
      const result = await dispatch(editTodo({ ...task, status: newStatus }));
      unwrapResult(result);
    } catch (err) {
      console.error(err);
    }
  };

  const getNoTasksMessage = () => {
    if (filters.title && filteredTasks.length === 0)
      return `No tasks found for title: "${filters.title}"`;
    if (filters.desc && filteredTasks.length === 0)
      return `No tasks found for description: "${filters.desc}"`;
    if (filters.both && filteredTasks.length === 0)
      return `No tasks found matching title or description: "${filters.both}"`;
    if (filters.status && filteredTasks.length === 0)
      return `No tasks found with status: "${filters.status}"`;
    return "No tasks available.";
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <Typography variant="subtitle1" gutterBottom>
          Status Legend
        </Typography>
        <TaskStatusLegend />
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TaskFilter
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </Box>

          <Button
            variant="outlined"
            onClick={clearAllFilters}
            sx={{ height: 40, whiteSpace: "nowrap" }}
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, borderRadius: 2 }} elevation={1}>
        {loading ? (
          <Typography>Loading…</Typography>
        ) : filteredTasks.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="textSecondary">{getNoTasksMessage()}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
            }}
          >
            {filteredTasks.map((task: Todo) => (
              <Card
                key={task.id}
                variant="outlined"
                sx={getStatusStyles(theme, task.status)}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2">{task.description}</Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <Button
                      size="small"
                      onClick={() => navigate(`/todos/form/${task.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete "${task.title}"?`
                          )
                        ) {
                          dispatch(removeTodo(task.id));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                  <TextField
                    select
                    size="small"
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task, e.target.value as TodoStatus)
                    }
                  >
                    {statuses.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
};
