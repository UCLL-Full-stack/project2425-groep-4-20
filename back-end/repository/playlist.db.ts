import { Playlist } from '../model/playlist';
import { User } from '../model/user';

const userPlaylists: Playlist[] = [
    new Playlist({
        id: 1,
        title: 'Evening Serenity',
        description: 'A soothing playlist for a peaceful evening.',
        user: new User({ id: 1, username: 'techmaster', email: 'klaas.ceusters@ucll.be' }),
    }),
    new Playlist({
        id: 2,
        title: 'High Energy Hits',
        description: 'A collection of upbeat tracks to keep you moving.',
        user: new User({ id: 2, username: 'musiclover', email: 'ferre.verheyen@ucll.be' }), 
    }),
];

const getAllPlaylists = (): Playlist[] => {
    return userPlaylists;
};

const getPlaylistById = async ({ id }: { id: number }): Promise<Playlist | null> => {
    const playlist = userPlaylists.find(playlist => playlist.getId() === id);
    return playlist || null;
};

const createPlaylist = (playlistData: { title: string; description: string; user: User }): Playlist => {
    const newPlaylist = new Playlist({
        id: userPlaylists.length + 1,
        ...playlistData,
    });
    userPlaylists.push(newPlaylist);
    return newPlaylist;
};

export default {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
};
