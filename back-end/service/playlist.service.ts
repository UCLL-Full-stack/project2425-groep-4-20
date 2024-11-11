import { Playlist } from '../model/playlist';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllPlaylists = async (): Promise<Playlist[]> => {
    try{
        const result = await database.playlist.findMany({
            include: {
                user: true,
                songs: true,
            },
        });
        return result.map((playlistsPrisma) => Playlist.from(playlistsPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching playlists');
    }
};

const getPlaylistById = async (id: number): Promise<Playlist | null> => {
    try {
        const result = await database.playlist.findUnique({
            where: { id },
            include: {
                user: true,
                songs: true,
            },
        });
        if (!result) {
            return null; 
        }
        return Playlist.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the playlist by ID');
    }
};
const createPlaylist = async (title: string, description: string, userId: number): Promise<Playlist> => {
    try {
        // Create the playlist in the database
        const result = await database.playlist.create({
            data: {
                title,
                description,
                user: {
                    connect: { id: userId }, // Connect the playlist to the user by userId
                },
            },
            include: {
                user: true,
                songs: true,
            },
        });

        return Playlist.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the playlist');
    }
};

export default { getAllPlaylists, getPlaylistById, createPlaylist};
