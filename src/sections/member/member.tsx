"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Grid } from "@mui/material";
import { useSkin } from "@/api/hooks/useSkin";
import DataGridComponent from "@/components/tableComponents/dataGrid";
import { MinimalSkin } from "@/types/skin";
import { useState } from "react";
import useAxiosAuth from "@/api/hooks/useAxiosAuth";

export default function MemberList() {
  const t = useTranslations();
  // const { skin, loading: skinLoading, error: skinError } = useSkin();

  // const items = skin?.map((s: MinimalSkin) => ({
  //   id: s.id,
  //   name: s.name,
  //   image: s.image,
  // }));

  const [posts, setPosts] = useState();
  const axiosAuth = useAxiosAuth();
  const fetchPosts = async () => {
    const res = await axiosAuth.get("/api/v1/helloworld");
    setPosts(res.data);
    console.log(res.data);
  };
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 24 }}>
        <Button onClick={fetchPosts}>Get Data</Button>
        {/* {posts ?? JSON.stringify(posts)} */}
        {}
        {/* {posts ?? posts?.content} */}
        {/* <DataGridComponent items={items ?? []} isLoading={skinLoading} /> */}
      </Grid>
    </Grid>
  );
}
