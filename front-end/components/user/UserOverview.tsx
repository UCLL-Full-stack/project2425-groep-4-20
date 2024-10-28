import { User } from '@types';
import React from 'react';


type Props = {
  users: Array<User>;
  selectUser: (user: User) => void;
};

const UserOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
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
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} onClick={() => handleUserClick(user)} role="button">
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UserOverviewTable;