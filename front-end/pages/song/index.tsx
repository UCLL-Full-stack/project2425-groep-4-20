import React, { useEffect, useState } from 'react';
import SongService from '@services/SongService';
import { SongWithRelations } from '@types';
import Header from '@components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const SongPage = () => {
    const {t} = useTranslation('');
  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongWithRelations[]>([]);
  const [search, setSearch] = useState('');
  const [newSong, setNewSong] = useState({ title: '', genre: '', releaseDate: '', length: 0 });

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await SongService.getAllSongs();
      setSongs(response);
      setFilteredSongs(response);
    };
    fetchSongs();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredSongs(
      songs.filter((song) => song.title.toLowerCase().includes(value))
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSong((prev) => ({ ...prev, [name]: name === 'length' ? Number(value) : value }));
  };

  const handleAddSong = async () => {
    if (!newSong.title || !newSong.genre || !newSong.releaseDate || !newSong.length) {
      alert('All fields are required');
      return;
    }

    try {
      await SongService.addSong({ ...newSong, releaseDate: new Date(newSong.releaseDate) });
      alert('Song added successfully');
      setNewSong({ title: '', genre: '', releaseDate: '', length: 0 });
      const updatedSongs = await SongService.getAllSongs();
      setSongs(updatedSongs);
      setFilteredSongs(updatedSongs);
    } catch (error) {
      alert('Failed to add song');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8">
      <Header />

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Song Catalog</h1>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search songs..."
            value={search}
            onChange={handleSearchChange}
            className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Genre</th>
                <th className="px-4 py-2 text-left">Release Date</th>
                <th className="px-4 py-2 text-left">Length</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.map((song) => (
                <tr key={song.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{song.title}</td>
                  <td className="px-4 py-2">{song.genre}</td>
                  <td className="px-4 py-2">{new Date(song.releaseDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{song.length} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Song</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newSong.title}
              onChange={handleInputChange}
              className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={newSong.genre}
              onChange={handleInputChange}
              className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="releaseDate"
              value={newSong.releaseDate}
              onChange={handleInputChange}
              className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="length"
              placeholder="Length (min)"
              value={newSong.length}
              onChange={handleInputChange}
              className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddSong}
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
          >
            Add Song
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
    };

export default SongPage;
