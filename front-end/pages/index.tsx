import UserOverview from '@components/user/UserOverview';
import UserOverviewTable from '@components/user/UserOverview';
import UserService from '@services/UserService';
import { User } from '@types';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [users, setUser] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const json = await response.json();
    setUser(json);
  };

  useEffect(() => {
    getUsers();
  }, []);
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };
  return (
    <>
      <h1>Welcome to the Music Management App</h1>
      {users && (
          <UserOverview users={users} selectUser={handleSelectUser} />
        )}
    </>
  );
};

export default Home;
