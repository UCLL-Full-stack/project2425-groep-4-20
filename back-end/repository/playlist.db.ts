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

const addSongToPlaylist = async (playlistId: number, songId: number) => {
    try {
        return await database.playlist.update({
            where: { id: playlistId },
            data: {
                songs: {
                    connect: { id: songId },
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the song to the playlist');
    }
};

const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
    try {
        return await database.playlist.update({
            where: { id: playlistId },
            data: {
                songs: {
                    disconnect: { id: songId },
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while removing the song from the playlist');
    }
};

const updatePlaylistTitle = async (playlistId: number, newTitle: string) => {
    try {
        return await database.playlist.update({
            where: { id: playlistId },
            data: { title: newTitle },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the playlist title');
    }
};

export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylistTitle,
};
