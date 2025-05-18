"use client";

import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { Grid } from "@mui/material";

export default function Dashboard({ params }: { params: { lng: string } }) {
  const { lng } = params;
  const { t } = useTranslation(lng);

  return (
    <Grid container>
      <Grid size={{ xs: 4 }}>
        <Link href={`/${lng}/member`}>1</Link>
      </Grid>
      <Grid size={{ xs: 4 }}>2</Grid>
      <Grid size={{ xs: 6 }}>3</Grid>
    </Grid>
  );
}
