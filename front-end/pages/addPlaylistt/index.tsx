import { useEffect, useState } from 'react';
import Header from '@components/Header';
import UserOverviewTable from '@components/playlist/PlaylistOverview';
import UserService from '@services/UserService';
import PlaylistService from '@services/PlaylistService';
import AddPlaylist from '@components/playlist/AddPlaylistForm';
import { Playlist, User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Add: React.FC = () => {
  const { t } = useTranslation('common');
  const [users, setUsers] = useState<Array<User>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const json = await response.json();
    setUsers(json);
  };

  const getPlaylists = async () => {
    const response = await PlaylistService.getAllPlaylists();
    const json = await response.json();
    setPlaylists(json || []);
  };

  useEffect(() => {
    getUsers();
    getPlaylists();
  }, []);

  useEffect(() => {
    if (Array.isArray(playlists)) {
      const filteredPlaylists = searchQuery
        ? playlists.filter((playlist) =>
            playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : playlists;

      const filteredUsers = users.filter((user) => {
        const matchingPlaylists = user.playlists.filter((playlist) =>
          filteredPlaylists.some((filteredPlaylist) => filteredPlaylist.id === playlist.id)
        );
        return matchingPlaylists.length > 0;
      });

      setFilteredUsers(filteredUsers);
    }
  }, [searchQuery, playlists, users]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleAddPlaylist = (newPlaylist: Omit<Playlist, 'id'>) => {
    const id = playlists.length ? playlists[playlists.length - 1].id + 1 : 1;
    const playlistWithId: Playlist = { ...newPlaylist, id };
    setPlaylists((prev) => [...prev, playlistWithId]);

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === newPlaylist.user.id) {
          return { ...user, playlists: [...user.playlists, playlistWithId] };
        }
        return user;
      })
    );

    if (selectedUser && selectedUser.id === newPlaylist.user.id) {
      setSelectedUser((prev) =>
        prev
          ? {
              ...prev,
              playlists: [...prev.playlists, playlistWithId],
            }
          : null
      );
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen">
        <div className="max-w-screen-xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Playlists</h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search Playlist by Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredUsers.length > 0 ? (
            <UserOverviewTable
              users={filteredUsers}
              selectUser={handleSelectUser}
              playlists={playlists} // Display all playlists for each user
            />
          ) : (
            <div className="text-center text-gray-500">
              No playlists found.
            </div>
          )}

          {selectedUser && (
            <AddPlaylist
              selectedUser={selectedUser}
              onAddPlaylist={handleAddPlaylist}
              users={users}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Add;
