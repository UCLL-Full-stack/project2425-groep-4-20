import { Artist } from "./artist";
import { Song } from "./song";
import { Album as AlbumPrisma, Artist as ArtistPrisma, Song as SongPrisma } from '@prisma/client';

export class Album {
    private id?: number;
    private title: string;
    private releaseDate: Date;
    private artist: Artist;
    private songs: Song[];

    constructor(album: { id?: number; title: string; releaseDate: Date; artist: Artist; songs: Song[] }) {
        this.validate(album);

        this.id = album.id;
        this.title = album.title;
        this.releaseDate = album.releaseDate;
        this.artist = album.artist;
        this.songs = album.songs;
    }

    validate(album: { title: string; releaseDate: Date; artist: Artist; songs: Song[] }) {
        if (!album.title) {
            throw new Error('Title is required');
        }
        if (!album.releaseDate) {
            throw new Error('ReleasDate is required');
        }
        if (!album.artist) {
            throw new Error('Artist is required');
        }
        if (!album.songs) {
            throw new Error('Songs is required');
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
    getArtist(): Artist {
        return this.artist;
    }
    getSongs(): Song[] {
        return this.songs;
    }
    equals(album: Album): boolean {
        return (
            this.title === album.getTitle() &&
            this.releaseDate === album.getReleaseDate() &&
            this.artist.equals(album.getArtist()) &&
            this.songs === album.getSongs()
        );
    }
    static from(prismaAlbum: AlbumPrisma & {artist: ArtistPrisma, songs: SongPrisma[]}): Album {
        return new Album({
            id: prismaAlbum.id,
            title: prismaAlbum.title,
            releaseDate: prismaAlbum.releaseDate,
            artist: Artist.from(prismaAlbum.artist),
            songs: prismaAlbum.songs ? prismaAlbum.songs.map((song: SongPrisma) => Song.from(song)) : [],
        });
    }
}