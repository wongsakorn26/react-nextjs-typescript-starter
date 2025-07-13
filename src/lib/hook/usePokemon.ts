// lib/hooks/usePokemon.ts
import { useState, useEffect } from 'react';
import { Pokemon, PokemonListResponse, PokemonListItem } from '../api/types/pokemon';
import PokemonService from '../api/services/pokemon';

export const usePokemon = (nameOrId: string | number) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await PokemonService.getPokemon(nameOrId);
                setPokemon(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        if (nameOrId) {
            fetchPokemon();
        }
    }, [nameOrId]);

    return { pokemon, loading, error };
};

export const useDitto = () => {
    const [ditto, setDitto] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDitto = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await PokemonService.getDitto();
                setDitto(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchDitto();
    }, []);

    return { ditto, loading, error };
};

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [next, setNext] = useState<string | null>(null);
    const [previous, setPrevious] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                setError(null);
                const data: PokemonListResponse = await PokemonService.getPokemonList(limit, offset);

                // Fix: Use the correct data structure
                setPokemonList(data.results); // data.results, not data directly
                setTotalCount(data.count);
                setNext(data.next);
                setPrevious(data.previous);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, [limit, offset]);

    return {
        pokemonList,
        totalCount,
        next,
        previous,
        loading,
        error
    };
};

// Advanced hook for Pokemon list with detailed data
export const usePokemonListDetailed = (limit: number = 20, offset: number = 0) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetailedPokemonList = async () => {
            try {
                setLoading(true);
                setError(null);

                // First get the list
                const listData = await PokemonService.getPokemonList(limit, offset);

                // Then fetch detailed data for each Pokemon
                const detailedPromises = listData.results.map(pokemon =>
                    PokemonService.getPokemon(pokemon.name)
                );

                const detailedPokemon = await Promise.all(detailedPromises);
                setPokemonList(detailedPokemon);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchDetailedPokemonList();
    }, [limit, offset]);

    return { pokemonList, loading, error };
};