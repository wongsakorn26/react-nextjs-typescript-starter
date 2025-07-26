import LoginForm from "@/components/loginForm/loginForm";
import { Grid } from "@mui/material";
import React from "react";

export default function LoginPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <LoginForm />
    </Grid>
  );
}
