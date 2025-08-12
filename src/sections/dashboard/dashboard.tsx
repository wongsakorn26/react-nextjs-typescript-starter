"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function OverallDashboardSection() {
  const t = useTranslations();
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6 }}>
        <Card>
          <CardContent>
            <Typography>Dashboard 1</Typography>
            <BarChart
              xAxis={[
                {
                  data: ["group A", "group B", "group C"],
                },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Card>
          <CardContent>
            <Typography>Dashboard 2</Typography>
            <BarChart
              xAxis={[
                {
                  data: ["group A", "group B", "group C"],
                },
              ]}
              series={[
                { data: [4, 3, 5] },
                { data: [1, 6, 3] },
                { data: [2, 5, 6] },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 6 }}>
        <Link href={`/member`}>{t("phonePrefix")}</Link>
      </Grid>
      <Grid size={{ xs: 6 }}>3</Grid>
    </Grid>
  );
}
