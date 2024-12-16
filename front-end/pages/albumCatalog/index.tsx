import React, { useEffect, useState } from 'react';
import AlbumService from '@services/AlbumService';
import { Album, User } from '@types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@components/Header';
import AlbumRow from '@components/albumCatalog/albumOverview';
import AddAlbumForm from '@components/albumCatalog/addAlbum';

const AlbumCatalogPage = () => {
    const { t } = useTranslation();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loggedInUser, setLoggedUser] = useState<User | null>(null);
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const fetchAlbums = async () => {
        try {
            const response = await AlbumService.getAllAlbums();
            const albumResponse: Album[] = await response.json();
            setAlbums(albumResponse);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    useEffect(() => {
        fetchAlbums();
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedUser(JSON.parse(user));
        }
    }, []);
    const handleAlbumClick = (id: number) => {
        if (selectedAlbumId === id) {
            setSelectedAlbumId(null);
        } else {
            setSelectedAlbumId(id);
        }
    };

    const selectedAlbum = albums.find((album) => album.id === selectedAlbumId);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 p-8">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">{t('catalog.albumCatalogTitle')}</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="px-4 py-2 text-left">{t('catalog.tableAlbumTitle')}</th>
                                    <th className="px-4 py-2 text-left">{t('catalog.tableSongsCount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {albums.map((album) => (
                                    <AlbumRow
                                        key={album.id}
                                        album={album}
                                        onClick={handleAlbumClick}
                                        isSelected={selectedAlbumId === album.id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedAlbum && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
                        <h3 className="text-xl font-semibold mb-4">{t('catalog.songsInAlbum')}</h3>
                        <ul>
                            {selectedAlbum.songs.map((song, index) => (
                                <li key={index} className="py-2">
                                    {song.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {loggedInUser?.role !== 'user' && (
                    <AddAlbumForm onAlbumAdded={fetchAlbums} />
                )}
            </div>
        </>
    );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale || 'en', ['common'])),
        },
    };
};

export default AlbumCatalogPage;
