import { Artist } from '../../model/artist';
import * as artistRepository from '../../repository/artist.db';
import * as artistService from '../../service/artist.service';

let mockGetAllArtists: jest.Mock;
let mockGetArtistById: jest.Mock;

beforeEach(() => {
    mockGetAllArtists = jest.fn();
    mockGetArtistById = jest.fn();

    jest.spyOn(artistRepository, 'getAllArtists').mockImplementation(mockGetAllArtists);
    jest.spyOn(artistRepository, 'getArtistById').mockImplementation(mockGetArtistById);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Artist Service', () => {
    describe('getAllArtists', () => {
        test('when artists exist, it should return a list of artists', async () => {
            // given
            const artistData = [
                { id: 1, name: 'Artist One', birthdate: new Date('1990-01-01'), albums: [] },
                { id: 2, name: 'Artist Two', birthdate: new Date('1985-05-15'), albums: [] },
            ];
            mockGetAllArtists.mockResolvedValue(artistData);

            // when
            const artists = await artistService.getAllArtists();

            // then
            expect(mockGetAllArtists).toHaveBeenCalledTimes(1);
            expect(artists).toHaveLength(2);
            expect(artists[0]).toBeInstanceOf(Artist);
            expect(artists[0].getName()).toBe('Artist One');
        });

        test('when an error occurs, it should throw an error', async () => {
            // given
            mockGetAllArtists.mockRejectedValue(new Error('Database error'));

            // when
            const fetchArtists = async () => await artistService.getAllArtists();

            // then
            expect(fetchArtists).rejects.toThrow('An error occurred while fetching artists');
            expect(mockGetAllArtists).toHaveBeenCalledTimes(1);
        });
    });

    describe('getArtistById', () => {
        test('when the artist exists, it should return the artist', async () => {
            // given
            const artistData = { id: 1, name: 'Artist One', birthdate: new Date('1990-01-01'), albums: [] };
            mockGetArtistById.mockResolvedValue(artistData);

            // when
            const artist = await artistService.getArtistById(1);

            // then
            expect(mockGetArtistById).toHaveBeenCalledTimes(1);
            expect(mockGetArtistById).toHaveBeenCalledWith(1);
            expect(artist).toBeInstanceOf(Artist);
            expect(artist?.getName()).toBe('Artist One');
        });

        test('when the artist does not exist, it should return null', async () => {
            // given
            mockGetArtistById.mockResolvedValue(null);

            // when
            const artist = await artistService.getArtistById(1);

            // then
            expect(mockGetArtistById).toHaveBeenCalledTimes(1);
            expect(mockGetArtistById).toHaveBeenCalledWith(1);
            expect(artist).toBeNull();
        });

        test('when an error occurs, it should throw an error', async () => {
            // given
            mockGetArtistById.mockRejectedValue(new Error('Database error'));

            // when
            const fetchArtist = async () => await artistService.getArtistById(1);

            // then
            expect(fetchArtist).rejects.toThrow('An error occurred while fetching the artist by ID');
            expect(mockGetArtistById).toHaveBeenCalledTimes(1);
        });
    });
});
