import React, { useState } from 'react';
import SongService from '@services/SongService';
import { useTranslation } from 'next-i18next';

type Props = {
    onSongAdded: () => void;
};

const AddSong: React.FC<Props> = ({ onSongAdded }: Props) => {
    const { t } = useTranslation();
    const [newSong, setNewSong] = useState({ title: '', genre: '', releaseDate: '', length: 0 });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSong((prev) => ({ ...prev, [name]: name === 'length' ? Number(value) : value }));
    };

    const handleAddSong = async () => {
        if (!newSong.title || !newSong.genre || !newSong.releaseDate || !newSong.length) {
            alert(t('addSong.errorFillFields'));
            return;
        }

        try {
            await SongService.addSong({ ...newSong, releaseDate: new Date(newSong.releaseDate) });
            alert(t('addSong.success'));
            setNewSong({ title: '', genre: '', releaseDate: '', length: 0 });
            onSongAdded();
        } catch (error) {
            alert(t('addSong.error'));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{t('addSong.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder={t('addSong.songTitle')}
                    value={newSong.title}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="genre"
                    placeholder={t('addSong.songGenre')}
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
                    placeholder={t('addSong.songLength')}
                    value={newSong.length}
                    onChange={handleInputChange}
                    className="p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                onClick={handleAddSong}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
            >
                {t('addSong.addButton')}
            </button>
        </div>
    );
};

export default AddSong;
