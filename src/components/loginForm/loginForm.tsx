"use client";
import React, { useState } from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInSchema from "@/schema/signInSchema";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
// import { useSnackbar } from "notistack"

export default function LoginForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInSchema(t)) });

  const onSubmit = (values: { username: string; password: string }) => {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);
    signIn("signin", {
      redirect: false,
      username: values.username,
      password: values.password,
      locale: Cookies.get("NEXT_LOCALE"),
      remember_me: rememberMe.toString(),
    }).then((res) => {
      if (res?.status !== 200) {
        setIsSubmitting(false);
        // enqueueSnackbar(res?.error, { variant: "error" });
      }
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Grid
          container
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          gap={2}
        >
          <Grid size={{ xs: 24 }}>
            <Typography gutterBottom variant="h5" component="div">
              {t("login")}
            </Typography>
          </Grid>
          <Grid size={{ xs: 24 }}>
            <TextField
              {...register("username")}
              label={t("username")}
              name="username"
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </Grid>
          <Grid size={{ xs: 24 }}>
            <TextField
              {...register("password")}
              name="password"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              label={t("password")}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 24 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              fullWidth
              sx={{
                borderRadius: "8px",
                height: "48px",
                marginTop: "30px",
                backgroundColor: "#56BD5F",
              }}
            >
              {t("login")}
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
