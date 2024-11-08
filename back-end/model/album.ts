import { Artist } from "./artist";

export class Album {
    private id?: number;
    private title: string;
    private releasDate: Date;
    private artist: Artist;

    constructor(album: { id?: number; title: string; releasDate: Date; artist: Artist }) {
        this.validate(album);

        this.id = album.id;
        this.title = album.title;
        this.releasDate = album.releasDate;
        this.artist = album.artist;
    }

    validate(album: { title: string; releasDate: Date; artist: Artist }) {
        if (!album.title) {
            throw new Error('Title is required');
        }
        if (!album.releasDate) {
            throw new Error('ReleasDate is required');
        }
        if (!album.artist) {
            throw new Error('Artist is required');
        }
    }
    getId(): number | undefined {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getReleasDate(): Date {
        return this.releasDate;
    }
    getArtist(): Artist {
        return this.artist;
    }
    equals(album: Album): boolean {
        return (
            this.title === album.getTitle() &&
            this.releasDate === album.getReleasDate() &&
            this.artist.equals(album.getArtist())
        );
    }
}