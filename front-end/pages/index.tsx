import { useEffect, useState } from 'react';
import Header from '@components/Header';
import UserOverviewTable from '@components/user/UserOverview';
import UserService from '@services/UserService';
import PlaylistService from '@services/PlaylistService';
import AddPlaylist from './addPlaylist';
import { Playlist, User } from '@types';

const Home: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const json = await response.json();
    setUsers(json);
  };

  const getPlaylists = async () => {
    const response = await PlaylistService.getAllPlaylists();
    const json = await response.json();
    setPlaylists(json);
  };

  useEffect(() => {
    getUsers();
    getPlaylists();
  }, []);

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
      setSelectedUser((prev) => (prev ? {
        ...prev,
        playlists: [...prev.playlists, playlistWithId],
      } : null));
    }
  };

  return (
    <>
      <Header />
      <h1>Welcome to the Music Management App</h1>
      {users.length > 0 && (
        <UserOverviewTable 
          users={users} 
          selectUser={handleSelectUser} 
          playlists={playlists}
        />
      )}
      {selectedUser && (
        <AddPlaylist 
          selectedUser={selectedUser} 
          onAddPlaylist={handleAddPlaylist} 
          users={users}
        />
      )}
    </>
  );
};

export default Home;
