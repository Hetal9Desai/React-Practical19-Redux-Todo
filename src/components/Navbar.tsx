import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface NavBarProps {
  currentMode: "light" | "dark";
  onThemeToggle: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  currentMode,
  onThemeToggle,
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="h6"
        component={RouterLink}
        to="/todos"
        color="inherit"
        sx={{ textDecoration: "none", flexGrow: 1 }}
      >
        My TODOs
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mr: 2 }}>
        <Button color="inherit" component={RouterLink} to="/todos" size="small">
          List
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/todos/form"
          size="small"
        >
          Add Todo
        </Button>
      </Box>

      <IconButton color="inherit" onClick={onThemeToggle}>
        {currentMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Toolbar>
  </AppBar>
);
