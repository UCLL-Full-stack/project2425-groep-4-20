import playlistRepository from '../repository/playlist.db';

const getAllPlaylists = async () => {
    try {
        const playlists = await playlistRepository.getAllPlaylists();
        return playlists;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching playlists');
    }
};

const getPlaylistById = async (id: number) => {
    try {
        const playlist = await playlistRepository.getPlaylistById(id);
        return playlist;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the playlist by ID');
    }
};

const createPlaylist = async (title: string, description: string, userId: number) => {
    try {
        const playlist = await playlistRepository.createPlaylist(title, description, userId);
        return playlist;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the playlist');
    }
};

const addSongToPlaylist = async (playlistId: number, songId: number) => {
    try {
        const updatedPlaylist = await playlistRepository.addSongToPlaylist(playlistId, songId);
        return updatedPlaylist;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while adding the song to the playlist');
    }
};

const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
    try {
        const updatedPlaylist = await playlistRepository.removeSongFromPlaylist(playlistId, songId);
        return updatedPlaylist;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while removing the song from the playlist');
    }
};

const updatePlaylistTitle = async (playlistId: number, newTitle: string) => {
    try {
        const updatedPlaylist = await playlistRepository.updatePlaylistTitle(playlistId, newTitle);
        return updatedPlaylist;
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
