import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import { SongWithRelations } from '@types';
import SongService from '@services/SongService';

const CatalogPage: React.FC = () => {
  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await SongService.getAllSongs();
        setSongs(data);
      } catch (err) {
        setError('An error occurred while fetching songs');
        console.error(err);
      }
    };
    fetchSongs();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Song Catalog</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {songs.length === 0 ? (
          <p className="text-gray-600">No songs available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Artist</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Album</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr
                    key={song.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{song.title}</td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {song.album.artist.name}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">{song.album.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogPage;
