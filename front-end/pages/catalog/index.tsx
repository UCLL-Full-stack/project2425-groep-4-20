import React, { useEffect, useState } from 'react';
import PlaylistService from '@services/PlaylistService';
import SongService from '@services/SongService';
import AddSongToPlaylist from '@components/catalog/AddSongToPlaylist';
import PlaylistCatalog from '@components/catalog/PlaylistCatalog';
import Header from '@components/Header';
import { SongWithRelations, User } from '@types';
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
  const [loggedInUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchPlaylistsAndSongs = async () => {
      const playlistResponse = await PlaylistService.getAllPlaylists();
      const playlistData = await playlistResponse.json();
      setPlaylists(playlistData);

      const songResponse = await SongService.getAllSongs();
      setSongs(songResponse);
    };

    fetchPlaylistsAndSongs();
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  const handleAddSong = async () => {
    if (selectedPlaylist !== null && selectedSong !== null) {
      await PlaylistService.addSongToPlaylist(selectedPlaylist, selectedSong);

      const updatedPlaylistsResponse = await PlaylistService.getAllPlaylists();
      const updatedPlaylists = await updatedPlaylistsResponse.json();
      setPlaylists(updatedPlaylists);

      alert(t('catalog.success'));
    } else {
      alert(t('catalog.error'));
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
      await PlaylistService.removeSongFromPlaylist(playlistId, songId);
  
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          playlist.songs = playlist.songs.filter((song) => song.id !== songId);
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
      alert(t('catalog.removesuccess'));
    } catch (error) {
      console.error('Error removing song:', error);
      alert(t('catalog.removeerror'));
    }
  };
  

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">{t('catalog.title')}</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 text-left">{t('catalog.tablePlaylist')}</th>
                  <th className="px-4 py-2 text-left">{t('catalog.tableUser')}</th>
                  <th className="px-4 py-2 text-left">{t('catalog.tableSongs')}</th>
                  {loggedInUser?.role !== "artist" && (
                  <th className="px-4 py-2 text-left">{t('catalog.tableActions')}</th>)}
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
                              {loggedInUser?.role !== "artist" && (
                              <button
                                onClick={() => handleRemoveSong(song.id, playlist.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                {t('catalog.removeSong')}
                              </button>)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">{t('catalog.noSongs')}</span>
                      )}
                    </td> {loggedInUser?.role !== "artist" && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => { setIsEditing(true); setNewTitle(playlist.title); setSelectedPlaylist(playlist.id); }}
                        className="mr-2 px-4 py-2 bg-blue-600 text-white rounded"
                      >
                        {t('catalog.editTitle')}
                      </button>
                    </td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditing && (
            <div className="mt-4">
              <input
                type="text"
                placeholder={t('catalog.editPlaceholder')}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleUpdateTitle}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {t('catalog.save')}
              </button>
            </div>
          )}

          {loggedInUser?.role !== "artist" && (
            <div className="mt-8">
              <PlaylistCatalog playlists={playlists} setSelectedPlaylist={setSelectedPlaylist} />
              <AddSongToPlaylist songs={songs} setSelectedSong={setSelectedSong} />
              <button
                onClick={handleAddSong}
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
              >
                {t('catalog.addSong')}
              </button>
            </div>
          )}
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
