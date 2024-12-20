import { Album } from '../../model/album';
import * as albumRepository from '../../repository/album.db';
import albumService from '../../service/album.service';

let mockGetAllAlbums: jest.Mock<any, any, any>;
let mockGetAlbumById: jest.Mock<any, any, any>;

beforeEach(() => {
    mockGetAllAlbums = jest.fn();
    mockGetAlbumById = jest.fn();

    jest.spyOn(albumRepository, 'getAllAlbums').mockImplementation(mockGetAllAlbums);
    jest.spyOn(albumRepository, 'getAlbumById').mockImplementation(mockGetAlbumById);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Album Service', () => {
    test('when getAllAlbums is called, it should return all albums with their songs', async () => {
        // given
        const albumsMockData = [
            {
                id: 1,
                title: 'Album 1',
                releaseDate: new Date('2023-01-01'),
                songs: [
                    { id: 1, title: 'Song 1', duration: 180 },
                    { id: 2, title: 'Song 2', duration: 200 },
                ],
            },
            {
                id: 2,
                title: 'Album 2',
                releaseDate: new Date('2023-02-01'),
                songs: [],
            },
        ];
        mockGetAllAlbums.mockResolvedValue(albumsMockData);

        // when
        const result = await albumService.getAllAlbums();

        // then
        expect(mockGetAllAlbums).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Album);
        expect(result[0].getTitle()).toBe('Album 1');
        expect(result[0].getSongs()).toHaveLength(2);
        expect(result[1].getSongs()).toHaveLength(0);
    });

    test('when getAllAlbums throws an error, it should propagate the error', async () => {
        // given
        mockGetAllAlbums.mockRejectedValue(new Error('Database error'));

        // when / then
        await expect(albumService.getAllAlbums()).rejects.toThrow('An error occurred while fetching albums');
        expect(mockGetAllAlbums).toHaveBeenCalledTimes(1);
    });

    test('when getAlbumById is called with a valid ID, it should return the album with its songs', async () => {
        // given
        const albumMockData = {
            id: 1,
            title: 'Album 1',
            releaseDate: new Date('2023-01-01'),
            songs: [
                { id: 1, title: 'Song 1', duration: 180 },
                { id: 2, title: 'Song 2', duration: 200 },
            ],
        };
        mockGetAlbumById.mockResolvedValue(albumMockData);

        // when
        const result = await albumService.getAlbumById(1);

        // then
        expect(mockGetAlbumById).toHaveBeenCalledTimes(1);
        expect(mockGetAlbumById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(Album);
        expect(result?.getTitle()).toBe('Album 1');
        expect(result?.getSongs()).toHaveLength(2);
        expect(result?.getSongs()[0].getTitle()).toBe('Song 1');
    });

    test('when getAlbumById is called with an invalid ID, it should return null', async () => {
        // given
        mockGetAlbumById.mockResolvedValue(null);

        // when
        const result = await albumService.getAlbumById(999);

        // then
        expect(mockGetAlbumById).toHaveBeenCalledTimes(1);
        expect(mockGetAlbumById).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('when getAlbumById throws an error, it should propagate the error', async () => {
        // given
        mockGetAlbumById.mockRejectedValue(new Error('Database error'));

        // when / then
        await expect(albumService.getAlbumById(1)).rejects.toThrow('An error occurred while fetching the album by ID');
        expect(mockGetAlbumById).toHaveBeenCalledTimes(1);
        expect(mockGetAlbumById).toHaveBeenCalledWith(1);
    });
});
