// lib/api/services/pokemon.ts
import api from '../axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

export class PokemonService {
    // Get a specific Pokemon by name or ID
    static async getPokemon(nameOrId: string | number): Promise<Pokemon> {
        try {
            const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Pokemon: ${error}`);
        }
    }

    // Get Ditto specifically
    static async getDitto(): Promise<Pokemon> {
        try {
            const response = await api.get<Pokemon>('/pokemon/ditto');
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Ditto: ${error}`);
        }
    }

    // Get list of Pokemon with pagination
    static async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
        try {
            const response = await api.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Pokemon list: ${error}`);
        }
    }

    // Get Pokemon by type
    static async getPokemonByType(type: string): Promise<any> {
        try {
            const response = await api.get(`/type/${type}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Pokemon by type: ${error}`);
        }
    }
}

export default PokemonService;