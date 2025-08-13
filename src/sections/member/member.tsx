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

  const [posts, setPosts] = useState<any>(null);
  const axiosAuth = useAxiosAuth();
  const fetchPosts = async () => {
    const res = await axiosAuth.get("/api/v1/helloworld");
    setPosts(res.data);
    console.log(res.data); //{content: "test", message: "Hello"}
  };  
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 24 }}>
        <Button onClick={fetchPosts}>Get Data</Button>
        <Button
          onClick={() => {
            setPosts("");
          }}
        >
          Clear Data
        </Button>
        {posts && <pre>{JSON.stringify(posts, null, 2)}</pre>}
        {posts && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 2 }}>{posts.content}</Grid>
            <Grid size={{ xs: 2 }}>{posts.message}</Grid>
          </Grid>
        )}
        {/* <DataGridComponent items={items ?? []} isLoading={skinLoading} /> */}
      </Grid>
    </Grid>
  );
}
