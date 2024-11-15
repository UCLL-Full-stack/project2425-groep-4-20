import { Album } from "./album";
import { Album as AlbumPrisma, Song as SongPrisma, Artist as ArtistPrisma } from "@prisma/client";
export class Song {
    private id?: number;
    private title: string;
    private genre: string;
    private releaseDate: Date;
    private length: number;
    private album: Album;

    constructor(song: { id?: number; title: string; genre: string; releaseDate: Date; length: number; album: Album }) {
        this.validate(song);

        this.id = song.id;
        this.title = song.title;
        this.genre = song.genre;
        this.releaseDate = song.releaseDate;
        this.length = song.length;
        this.album = song.album;
    }

    validate(song: { title: string; genre: string; releaseDate: Date; length: number; album: Album }) {
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
    getReleaseDate(): Date {
        return this.releaseDate;
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
            this.releaseDate === song.getReleaseDate() &&
            this.length === song.getLength() &&
            this.album.equals(song.getAlbum())
        );
    }
    static from(prismaSong: SongPrisma & { album: AlbumPrisma & { artist: ArtistPrisma, songs: SongPrisma[] } }): Song {
        return new Song({
            id: prismaSong.id,
            title: prismaSong.title,
            genre: prismaSong.genre,
            releaseDate: prismaSong.releaseDate,
            length: prismaSong.length,
            album: Album.from(prismaSong.album),
        });
    }
    
}