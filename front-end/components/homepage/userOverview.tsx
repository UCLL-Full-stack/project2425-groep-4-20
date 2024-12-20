import React, { useEffect, useState } from 'react';
import { User } from '@types';
import UserService from '@services/UserService';

const UserOverview: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-2 text-left text-blue-800 font-bold">Username</th>
            <th className="px-6 py-2 text-left text-blue-800 font-bold">Password</th>
            <th className="px-6 py-2 text-left text-blue-800 font-bold">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-3 text-gray-700">{user.username}</td>
              <td className="px-6 py-3 text-gray-700">{`p${index + 1}`}</td>
              <td className="px-6 py-3 text-gray-700">{user.role || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserOverview;
