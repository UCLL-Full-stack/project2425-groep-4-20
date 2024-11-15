import { Song } from '../model/song';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllSongs = async (): Promise<Song[]> => {
    try {
        const result = await database.song.findMany({
            include: {
                album: {
                    include: {
                        artist: true,
                        songs: true,
                    },
                },
            },
        });
        return result.map((songPrisma) => Song.from(songPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching songs');
    }
};

const getSongById = async (id: number): Promise<Song | null> => {
    try {
        const result = await database.song.findUnique({
            where: { id },
            include: {
                album: {
                    include: {
                        artist: true,
                        songs: true,
                    },
                },
            },
        });
        if (!result) {
            return null;
        }
        return Song.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the song by ID');
    }
};

export default { getAllSongs, getSongById };
