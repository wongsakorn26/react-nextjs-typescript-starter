import React from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";

export default function LoginForm() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardActionArea> */}
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 24 }}>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>
          </Grid>
          <Grid size={{ xs: 24 }}>
            <TextField
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 24 }}>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Password"
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
