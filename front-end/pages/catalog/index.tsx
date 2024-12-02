import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import { SongWithRelations } from '@types';
import SongService from '@services/SongService';

const CatalogPage: React.FC = () => {
  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongWithRelations[]>([]);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await SongService.getAllSongs();
        setSongs(data);
        setFilteredSongs(data);
      } catch (err) {
        setError('An error occurred while fetching songs');
        console.error(err);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs);
    }
  }, [searchQuery, songs]);

  return (
    <>
      <Header />
      <div className="p-6 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Song Catalog</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Song by Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-full max-w-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredSongs.length === 0 ? (
          <p className="text-gray-600 text-center">No songs available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-700">Artist</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-700">Album</th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song) => (
                  <tr
                    key={song.id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-4 py-2 border-b text-sm text-blue-700">{song.title}</td>
                    <td className="px-4 py-2 border-b text-sm text-blue-700">
                      {song.album.artist.name}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-blue-700">{song.album.title}</td>
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
