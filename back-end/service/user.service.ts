import userRepository from '../repository/user.db';
import { AuthenticationResponse, Role, UserInput, UserLogin } from '../types';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';





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

const createUser = async ({
    username,
    password,
    email,
    
  }: UserInput): Promise<AuthenticationResponse> => {
    const existingUser = await userRepository.getUserByUsername(username);
  
    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }
    
    

    const hashedPassword = await bcrypt.hash(password, 12);
    const role = "user" as Role;
    const newUser = {
        username,
        password: hashedPassword,
        email,
        role,
    };
  
    const createdUser = await userRepository.createUser(newUser);
  
    return {
        token: generateJwtToken({ username: createdUser.getUsername(), role: createdUser.getRole() }),
        username,
        role,
    };
  };

const getUserbyUserName = async (username: string) => {
    const user = await userRepository.getUserByUsername(username);
    if(!user){
        throw new Error('User not found');
    }
    return user
};

const authenticate= async ({username, password}:UserLogin): Promise<AuthenticationResponse> => {
    const user = await getUserbyUserName(username);
    console.log('Provided Password:', password);
    console.log('User Password:', user.password);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    console.log(user)
    console.log('User Role:', user.role)
    return {
      token: generateJwtToken({username, role: user.role}),
      role: user.role,
      username: username,
  
    }
  };

export default { getAllUsers, getUserById, createUser, authenticate };
