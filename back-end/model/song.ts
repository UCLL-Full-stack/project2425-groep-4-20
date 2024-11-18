import { Album } from "./album";
import { Album as AlbumPrisma, Song as SongPrisma, Artist as ArtistPrisma } from "@prisma/client";
export class Song {
    private id?: number;
    private title: string;
    private genre: string;
    private releaseDate: Date;
    private length: number;

    constructor(song: { id?: number; title: string; genre: string; releaseDate: Date; length: number}) {
        this.validate(song);

        this.id = song.id;
        this.title = song.title;
        this.genre = song.genre;
        this.releaseDate = song.releaseDate;
        this.length = song.length;
    }

    validate(song: { title: string; genre: string; releaseDate: Date; length: number}) {
        if (!song.title) {
            throw new Error('Title is required');
        }
        if (!song.genre) {
            throw new Error('Genre is required');
        }
        if (!song.releaseDate) {
            throw new Error('ReleasDate is required');
        }
        if (!song.length) {
            throw new Error('Length is required');
        }
    }
    getId(): number | undefined {
        return this.id;
    }
    getTitle(): string {
        return this.title;
    }
    getGenre(): string {
        return this.genre;
    }
    getReleaseDate(): Date {
        return this.releaseDate;
    }
    getLength(): number {
        return this.length;
    }
    equals(song: Song): boolean {
        return (
            this.title === song.getTitle() &&
            this.genre === song.getGenre() &&
            this.releaseDate === song.getReleaseDate() &&
            this.length === song.getLength()
        );
    }
    static from({
        id, title, genre, releaseDate, length,
    }:SongPrisma): Song {
        return new Song({
            id,
            title,
            genre,
            releaseDate,
            length,

        });
    }
    
}