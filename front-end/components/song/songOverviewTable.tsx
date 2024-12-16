import React, { useEffect, useState } from 'react';
import { Album, SongWithRelations } from '@types';
import { useTranslation } from 'next-i18next';
import AlbumService from '@services/AlbumService';

type Props = {
    songs: SongWithRelations[];
    setFilteredSongs: React.Dispatch<React.SetStateAction<SongWithRelations[]>>;
    originalSongs: SongWithRelations[];
};

const SongOverviewTable: React.FC<Props> = ({ songs, setFilteredSongs, originalSongs }: Props) => {
    const { t } = useTranslation();
    const [albums, setAlbums] = useState<Record<number, string>>({});

    useEffect(() => {
        const loadAlbums = async () => {
            const albumResponse = await AlbumService.getAllAlbums();
            if (albumResponse.ok) {
                const albumsData = await albumResponse.json();
                const albumMap: Record<number, string> = albumsData.reduce((acc: Record<number, string>, album: Album) => {
                    acc[album.id] = album.title;
                    return acc;
                }, {});
                setAlbums(albumMap);
            }
        };
        loadAlbums();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setFilteredSongs(
            originalSongs.filter((song) => song.title.toLowerCase().includes(value))
        );
    };

    return (
        <>
            <input
                type="text"
                placeholder={t('songs.searchPlaceholder')}
                onChange={handleSearchChange}
                className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 text-left">{t('songs.table.title')}</th>
                            <th className="px-4 py-2 text-left">{t('songs.table.genre')}</th>
                            <th className="px-4 py-2 text-left">{t('songs.table.releaseDate')}</th>
                            <th className="px-4 py-2 text-left">{t('songs.table.length')}</th>
                            <th className="px-4 py-2 text-left">{t('songs.table.album')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song.id} className="border-b hover:bg-blue-50">
                                <td className="px-4 py-2">{song.title}</td>
                                <td className="px-4 py-2">{song.genre}</td>
                                <td className="px-4 py-2">{new Date(song.releaseDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{song.length} min</td>
                                <td className="px-4 py-2">{albums[song.album.id]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SongOverviewTable;
