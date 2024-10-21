import { User } from '../model/user';
import { Playlist } from '../model/playlist'; 

const userList: User[] = [
    new User({
        id: 1,
        username: 'techmaster',
        email: 'klaas.ceusters@ucll.be',
        playlists: [], 
    }),
    new User({
        id: 2,
        username: 'musiclover',
        email: 'ferre.verheyen@ucll.be',
        playlists: [],
    }),
];

const getAllUsers = (): User[] => {
    return userList;
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    const user = userList.find(user => user.getId() === id);
    return user || null;
};

const createUser = (userData: { username: string; email: string; playlists?: Playlist[] }): User => {
    const newUser = new User({
        id: userList.length + 1,
        ...userData,
    });
    userList.push(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
};
