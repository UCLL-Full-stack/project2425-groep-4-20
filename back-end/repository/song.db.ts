import { PrismaClient } from '@prisma/client';
import { SongInput } from '../types';

const database = new PrismaClient();

const getAllSongs = async () => {
    try {
        return await database.song.findMany({
            include: {
                album: {
                    include: {
                        artist: true,
                        songs: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching songs');
    }
};

const getSongById = async (id: number) => {
    try {
        return await database.song.findUnique({
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
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the song by ID');
    }
};


export default { getAllSongs, getSongById };
