import { PrismaClient } from '@prisma/client';

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
