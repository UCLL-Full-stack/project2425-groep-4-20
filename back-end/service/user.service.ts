import { User } from '../model/user';
import userRepository from '../repository/user.db';
import { Playlist } from '../model/playlist';

const getAllUsers = (): User[] => {
    return userRepository.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    const user = await userRepository.getUserById({ id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
};

const createUser = (username: string, email: string): User => {
    const newUser = { username, email };
    return userRepository.createUser(newUser);
};

// const addPlaylistToUser = (userId: number, playlist: Playlist): User | null => {
//     const user = userRepository.addPlaylistToUser(userId, playlist);
//     if (!user) {
//         throw new Error(`User with id ${userId} does not exist.`);
//     }
//     return user;
// };

// const removePlaylistFromUser = (userId: number, playlistId: number): User | null => {
//     const user = userRepository.removePlaylistFromUser(userId, playlistId);
//     if (!user) {
//         throw new Error(`User or Playlist with id ${playlistId} does not exist.`);
//     }
//     return user;
// };

export default { getAllUsers, getUserById, createUser };
