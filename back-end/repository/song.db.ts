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

export const addSong = async (songInput: SongInput) => {
    try {
        const newSong = await database.song.create({
            data: {
                title: songInput.title,
                genre: songInput.genre,
                releaseDate: songInput.releaseDate,
                length: songInput.length,
                album: {
                    connect: {
                        id: songInput.album.id, // Koppel het album aan de song
                    },
                },
            },
        });
        return newSong;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the song');
    }
};


export default { getAllSongs, getSongById, addSong };
