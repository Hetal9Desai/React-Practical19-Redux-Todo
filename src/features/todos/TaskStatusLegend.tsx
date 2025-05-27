import React from "react";
import { Box, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { TodoStatus } from "../../types/Task/types";

const legendItems: {
  label: string;
  status: TodoStatus;
  color: "error" | "warning" | "success";
}[] = [
  { label: "Todo", status: TodoStatus.TODO, color: "error" },
  { label: "In Progress", status: TodoStatus.IN_PROGRESS, color: "warning" },
  { label: "Done", status: TodoStatus.DONE, color: "success" },
];

const TaskStatusLegend: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      {legendItems.map(({ label, status, color }) => (
        <Chip
          key={status}
          label={label}
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette[color].main, 0.25),
            border: `1px solid ${theme.palette[color].main}`,
            color: theme.palette.common.white,
          }}
        />
      ))}
    </Box>
  );
};

export default TaskStatusLegend;
