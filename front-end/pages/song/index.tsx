import Head from 'next/head';
import { useEffect, useState } from 'react';
import { SongWithRelations, User } from '@types';
import Header from '@components/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SongService from '@services/SongService';
import AddSong from '@components/song/addSong';
import SongOverviewTable from '@components/song/songOverviewTable';

const SongsPage = () => {
  const { t } = useTranslation();
  const [songs, setSongs] = useState<SongWithRelations[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongWithRelations[]>([]);
   const [loggedInUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await SongService.getAllSongs();
      setSongs(response);
      setFilteredSongs(response);
    };
    fetchSongs();
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        setLoggedUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <Head>
        <title>{t('songs.title')}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">{t('songs.title')}</h1>
        <section className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <SongOverviewTable
            songs={filteredSongs}
            setFilteredSongs={setFilteredSongs}
            originalSongs={songs}
          />
        </section>
        {loggedInUser?.role !== "user" && (
        <section className="mt-8 w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
          <AddSong
            onSongAdded={() =>
              SongService.getAllSongs().then((updatedSongs) => {
                setSongs(updatedSongs);
                setFilteredSongs(updatedSongs);
              })
            }
          />
        </section>)}
      </main>
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default SongsPage;
