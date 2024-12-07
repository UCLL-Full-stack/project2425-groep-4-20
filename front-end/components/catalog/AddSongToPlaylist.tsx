// components/AddSongToPlaylist.tsx

import React from 'react';

interface AddSongToPlaylistProps {
  songs: { id: number; title: string; album: { title: string }; genre: string }[];
  setSelectedSong: (id: number) => void;
}

const AddSongToPlaylist: React.FC<AddSongToPlaylistProps> = ({ songs, setSelectedSong }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Select Song</h2>
      <select
        onChange={(e) => setSelectedSong(Number(e.target.value))}
        className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" className="text-gray-500">Choose a song</option>
        {songs.map((song) => (
          <option key={song.id} value={song.id} className="text-gray-700">
            {song.title} - {song.album.title} ({song.genre})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddSongToPlaylist;
