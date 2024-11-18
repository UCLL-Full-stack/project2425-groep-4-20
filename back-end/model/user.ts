import { Playlist } from './playlist';
import {User as UserPrisma, Playlist as PlaylistPrisma} from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private playlists: Playlist[];

    constructor(user: { id?: number; username: string; email: string; playlists: Playlist[] }) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.playlists = user.playlists || [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPlaylists(): Playlist[] {
        return this.playlists;
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail()
        );
    }

    static from({
        id, username, email, playlists,
    }: UserPrisma & {playlists: PlaylistPrisma[]}): User {
        return new User({
            id,
            username,
            email,
            playlists: playlists.map((playlist) => Playlist.from(playlist)),
        });
    }
}
