"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Avatar,
  Button,
  Pagination,
  Chip,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { usePokemonList, usePokemonListDetailed } from "@/lib/hook/usePokemon";
import { useState } from "react";

export default function PokemonListPage() {
  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const itemsPerPage = 20;
  const offset = (page - 1) * itemsPerPage;

  // Basic list hook (just names and URLs)
  const {
    pokemonList: basicList,
    totalCount,
    loading: basicLoading,
    error: basicError,
  } = usePokemonList(itemsPerPage, offset);

  // Detailed list hook (full Pokemon data)
  const {
    pokemonList: detailedList,
    loading: detailedLoading,
    error: detailedError,
  } = usePokemonListDetailed(12, offset); // Smaller limit for detailed view

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when switching tabs
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (basicError || detailedError) {
    return (
      <Alert severity="error">
        Error loading Pokemon: {basicError || detailedError}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pokemon List
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Basic List" />
          {/* <Tab label="Detailed List" /> */}
        </Tabs>
      </Box>

      {/* Basic List Tab */}
      {tabValue === 0 && (
        <Box>
          <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Basic Pokemon List (Names Only)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Pokemon: {totalCount}
            </Typography>
          </Paper>

          {basicLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                {basicList.map((pokemon, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={pokemon.name}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ textTransform: "capitalize" }}
                        >
                          #{offset + index + 1} {pokemon.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click to view details
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
