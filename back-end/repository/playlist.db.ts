import { PrismaClient } from '@prisma/client';
import { PlaylistInput } from '../types';

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

const addPlaylist = async (playlistInput: PlaylistInput) => {
    try {
      if (!playlistInput.userId) {
        throw new Error("User ID is required to create a playlist");
      }
  
      const newPlaylist = await database.playlist.create({
        data: {
          title: playlistInput.title,
          description: playlistInput.description,
          user: {
            connect: {
              id: playlistInput.userId, // Zorg dat deze waarde correct is
            },
          },
          songs: playlistInput.songId?.map((songId: any) => ({
            connect: { id: songId },
          })),
        },
        include: {
          user: true,
          songs: true,
        },
      });
  
      return newPlaylist;
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
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
    addPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylistTitle,
};
