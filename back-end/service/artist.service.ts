import { Artist } from '../model/artist';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllArtists = async (): Promise<Artist[]> => {
    try {
        const result = await database.artist.findMany({
            include: {
                albums: true,
            },
        });
        return result.map((artistPrisma) => Artist.from(artistPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching artists');
    }
};

const getArtistById = async (id: number): Promise<Artist | null> => {
    try {
        const result = await database.artist.findUnique({
            where: { id },
            include: {
                albums: true,
            },
        });
        if (!result) {
            return null; // Artist not found
        }
        return Artist.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the artist by ID');
    }
};

export default { getAllArtists, getArtistById };
