// app/[locale]/pokemon/page.tsx
"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
  Grid,
  Paper,
} from "@mui/material";
import { useDitto, usePokemon } from "@/lib/hook/usePokemon";
import { useState } from "react";

export default function PokemonPage() {
  const { ditto, loading: dittoLoading, error: dittoError } = useDitto();
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const {
    pokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemon(selectedPokemon);

  const handleFetchPokemon = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  if (dittoLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (dittoError) {
    return <Alert severity="error">Error loading Ditto: {dittoError}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pokemon API Demo
      </Typography>

      {/* Ditto Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Ditto Information
          </Typography>
          {ditto && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box textAlign="center">
                  <Avatar
                    src={ditto.sprites.front_default || undefined}
                    alt={ditto.name}
                    sx={{ width: 150, height: 150, margin: "0 auto" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, textTransform: "capitalize" }}
                  >
                    {ditto.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Basic Info:
                  </Typography>
                  <Typography>ID: {ditto.id}</Typography>
                  <Typography>Height: {ditto.height / 10} m</Typography>
                  <Typography>Weight: {ditto.weight / 10} kg</Typography>
                  <Typography>
                    Base Experience: {ditto.base_experience}
                  </Typography>
                </Paper>

                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Types:
                  </Typography>
                  <Box display="flex" gap={1}>
                    {ditto.types.map((type) => (
                      <Chip
                        key={type.slot}
                        label={type.type.name}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Abilities:
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {ditto.abilities.map((ability) => (
                      <Chip
                        key={ability.slot}
                        label={ability.ability.name}
                        color={ability.is_hidden ? "secondary" : "default"}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Stats:
                  </Typography>
                  {ditto.stats.map((stat) => (
                    <Box key={stat.stat.name} sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        {stat.stat.name}: {stat.base_stat}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Quick Pokemon Lookup */}
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Quick Pokemon Lookup
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
            {["pikachu", "charizard", "blastoise", "venusaur", "mewtwo"].map(
              (name) => (
                <Chip
                  key={name}
                  label={name}
                  onClick={() => handleFetchPokemon(name)}
                  color="primary"
                  clickable
                />
              )
            )}
          </Box>

          {pokemonLoading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={30} />
            </Box>
          )}

          {pokemonError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Error: {pokemonError}
            </Alert>
          )}

          {pokemon && !pokemonLoading && (
            <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={pokemon.sprites.front_default || undefined}
                  alt={pokemon.name}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                    {pokemon.name}
                  </Typography>
                  <Typography variant="body2">
                    ID: {pokemon.id} | Height: {pokemon.height / 10}m | Weight:{" "}
                    {pokemon.weight / 10}kg
                  </Typography>
                  <Box display="flex" gap={1} mt={1}>
                    {pokemon.types.map((type) => (
                      <Chip
                        key={type.slot}
                        label={type.type.name}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
