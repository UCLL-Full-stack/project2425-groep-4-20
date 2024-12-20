import React from 'react';
import { useTranslation } from 'next-i18next';

interface Playlist {
  id: number;
  title: string;
}

interface PlaylistCatalogProps {
  playlists: Playlist[];
  setSelectedPlaylist: (id: number) => void;
}

const PlaylistCatalog: React.FC<PlaylistCatalogProps> = ({ playlists, setSelectedPlaylist }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">{t('catalog.choosePlaylist')}</h2>
      <select
        onChange={(e) => setSelectedPlaylist(Number(e.target.value))}
        className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" className="text-gray-500">{t('catalog.choosePlaylist')}</option>
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.id} className="text-gray-700">
            {playlist.title}
          </option>
        ))}
      </select>
    </div>
  );
};


export default PlaylistCatalog;
