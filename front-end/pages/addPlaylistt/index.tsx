import { useEffect, useState } from 'react';
import Header from '@components/Header';
import UserOverviewTable from '@components/user/UserOverview';
import UserService from '@services/UserService';
import PlaylistService from '@services/PlaylistService';
import AddPlaylist from '@components/playlist/AddPlaylistForm';
import { Playlist, User } from '@types';

const Add: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Array<Playlist>>([]);
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
    setFilteredPlaylists(json || []);
  };

  useEffect(() => {
    getUsers();
    getPlaylists();
  }, []);

  useEffect(() => {
    if (Array.isArray(playlists)) {
      if (searchQuery) {
        const filtered = playlists.filter((playlist) =>
          playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPlaylists(filtered);
      } else {
        setFilteredPlaylists(playlists);
      }
    }
  }, [searchQuery, playlists]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleAddPlaylist = (newPlaylist: Omit<Playlist, 'id'>) => {
    const id = playlists.length ? playlists[playlists.length - 1].id + 1 : 1;
    const playlistWithId: Playlist = { ...newPlaylist, id };
    setPlaylists((prev) => [...prev, playlistWithId]);
    setFilteredPlaylists((prev) => [...prev, playlistWithId]);

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
      <div className="bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 min-h-screen">
        <div className="max-w-screen-xl mx-auto p-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Welcome to the Music Management App</h1>
          <h2 className="text-xl text-blue-600 mb-4 text-center">Press on a user to add a Playlist</h2>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search Playlist by Title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 w-full max-w-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {users.length > 0 && (
            <UserOverviewTable 
              users={users} 
              selectUser={handleSelectUser} 
              playlists={filteredPlaylists}
            />
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

export default Add;
