import songRepository from '../../repository/song.db';
import { Song } from '../../model/song';
import { getAllSongs, getSongById } from '../../service/song.service';

jest.mock('../repository/song.db', () => ({
    getAllSongs: jest.fn(),
    getSongById: jest.fn(),
}));

describe('songService', () => {
    const mockSongs = [
        new Song({ id: 1, title: 'Song 1', genre: 'Rock', releaseDate: new Date('2020-01-01'), length: 180 }),
        new Song({ id: 2, title: 'Song 2', genre: 'Pop', releaseDate: new Date('2021-02-02'), length: 210 }),
    ];

    let getAllSongsMock: jest.Mock;
    let getSongByIdMock: jest.Mock;

    beforeEach(() => {
        getAllSongsMock = songRepository.getAllSongs as jest.Mock;
        getSongByIdMock = songRepository.getSongById as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('given valid songs, when getAllSongs is called, then it returns a list of songs', async () => {
        // given
        getAllSongsMock.mockResolvedValue(mockSongs);

        // when
        const songs = await getAllSongs();

        // then
        expect(getAllSongsMock).toHaveBeenCalledTimes(1);
        expect(songs).toEqual(mockSongs);
    });

    test('given a valid song ID, when getSongById is called, then it returns the song', async () => {
        // given
        const songId = 1;
        const mockSong = mockSongs[0];
        getSongByIdMock.mockResolvedValue(mockSong);

        // when
        const song = await getSongById(songId);

        // then
        expect(getSongByIdMock).toHaveBeenCalledWith(songId);
        expect(song).toEqual(mockSong);
    });

    test('given an invalid song ID, when getSongById is called, then it throws an error', async () => {
        // given
        const songId = 999;
        getSongByIdMock.mockResolvedValue(null);

        // when
        const getSong = async () => await getSongById(songId);

        // then
        expect(getSong).rejects.toThrow('An error occurred while fetching the song by ID');
    });
});
