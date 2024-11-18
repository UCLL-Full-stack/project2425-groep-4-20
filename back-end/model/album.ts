import { Song } from "./song";
import { Album as AlbumPrisma, Song as SongPrisma } from '@prisma/client';

export class Album {
    private id?: number;
    private title: string;
    private releaseDate: Date;
    private songs: Song[];

    // Maak songs optioneel
    constructor(album: { id?: number; title: string; releaseDate: Date; songs?: Song[] }) {
        this.validate(album);

        this.id = album.id;
        this.title = album.title;
        this.releaseDate = album.releaseDate;
        this.songs = album.songs || []; // Gebruik een lege array als geen songs aanwezig zijn
    }

    validate(album: { title: string; releaseDate: Date; songs?: Song[] }) {
        if (!album.title) {
            throw new Error('Title is required');
        }
        if (!album.releaseDate) {
            throw new Error('ReleaseDate is required');
        }
}

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    getSongs(): Song[] {
        return this.songs;
    }

    equals(album: Album): boolean {
        return (
            this.title === album.getTitle() &&
            this.releaseDate === album.getReleaseDate() &&
            this.songs === album.getSongs()
        );
    }

    static from({
        id, title, releaseDate, songs,
    }: AlbumPrisma & { songs?: SongPrisma[] }): Album {
        // Als songs niet aanwezig is, geef een lege array door
        return new Album({
            id,
            title,
            releaseDate,
            songs: songs ? songs.map((song) => Song.from(song)) : [], // Als geen songs, lege array gebruiken
        });
    }
}
