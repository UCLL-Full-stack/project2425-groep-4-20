import { Artist } from '../model/artist';
import * as artistRepository from '../repository/artist.db';

export const getAllArtists = async (): Promise<Artist[]> => {
    try {
        const result = await artistRepository.getAllArtists();
        return result.map((artistPrisma) => Artist.from(artistPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching artists');
    }
};

export const getArtistById = async (id: number): Promise<Artist | null> => {
    try {
        const result = await artistRepository.getArtistById(id);
        if (!result) {
            return null;
        }
        return Artist.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the artist by ID');
    }
};
