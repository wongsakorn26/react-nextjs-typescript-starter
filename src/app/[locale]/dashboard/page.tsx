"use client";

import Link from "next/link";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";

import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4 }}>
        <Link href={`/member`}>{t("phonePrefix")}</Link>
      </Grid>
      <Grid size={{ xs: 4 }}>2</Grid>
      <Grid size={{ xs: 6 }}>3</Grid>
    </Grid>
  );
}
