import Header from '@components/Header';
import UserOverviewTable from '@components/user/UserOverview';
import UserService from '@services/UserService';
import PlaylistService from '@services/PlaylistService';
import { User, Playlist } from '@types';
import React, { useEffect, useState } from 'react';

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
    </>
  );
};

export default Home;
