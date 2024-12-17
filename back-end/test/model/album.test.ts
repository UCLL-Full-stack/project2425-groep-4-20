import { Album } from "../../model/album";
import { Song } from "../../model/song";

describe("Album", () => {
    it("should create a valid Album instance", () => {
        // Given
        const validAlbumData = {
            id: 1,
            title: "Test Album",
            releaseDate: new Date("2024-01-01"),
            songs: [new Song({ title: "Song 1", genre: "Pop", releaseDate: new Date(), length: 200 })],
        };

        // When
        const album = new Album(validAlbumData);

        // Then
        expect(album.getId()).toBe(1);
        expect(album.getTitle()).toBe("Test Album");
        expect(album.getReleaseDate()).toEqual(new Date("2024-01-01"));
        expect(album.getSongs().length).toBe(1);
    });

    it("should throw an error if title is missing", () => {
        // Given
        const invalidAlbumData = { releaseDate: new Date("2024-01-01") };

        // Then
        expect(() => new Album(invalidAlbumData as any)).toThrowError("Title is required");
    });

    it("should throw an error if releaseDate is missing", () => {
        // Given
        const invalidAlbumData = { title: "No Release Date Album" };

        // Then
        expect(() => new Album(invalidAlbumData as any)).toThrowError("ReleaseDate is required");
    });

    it("should handle an empty song list", () => {
        // Given
        const albumData = {
            id: 2,
            title: "Empty Songs Album",
            releaseDate: new Date("2024-02-01"),
            songs: [],
        };

        // When
        const album = new Album(albumData);

        // Then
        expect(album.getSongs()).toEqual([]);
    });

    it("should create an Album with multiple songs", () => {
        // Given
        const albumData = {
            id: 3,
            title: "Multiple Songs Album",
            releaseDate: new Date("2024-03-01"),
            songs: [
                new Song({ title: "Song 1", genre: "Pop", releaseDate: new Date(), length: 200 }),
                new Song({ title: "Song 2", genre: "Rock", releaseDate: new Date(), length: 240 }),
            ],
        };

        // When
        const album = new Album(albumData);

        // Then
        expect(album.getSongs().length).toBe(2);
        expect(album.getSongs()[0].getTitle()).toBe("Song 1");
        expect(album.getSongs()[1].getGenre()).toBe("Rock");
    });

    it("should return false when comparing albums with different songs", () => {
        // Given
        const releaseDate = new Date("2024-01-01");
        const album1 = new Album({
            id: 5,
            title: "Different Songs Album",
            releaseDate,
            songs: [new Song({ title: "Song 1", genre: "Pop", releaseDate, length: 200 })],
        });
        const album2 = new Album({
            id: 5,
            title: "Different Songs Album",
            releaseDate,
            songs: [new Song({ title: "Song 2", genre: "Rock", releaseDate, length: 240 })],
        });

        // When
        const result = album1.equals(album2);

        // Then
        expect(result).toBe(false);
    });

    // it("should correctly convert Prisma data into an Album instance using from", () => {
    //     // Given
    //     const prismaData = {
    //         id: 6,
    //         title: "Prisma Album",
    //         releaseDate: new Date("2024-04-01"),
    //         songs: [
    //             { id: 1, title: "Song 1", genre: "Pop", releaseDate: new Date("2024-04-01"), length: 200 },
    //             { id: 2, title: "Song 2", genre: "Rock", releaseDate: new Date("2024-04-02"), length: 240 },
    //         ],
    //     };

    //     // When
    //     const album = Album.from(prismaData);

    //     // Then
    //     expect(album.getId()).toBe(6);
    //     expect(album.getTitle()).toBe("Prisma Album");
    //     expect(album.getSongs().length).toBe(2);
    //     expect(album.getSongs()[0].getTitle()).toBe("Song 1");
    //     expect(album.getSongs()[1].getGenre()).toBe("Rock");
    // });
});
