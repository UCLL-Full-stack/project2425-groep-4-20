import { Artist } from "../../model/artist";
import { Album } from "../../model/album";

describe("Artist", () => {
    it("should create a valid Artist instance", () => {
        // Given
        const albums = [
            new Album({ title: "Album 1", releaseDate: new Date("2020-01-01"), songs: [] }),
        ];

        const validArtistData = {
            id: 1,
            name: "Test Artist",
            birthdate: new Date("1990-01-01"),
            albums: albums,
        };

        // When
        const artist = new Artist(validArtistData);

        // Then
        expect(artist.getId()).toBe(1);
        expect(artist.getName()).toBe("Test Artist");
        expect(artist.getBirthdate()).toEqual(new Date("1990-01-01"));
        expect(artist.getAlbums().length).toBe(1);
    });

    it("should throw an error if albums are missing", () => {
        // Given
        const invalidArtistData = {
            name: "Test Artist",
            birthdate: new Date("1990-01-01"),
        };

        // Then
        expect(() => new Artist(invalidArtistData as any)).toThrowError("Albums is required");
    });
});
