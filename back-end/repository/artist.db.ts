import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export const getAllArtists = async () => {
    try {
        const result = await database.artist.findMany({
            include: {
                albums: true,
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching artists');
    }
};

export const getArtistById = async (id: number) => {
    try {
        const result = await database.artist.findUnique({
            where: { id },
            include: {
                albums: true,
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the artist by ID');
    }
};
