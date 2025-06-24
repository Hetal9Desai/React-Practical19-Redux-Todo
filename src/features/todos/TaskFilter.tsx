import React, { type ChangeEvent } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import type { Todo } from "../../types/Task/types";
import { TodoStatus } from "../../types/Task/types";

export type FilterKey = "title" | "desc" | "both" | "status";

interface TaskFilterProps {
  filters: Record<FilterKey, string>;
  handleFilterChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: FilterKey
  ) => void;
}

const statuses: Todo["status"][] = [
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.DONE,
];

const TaskFilter: React.FC<TaskFilterProps> = ({
  filters,
  handleFilterChange,
}) => (
  <Box
    sx={{
      display: "grid",
      gap: 2,
      flexGrow: 1,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr 1fr",
      },
    }}
  >
    <TextField
      label="Filter Title"
      value={filters.title}
      onChange={(e) => handleFilterChange(e, "title")}
      fullWidth
    />
    <TextField
      label="Filter Description"
      value={filters.desc}
      onChange={(e) => handleFilterChange(e, "desc")}
      fullWidth
    />
    <TextField
      label="Filter By Title and Description"
      value={filters.both}
      onChange={(e) => handleFilterChange(e, "both")}
      fullWidth
    />
    <TextField
      select
      label="Filter Status"
      value={filters.status}
      onChange={(e) => handleFilterChange(e, "status")}
      fullWidth
    >
      <MenuItem value="">All</MenuItem>
      {statuses.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export default TaskFilter;
