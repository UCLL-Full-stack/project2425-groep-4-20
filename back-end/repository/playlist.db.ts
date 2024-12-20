import { PrismaClient } from '@prisma/client';
import { PlaylistInput } from '../types';

const database = new PrismaClient();

 export const getAllPlaylists = async () => {
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

export const getPlaylistById = async (id: number) => {
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

const addPlaylist = async (playlistInput: PlaylistInput) => {
    try {
        return await database.playlist.create({
            data: {
                title: playlistInput.title,
                description: playlistInput.description,
                user: {
                    connect: { id: playlistInput.userId },
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the playlist');
    }
};

const deletePlaylist = async (id: number) => {
    try {
        return await database.playlist.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the playlist');
    }
};
export default {
    getAllPlaylists,
    getPlaylistById,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylistTitle,
    addPlaylist,
    deletePlaylist
};
