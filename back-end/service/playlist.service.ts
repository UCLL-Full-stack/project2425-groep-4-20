import { User } from '../model/user';
import { Playlist } from '../model/playlist';

export class PlaylistService {
    private playlists: Playlist[] = []; 

    getAllPlaylists(): Playlist[] {
        return this.playlists;
    }

    getPlaylistById(id: number): Playlist | undefined {
        return this.playlists.find(playlist => playlist.getId() === id);
    }

    createPlaylist(title: string, description: string, user: User): Playlist {
        const newPlaylist = new Playlist({ title, description, user });
        this.playlists.push(newPlaylist);
        return newPlaylist;
    }

    updatePlaylist(id: number, title: string, description: string): Playlist | undefined {
        const playlist = this.getPlaylistById(id);
        if (playlist) {
            return playlist;
        }
        return undefined;
    }

    deletePlaylist(id: number): boolean {
        const initialLength = this.playlists.length;
        this.playlists = this.playlists.filter(playlist => playlist.getId() !== id);
        return this.playlists.length < initialLength;
    }
}
