import { User } from '../model/user';
import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    try {
        const result = await database.user.findMany(
            {
                include: {
                    playlists: {
                        include: {
                            songs: true,
                        },
                    },
                },
            },
        );
        return result.map((user) => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching users');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const result = await database.user.findUnique({
            where: { id },
            include: {
                playlists: {
                    include: {
                        songs: true,
                    },
                },
            },
        });
        if (!result) {
            return null;
        }
        return User.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the user by ID');
    }
};


const createUser = async (username: string, email: string) => {
    try {
        const newUser = await database.user.create({
            data: {
                username,
                email,
            },
        });
        return newUser;
    } catch (error) {
        throw new Error('Error creating user');
    }
};

export default { getAllUsers, getUserById, createUser };