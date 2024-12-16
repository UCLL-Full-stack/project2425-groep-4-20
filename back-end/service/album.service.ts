import { Album } from '../model/album';
import * as albumRepository from '../repository/album.db'; 
import { AlbumInput, SongInput } from '../types';
import * as songRepository from '../repository/song.db';

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

export const addAlbum = async (title: string, releaseDate: Date | string, artistId: number) => {
    try {
        if (!title || !releaseDate || !artistId) {
            throw new Error('Missing required fields to add an album');
        }
        const newAlbum = await albumRepository.addAlbum(title, releaseDate, artistId);

        return newAlbum;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the album');
    }
};

export default {
    getAlbumById,
    getAllAlbums,
    addAlbum,
};
