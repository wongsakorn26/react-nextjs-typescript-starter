"use client";

import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";

export default function Dashboard() {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4 }}>
        <Link href={`/${lng}/member`}>{t("phonePrefix")}</Link>
      </Grid>
      <Grid size={{ xs: 4 }}>2</Grid>
      <Grid size={{ xs: 6 }}>3</Grid>
    </Grid>
  );
}
