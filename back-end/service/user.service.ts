import userRepository from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';




const getAllUsers = async () => {
    try {
        const users = await userRepository.getAllUsers();
        return  users;
    
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

const createUser = async (username: string, email: string, password: string, role: Role) => {
    try {
        const newUser = await userRepository.createUser(username, email, password, role);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating user');
    }
};

const getUserbyUserName = async (username: string) => {
    const user = await userRepository.getUserByUsername(username);
    if(!user){
        throw new Error('User not found');
    }
    return user
};

const loginUser = async ({username, password}: UserInput): Promise <AuthenticationResponse> => {
    
    const  user = await getUserbyUserName(username);
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error(`Ìncorrect`);
    }
    
    
    

   
    return {
        token: generateJwtToken({ username  , role : user.role }),
        username: username,
        role:user.role

    };
}

export default { getAllUsers, getUserById, createUser, loginUser };
