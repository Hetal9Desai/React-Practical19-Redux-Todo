import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
