import { Playlist, User } from '@types';
import React, { useState } from 'react';

type Props = {
  users: Array<User>;
  selectUser: (user: User) => void;
  playlists: Array<Playlist>;
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser, playlists }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleUserClick = (user: User) => {
    selectUser(user);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {users && (
        <>
        {/* Zoekbalk */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username or email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <table className="table w-full table-hover">
            <thead className="bg-yellow-300">
              <tr>
                <th scope="col">Playlists</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const userPlaylists = playlists.filter(playlist => playlist.user.id === user.id);
                return (
                  <tr key={user.id} onClick={() => handleUserClick(user)} role="button">
                    <td>
                      {userPlaylists.length > 0 ? (
                        <ul>
                          {userPlaylists.map((playlist) => (
                            <li key={playlist.id}>{playlist.title}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No Playlists</span>
                      )}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </>
      )}
    </>
  );
};

export default UserOverviewTable;
