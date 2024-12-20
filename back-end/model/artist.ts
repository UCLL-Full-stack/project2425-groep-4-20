import { Album } from "./album";
import { Artist as ArtistPrisma, Album as AlbumPrisma } from "@prisma/client";

export class Artist{
    private id?: number;
    private name: string;
    private birthdate: Date;
    private albums: Album[];

    constructor(artist: { id?: number; name: string; birthdate: Date; albums: Album[] }) {
        this.validate(artist);

        this.id = artist.id;
        this.name = artist.name;
        this.birthdate = artist.birthdate;
        this.albums = artist.albums;
    }
    validate(artist: { name: string; birthdate: Date; albums: Album[] }) {
        if (!artist.name) {
            throw new Error('Name is required');
        }
        if (!artist.birthdate) {
            throw new Error('Birthdate is required');
        }
        if (!artist.albums) {
            throw new Error('Albums is required');
        }
    }
    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getBirthdate(): Date {
        return this.birthdate;
    }
    getAlbums(): Album[] {
        return this.albums;
    }
    equals(artist: Artist): boolean {
        return (
            this.name === artist.getName() &&
            this.birthdate === artist.getBirthdate() &&
            this.albums === artist.getAlbums()
        );
    }
    static from({
        id, name, birthdate, albums,
    }:ArtistPrisma& { albums: AlbumPrisma[] }): Artist {
        return new Artist({
            id,
            name,
            birthdate,
            albums: albums.map((album) => Album.from(album)),
        });
    }
    
}