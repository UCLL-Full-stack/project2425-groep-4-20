// import { Playlist } from '../../model/playlist';
// import { User } from '../../model/user';
// import playlistRepository from '../../repository/playlist.db';
// import playlistService from '../../service/playlist.service';

// jest.mock('../../repository/playlist.db', () => ({
//     getAllPlaylists: jest.fn(),
//     getPlaylistById: jest.fn(),
//     createPlaylist: jest.fn(),
// }));

// const mockUser = new User({
//     id: 1,
//     username: 'johndoe',
//     email: 'john.doe@example.com',
//     playlists: [],
// });

// const mockPlaylist = new Playlist({
//     id: 1,
//     title: 'Chill Beats',
//     description: 'Relax and unwind',
//     user: mockUser,
// });

// test('given existing playlists, when getAllPlaylists is called, then it returns all playlists', () => {
//     (playlistRepository.getAllPlaylists as jest.Mock).mockReturnValue([mockPlaylist]);

//     const playlists = playlistService.getAllPlaylists();

//     expect(playlistRepository.getAllPlaylists).toHaveBeenCalledTimes(1);
//     expect(playlists).toEqual([mockPlaylist]);
// });

// test('given a valid playlist ID, when getPlaylistById is called, then it returns the playlist', async () => {
//     (playlistRepository.getPlaylistById as jest.Mock).mockResolvedValue(mockPlaylist);

//     const playlist = await playlistService.getPlaylistById(1);

//     expect(playlistRepository.getPlaylistById).toHaveBeenCalledWith({ id: 1 });
//     expect(playlist).toEqual(mockPlaylist);
// });

// test('given an invalid playlist ID, when getPlaylistById is called, then it throws an error', async () => {
//     (playlistRepository.getPlaylistById as jest.Mock).mockResolvedValue(null);

//     await expect(playlistService.getPlaylistById(999)).rejects.toThrow('Playlist with id 999 does not exist.');
// });

// test('given valid details, when createPlaylist is called, then it creates and returns the new playlist', () => {
//     const newPlaylistData = {
//         title: 'Upbeat Vibes',
//         description: 'Get your energy up!',
//         user: mockUser,
//     };
//     const createdPlaylist = new Playlist({ ...newPlaylistData, id: 2 });
//     (playlistRepository.createPlaylist as jest.Mock).mockReturnValue(createdPlaylist);

//     const result = playlistService.createPlaylist(newPlaylistData.title, newPlaylistData.description, newPlaylistData.user);

//     expect(playlistRepository.createPlaylist).toHaveBeenCalledWith(newPlaylistData);
//     expect(result).toEqual(createdPlaylist);
// });
