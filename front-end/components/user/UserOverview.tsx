import { Playlist, User } from '@types';
import React from 'react';


type Props = {
  users: Array<User>;
  selectUser: (user: User) => void;
  playlists: Array<Playlist>;
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser, playlists }: Props) => {
  const handleUserClick = (user: User) => {
    selectUser(user);
  };

  return (
    <>
      {users && (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Playlists</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const userPlaylists = playlists.filter(playlist => playlist.user.id === user.id);
                return (
                  <tr key={user.id} onClick={() => handleUserClick(user)} role="button">
                    <td>{user.username}</td>
                    <td>{user.email}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UserOverviewTable;