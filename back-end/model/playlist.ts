import { User } from './user'; 

export class Playlist {
    private id?: number;
    private title: string;
    private description: string;
    private user: User;

    constructor(playlist: { id?: number; title: string; description: string; user: User }) {
        this.validate(playlist);

        this.id = playlist.id;
        this.title = playlist.title;
        this.description = playlist.description;
        this.user = playlist.user;
    }

    validate(playlist: { title: string; description: string; user: User }) {
        if (!playlist.title) {
            throw new Error('Title is required');
        }
        if (!playlist.description) {
            throw new Error('Description is required');
        }
        if (!playlist.user) {
            throw new Error('User is required');
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

    equals(playlist: Playlist): boolean {
        return (
            this.title === playlist.getTitle() &&
            this.description === playlist.getDescription() &&
            this.user.equals(playlist.getUser())
        );
    }
}
