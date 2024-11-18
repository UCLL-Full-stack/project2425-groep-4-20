import { Song } from './song';
import { User } from './user'; 
import { Playlist as PlaylistPrisma, User as UserPrisma, Song as SongPrisma } from '@prisma/client';

export class Playlist {
    private id?: number;
    private title: string;
    private description: string;
    private songs: Song[];

    constructor(playlist: { id?: number; title: string; description: string; songs?: Song[] }) {
        this.validate(playlist);

        this.id = playlist.id;
        this.title = playlist.title;
        this.description = playlist.description;
        this.songs = playlist.songs || [];
    }

    validate(playlist: { title: string; description: string; songs?: Song[] }) {
        if (!playlist.title) {
            throw new Error('Title is required');
        }
        if (!playlist.description) {
            throw new Error('Description is required');
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


    getSongs(): Song[] {
        return this.songs;
    }

    equals(playlist: Playlist): boolean {
        return (
            this.title === playlist.getTitle() &&
            this.description === playlist.getDescription() &&

            this.songs === playlist.getSongs()
        );
    }
    static from({
        id, title, description, songs,
    }:PlaylistPrisma & { songs?: SongPrisma[]}): Playlist {
        return new Playlist({
            id,
            title,
            description,
            songs: songs ? songs.map((song) => Song.from(song)) : [],
        });
    }
}
