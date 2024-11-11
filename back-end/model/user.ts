import { Playlist } from './playlist';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private playlists: Playlist[];

    constructor(user: { id?: number; username: string; email: string; playlists?: Playlist[] }) {
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

    addPlaylist(playlist: Playlist): void {
        this.playlists.push(playlist);
        // Zorg ervoor dat je de gebruiker in de playlist instelt, als dat nodig is
    }

    removePlaylist(playlist: Playlist): void {
        this.playlists = this.playlists.filter(p => p.getId() !== playlist.getId());
        // Zorg ervoor dat je de gebruiker in de playlist verwijdert, als dat nodig is
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.email === user.getEmail()
        );
    }

    static from(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            username: prismaUser.username,
            email: prismaUser.email,
            playlists: prismaUser.playlists ? prismaUser.playlists.map((playlist: any) => Playlist.from(playlist)) : [],
        });
    }
}
