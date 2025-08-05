"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Grid } from "@mui/material";
import { useSkin } from "@/api/hooks/useSkin";
import DataGridComponent from "@/components/tableComponents/dataGrid";
import { MinimalSkin } from "@/types/skin";

export default function Skin() {
  const t = useTranslations();
  const { skin, loading: skinLoading, error: skinError } = useSkin();

  const items = skin?.map((s: MinimalSkin) => ({
    id: s.id,
    name: s.name,
    image: s.image,
  }));

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 24 }}>
        <DataGridComponent items={items ?? []} isLoading={skinLoading} />
      </Grid>
    </Grid>
  );
}
