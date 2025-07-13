import { Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

export default function CustomPageHeader() {
  const t = useTranslations();
  return (
    <Grid container sx={{ m: 0, p: 0 }}>
      <Typography>{t("pokemon")}</Typography>
    </Grid>
  );
}
