import React, { useEffect, useState } from 'react';
import PlaylistService from '@services/PlaylistService';
import SongService from '@services/SongService';
import AddSongToPlaylist from '@components/catalog/AddSongToPlaylist';
import PlaylistCatalog from '@components/catalog/PlaylistCatalog';
import Header from '@components/Header';
import { SongWithRelations } from '@types';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const IndexPage = () => {
  const { t } = useTranslation();
  const [playlists, setPlaylists] = useState<{ id: number; title: string; description: string; user: { username: string }; songs: { id: number; title: string; album: { title: string } }[] }[]>([]);
  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPlaylistsAndSongs = async () => {
      const playlistResponse = await PlaylistService.getAllPlaylists();
      const playlistData = await playlistResponse.json();
      setPlaylists(playlistData);

      const songResponse = await SongService.getAllSongs();
      setSongs(songResponse);
    };

    fetchPlaylistsAndSongs();
  }, []);

  const handleAddSong = async () => {
    if (selectedPlaylist !== null && selectedSong !== null) {
      await PlaylistService.addSongToPlaylist(selectedPlaylist, selectedSong);

      const updatedPlaylistsResponse = await PlaylistService.getAllPlaylists();
      const updatedPlaylists = await updatedPlaylistsResponse.json();
      setPlaylists(updatedPlaylists);

      alert('Song successfully added to playlist!');
    } else {
      alert('Please select both a playlist and a song');
    }
  };

  const handleUpdateTitle = async () => {
    if (selectedPlaylist !== null && newTitle.trim() !== '') {
      await PlaylistService.updatePlaylistTitle(selectedPlaylist, newTitle);
      const updatedPlaylistsResponse = await PlaylistService.getAllPlaylists();
      const updatedPlaylists = await updatedPlaylistsResponse.json();
      setPlaylists(updatedPlaylists);

      setIsEditing(false);
      setNewTitle('');
    }
  };

  const handleRemoveSong = async (songId: number, playlistId: number) => {
    try {
      // Call the API to remove the song from the playlist
      await PlaylistService.removeSongFromPlaylist(playlistId, songId);

      // Find the playlist and remove the song from the list
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          // Filter out the song from the playlist
          playlist.songs = playlist.songs.filter((song) => song.id !== songId);
        }
        return playlist;
      });

      // Update the state without fetching the entire playlist list again
      setPlaylists(updatedPlaylists);

      alert('Song successfully removed from playlist!');
    } catch (error) {
      alert('Failed to remove song from playlist');
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Playlist Catalog</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 text-left">Playlist</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Songs</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {playlists.map((playlist) => (
                  <tr key={playlist.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-2">{playlist.title}</td>
                    <td className="px-4 py-2">{playlist.user.username}</td>
                    <td className="px-4 py-2">
                      {playlist.songs.length > 0 ? (
                        <ul className="list-disc pl-6">
                          {playlist.songs.map((song) => (
                            <li key={song.id} className="text-gray-700">
                              {song.title}
                              <button
                                onClick={() => handleRemoveSong(song.id, playlist.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No songs in this playlist.</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => { setIsEditing(true); setNewTitle(playlist.title); setSelectedPlaylist(playlist.id); }}
                        className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        Edit Title
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditing && (
            <div className="mt-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleUpdateTitle}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          )}

          <div className="mt-8">
            <PlaylistCatalog playlists={playlists} setSelectedPlaylist={setSelectedPlaylist} />
            <AddSongToPlaylist songs={songs} setSelectedSong={setSelectedSong} />
            <button
              onClick={handleAddSong}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
            >
              Add Song to Playlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};

export default IndexPage;
