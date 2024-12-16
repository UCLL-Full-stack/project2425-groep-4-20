import React, { useState } from 'react';
import { t } from 'i18next';
import AlbumService from '@services/AlbumService';

interface AddAlbumFormProps {
    onAlbumAdded: () => void;
}

const AddAlbumForm: React.FC<AddAlbumFormProps> = ({ onAlbumAdded }) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const handleAddAlbum = async () => {
        if (!title || !artist || !releaseDate) {
            alert(t('albumcatalog.fillFields'));
            return;
        }

        try {
            const response = await AlbumService.addAlbum({ title, artist, releaseDate });
            if (response.ok) {
                alert(t('albumcatalog.albumAdded'));
                onAlbumAdded();  // Fetch new album list
                setTitle('');
                setArtist('');
                setReleaseDate('');
            } else {
                alert(t('albumcatalog.errorAddingAlbum'));
            }
        } catch (error) {
            console.error('Error adding album:', error);
            alert(t('albumcatalog.errorAddingAlbum'));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">{t('albumcatalog.addAlbumTitle')}</h3>
            <div className="flex flex-col gap-6">
                <div>
                    <label htmlFor="albumTitle" className="block text-sm font-medium text-gray-700">{t('albumcatalog.albumTitle')}</label>
                    <input
                        type="text"
                        id="albumTitle"
                        placeholder="Album title"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-700">{t('albumcatalog.artist')}</label>
                    <input
                        type="text"
                        id="artist"
                        placeholder="artist"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">{t('albumcatalog.releaseDate')}</label>
                    <input
                        type="date"
                        id="releaseDate"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={handleAddAlbum}
                >
                    add Album
                </button>
            </div>
        </div>
    );
};

export default AddAlbumForm;
