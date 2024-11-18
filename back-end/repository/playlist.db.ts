import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllPlaylists = async () => {
    try {
        return await database.playlist.findMany({
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching playlists');
    }
};

const getPlaylistById = async (id: number) => {
    try {
        return await database.playlist.findUnique({
            where: { id },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the playlist by ID');
    }
};

const createPlaylist = async (title: string, description: string, userId: number) => {
    try {
        return await database.playlist.create({
            data: {
                title,
                description,
                user: {
                    connect: { id: userId },
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the playlist');
    }
};

export default { getAllPlaylists, getPlaylistById, createPlaylist };
