import { Playlist } from '../model/playlist';
import playlistRepository from '../repository/playlist.db';

const getAllPlaylists = (): Playlist[] => {
    return playlistRepository.getAllPlaylists();
};

const getPlaylistById = async (id: number): Promise<Playlist | null> => {
    const playlist = await playlistRepository.getPlaylistById({ id });
    if (!playlist) {
        throw new Error(`Playlist with id ${id} does not exist.`);
    }
    return playlist;
};

const createPlaylist = (title: string, description: string, user: any): Playlist => {
    const newPlaylist = { title, description, user }; // Zorg ervoor dat het user object correct is
    return playlistRepository.createPlaylist(newPlaylist);
};

// const updatePlaylist = (id: number, title: string, description: string): Playlist | null => {
//     const updatedPlaylist = playlistRepository.updatePlaylist(id, { title, description });
//     if (!updatedPlaylist) {
//         throw new Error(`Playlist with id ${id} does not exist.`);
//     }
//     return updatedPlaylist;
// };

// const deletePlaylist = (id: number): boolean => {
//     const deleted = playlistRepository.deletePlaylist(id);
//     if (!deleted) {
//         throw new Error(`Playlist with id ${id} does not exist.`);
//     }
//     return true;
// };

export default { getAllPlaylists, getPlaylistById, createPlaylist};
