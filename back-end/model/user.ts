import { Playlist } from './playlist';
import {User as UserPrisma, Playlist as PlaylistPrisma} from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private playlists?: Playlist[];
    private password: string;
    private role: Role;

    constructor(user: { id?: number; username: string; email: string; playlists?: Playlist[], password: string, role: Role }) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.playlists = user.playlists || [];
        this.password = user.password;
        this.role = user.role;
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
        return this.playlists || [];
    }
    getPassword(): string {
        return this.password;
    }
    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail()
        );
    }

    static from({
        id,
        username,
        email,
        playlists,
        password,
        role,
    }: UserPrisma & { playlists: PlaylistPrisma[] }): User {
        return new User({
            id,
            username,
            email,
            playlists: playlists.map((playlist) => Playlist.from(playlist)), // Convert Prisma playlists
            password,
            role: role as Role,
        });
    }
}