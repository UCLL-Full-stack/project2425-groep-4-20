import { Playlist } from '../../model/playlist';
import * as playlistRepository from '../../repository/playlist.db';
import playlistService from '../../service/playlist.service';

let mockGetAllPlaylists: jest.Mock<any, any, any>;
let mockGetPlaylistById: jest.Mock<any, any, any>;

beforeEach(() => {
    mockGetAllPlaylists = jest.fn();
    mockGetPlaylistById = jest.fn();

    jest.spyOn(playlistRepository, 'getAllPlaylists').mockImplementation(mockGetAllPlaylists);
    jest.spyOn(playlistRepository, 'getPlaylistById').mockImplementation(mockGetPlaylistById);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Playlist Service', () => {
    test('when getAllPlaylists is called, it should return all playlists with their songs and user', async () => {
        // given
        const playlistsMockData = [
            {
                id: 1,
                title: 'Playlist 1',
                description: 'Description 1',
                user: { id: 1, name: 'User 1' },
                songs: [
                    { id: 1, title: 'Song 1', duration: 180 },
                    { id: 2, title: 'Song 2', duration: 200 },
                ],
            },
            {
                id: 2,
                title: 'Playlist 2',
                description: 'Description 2',
                user: { id: 2, name: 'User 2' },
                songs: [],
            },
        ];
        mockGetAllPlaylists.mockResolvedValue(playlistsMockData);

        // when
        const result = await playlistService.getAllPlaylists();

        // then
        expect(mockGetAllPlaylists).toHaveBeenCalledTimes(1);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Playlist);
        expect(result[0].title).toBe('Playlist 1');
        expect(result[0].songs).toHaveLength(2);
        expect(result[1].songs).toHaveLength(0);
    });

    test('when getAllPlaylists throws an error, it should propagate the error', async () => {
        // given
        mockGetAllPlaylists.mockRejectedValue(new Error('Database error'));

        // when / then
        await expect(playlistService.getAllPlaylists()).rejects.toThrow('An error occurred while fetching playlists');
        expect(mockGetAllPlaylists).toHaveBeenCalledTimes(1);
    });

    test('when getPlaylistById is called with a valid ID, it should return the playlist with its songs and user', async () => {
        // given
        const playlistMockData = {
            id: 1,
            title: 'Playlist 1',
            description: 'Description 1',
            user: { id: 1, name: 'User 1' },
            songs: [
                { id: 1, title: 'Song 1', duration: 180 },
                { id: 2, title: 'Song 2', duration: 200 },
            ],
        };
        mockGetPlaylistById.mockResolvedValue(playlistMockData);

        // when
        const result = await playlistService.getPlaylistById(1);

        // then
        expect(mockGetPlaylistById).toHaveBeenCalledTimes(1);
        expect(mockGetPlaylistById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(Playlist);
        expect(result?.title).toBe('Playlist 1');
        expect(result?.songs).toHaveLength(2);
        expect(result?.songs[0].title).toBe('Song 1');
    });

    test('when getPlaylistById is called with an invalid ID, it should return null', async () => {
        // given
        mockGetPlaylistById.mockResolvedValue(null);

        // when
        const result = await playlistService.getPlaylistById(999);

        // then
        expect(mockGetPlaylistById).toHaveBeenCalledTimes(1);
        expect(mockGetPlaylistById).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    test('when getPlaylistById throws an error, it should propagate the error', async () => {
        // given
        mockGetPlaylistById.mockRejectedValue(new Error('Database error'));

        // when / then
        await expect(playlistService.getPlaylistById(1)).rejects.toThrow('An error occurred while fetching the playlist by ID');
        expect(mockGetPlaylistById).toHaveBeenCalledTimes(1);
        expect(mockGetPlaylistById).toHaveBeenCalledWith(1);
    });
});
