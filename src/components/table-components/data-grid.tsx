import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MinimalSkin } from "@/types/skin";

interface Props {
  items: MinimalSkin[];
  isLoading: boolean;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "name",
    headerName: "ชื่อสกิน",
    width: 300,
  },
  {
    field: "image",
    headerName: "ภาพตัวอย่าง",
    width: 450,
    renderCell: (params) => (
      <img src={params.value} alt="skin preview" height={50} />
    ),
  },
];

export default function DataGridComponent({ items, isLoading }: Props) {
  console.log(items);
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={items}
        loading={isLoading}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
