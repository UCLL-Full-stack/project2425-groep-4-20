import { Song } from "../../model/song";

describe("Song", () => {
    it("should create a valid Song instance", () => {
        // Given
        const songData = {
            id: 1,
            title: "Test Song",
            genre: "Rock",
            releaseDate: new Date("2024-01-01"),
            length: 240,
        };

        // When
        const song = new Song(songData);

        // Then
        expect(song.getId()).toBe(1);
        expect(song.getTitle()).toBe("Test Song");
        expect(song.getGenre()).toBe("Rock");
        expect(song.getReleaseDate()).toEqual(new Date("2024-01-01"));
        expect(song.getLength()).toBe(240);
    });

    it("should throw an error if title is missing", () => {
        // Given
        const invalidData = { genre: "Pop", length: 200 };

        // Then
        expect(() => new Song(invalidData as any)).toThrowError("Title is required");
    });

    it("should return false for songs with different properties", () => {
        // Given
        const song1 = new Song({ id: 3, title: "Song A", genre: "Pop", releaseDate: new Date(), length: 200 });
        const song2 = new Song({ id: 4, title: "Song B", genre: "Rock", releaseDate: new Date(), length: 250 });

        // When
        const result = song1.equals(song2);

        // Then
        expect(result).toBe(false);
    });
});
