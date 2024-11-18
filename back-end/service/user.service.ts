import userRepository from '../repository/user.db';

const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching users');
    }
};

const getUserById = async (id: number) => {
    try {
        const user = await userRepository.getUserById(id);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the user by ID');
    }
};

const createUser = async (username: string, email: string) => {
    try {
        const newUser = await userRepository.createUser(username, email);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating user');
    }
};

export default { getAllUsers, getUserById, createUser };
