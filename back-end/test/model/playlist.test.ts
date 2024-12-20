import { Playlist } from "../../model/playlist";
import { Song } from "../../model/song";

describe("Playlist", () => {
    it("should create a valid Playlist instance", () => {
        // Given
        const playlistData = {
            id: 1,
            title: "My Playlist",
            description: "A test playlist",
            songs: [new Song({ title: "Song 1", genre: "Pop", releaseDate: new Date(), length: 200 })],
        };

        // When
        const playlist = new Playlist(playlistData);

        // Then
        expect(playlist.getId()).toBe(1);
        expect(playlist.getTitle()).toBe("My Playlist");
        expect(playlist.getDescription()).toBe("A test playlist");
        expect(playlist.getSongs().length).toBe(1);
    });

    it("should throw an error if title is missing", () => {
        // Given
        const invalidData = { description: "No Title Playlist" };

        // Then
        expect(() => new Playlist(invalidData as any)).toThrowError("Title is required");
    });

    it("should handle an empty songs list", () => {
        // Given
        const playlistData = {
            id: 2,
            title: "Empty Playlist",
            description: "No songs here",
            songs: [],
        };

        // When
        const playlist = new Playlist(playlistData);

        // Then
        expect(playlist.getSongs()).toEqual([]);
    });

});
