import { Album } from "./album";

export class Song {
    private id?: number;
    private title: string;
    private genre: string;
    private releasDate: Date;
    private length: number;
    private album: Album;

    constructor(song: { id?: number; title: string; genre: string; releasDate: Date; length: number; album: Album }) {
        this.validate(song);

        this.id = song.id;
        this.title = song.title;
        this.genre = song.genre;
        this.releasDate = song.releasDate;
        this.length = song.length;
        this.album = song.album;
    }

    validate(song: { title: string; genre: string; releasDate: Date; length: number; album: Album }) {
        if (!song.title) {
            throw new Error('Title is required');
        }
        if (!song.genre) {
            throw new Error('Genre is required');
        }
        if (!song.releasDate) {
            throw new Error('ReleasDate is required');
        }
        if (!song.length) {
            throw new Error('Length is required');
        }
        if (!song.album) {
            throw new Error('Album is required');
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
    getReleasDate(): Date {
        return this.releasDate;
    }
    getLength(): number {
        return this.length;
    }
    getAlbum(): Album {
        return this.album;
    }
    equals(song: Song): boolean {
        return (
            this.title === song.getTitle() &&
            this.genre === song.getGenre() &&
            this.releasDate === song.getReleasDate() &&
            this.length === song.getLength() &&
            this.album.equals(song.getAlbum())
        );
    }
}