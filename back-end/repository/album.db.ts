import { PrismaClient } from '@prisma/client';
import { AlbumInput } from '../types';

const database = new PrismaClient();


export const getAllAlbums = async () => {
    try {
        const result = await database.album.findMany({
            include: {
                artist: true,
                songs: true,
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching albums');
    }
};


export const getAlbumById = async (id: number) => {
    try {
        const result = await database.album.findUnique({
            where: { id },
            include: {
                artist: true,
                songs: true,
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the album by ID');
    }
};

export const addAlbum = async (title: string, releaseDate: Date | string, artistId: number) => {
    try {
        const formattedReleaseDate = new Date(releaseDate).toISOString(); // Zorg dat de datum correct is
        const album = await database.album.create({
            data: {
                title,
                releaseDate: formattedReleaseDate, // Gebruik geformatteerde datum
                artist: {
                    connect: { id: artistId }, // Koppel de artiest op basis van ID
                },
            },
            include: {
                artist: true,
            },
        });
        return album;
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