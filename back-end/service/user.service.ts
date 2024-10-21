import { User } from '../model/user';
import { Playlist } from '../model/playlist';

export class UserService {
    private users: User[] = [];

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | undefined {
        return this.users.find(user => user.getId() === id);
    }

    createUser(username: string, email: string): User {
        const newUser = new User({ username, email });
        this.users.push(newUser);
        return newUser;
    }

    addPlaylistToUser(userId: number, playlist: Playlist): User | undefined {
        const user = this.getUserById(userId);
        if (user) {
            user.addPlaylist(playlist);
            return user;
        }
        return undefined;
    }

    removePlaylistFromUser(userId: number, playlistId: number): User | undefined {
        const user = this.getUserById(userId);
        if (user) {
            const playlistToRemove = user.getPlaylists().find(p => p.getId() === playlistId);
            if (playlistToRemove) {
                user.removePlaylist(playlistToRemove);
                return user;
            }
        }
        return undefined;
    }
}
