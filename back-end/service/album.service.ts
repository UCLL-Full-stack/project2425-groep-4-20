import { Album } from '../model/album';
import * as albumRepository from '../repository/album.db'; 
export const getAllAlbums = async (): Promise<Album[]> => {
    try {
        const result = await albumRepository.getAllAlbums();
        return result.map((albumPrisma) => Album.from(albumPrisma)); 
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching albums');
    }
};


export const getAlbumById = async (id: number): Promise<Album | null> => {
    try {
        const result = await albumRepository.getAlbumById(id);
        if (!result) {
            return null;
        }
        return Album.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the album by ID');
    }
};

export default {
    getAlbumById,
    getAllAlbums
};
