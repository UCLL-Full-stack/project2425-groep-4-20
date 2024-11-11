import { Album } from '../model/album';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllAlbums = async (): Promise<Album[]> => {
    try {
        const result = await database.album.findMany({
            include: {
                artist: true,
                songs: true,
            },
        });
        return result.map((albumPrisma) => Album.from(albumPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching albums');
    }
};

const getAlbumById = async (id: number): Promise<Album | null> => {
    try {
        const result = await database.album.findUnique({
            where: { id },
            include: {
                artist: true,
                songs: true,
            },
        });
        if (!result) {
            return null;
        }
        return Album.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the album by ID');
    }
};

export default { getAllAlbums, getAlbumById };
