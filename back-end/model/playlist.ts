import { Song } from './song';
import { User } from './user'; 

export class Playlist {
    private id?: number;
    private title: string;
    private description: string;
    private user: User;
    private songs: Song[];

    constructor(playlist: { id?: number; title: string; description: string; user: User; songs: Song[] }) {
        this.validate(playlist);

        this.id = playlist.id;
        this.title = playlist.title;
        this.description = playlist.description;
        this.user = playlist.user;
        this.songs = playlist.songs;
    }

    validate(playlist: { title: string; description: string; user: User; songs: Song[] }) {
        if (!playlist.title) {
            throw new Error('Title is required');
        }
        if (!playlist.description) {
            throw new Error('Description is required');
        }
        if (!playlist.user) {
            throw new Error('User is required');
        }
        if (!playlist.songs) {
            throw new Error('Songs is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getUser(): User {
        return this.user;
    }

    getSongs(): Song[] {
        return this.songs;
    }

    equals(playlist: Playlist): boolean {
        return (
            this.title === playlist.getTitle() &&
            this.description === playlist.getDescription() &&
            this.user.equals(playlist.getUser()) &&
            this.songs === playlist.getSongs()
        );
    }
    static from(prismaPlaylist: any): Playlist {
        return new Playlist({
            id: prismaPlaylist.id,
            title: prismaPlaylist.title,
            description: prismaPlaylist.description,
            user: User.from(prismaPlaylist.user),
            songs: prismaPlaylist.songs ? prismaPlaylist.songs.map((song: any) => Song.from(song)) : [],
        });
    }
}
