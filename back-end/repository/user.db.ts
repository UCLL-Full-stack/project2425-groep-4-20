import { PrismaClient } from '@prisma/client';
import { Role } from '../types';

const database = new PrismaClient();

const getAllUsers = async () => {
    try {
        return await database.user.findMany({
            include: {
                playlists: {
                    include: {
                        songs: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching users');
    }
};

const getUserById = async (id: number) => {
    try {
        return await database.user.findUnique({
            where: { id : id},
            include: {
                playlists: {
                    include: {
                        songs: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the user by ID');
    }
};
const getUserByUsername = async (username: string) => {
    try {
        return await database.user.findFirst({
            where: { username },
            include: {
                playlists: {
                    include: {
                        songs: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the user by ID');
    }
};

const createUser = async (username: string, email: string, password: string, role: Role) => {
    try {
        return await database.user.create({
            data: {
                username,
                email,
                password,
                role,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the user');
    }
};

export default { getAllUsers, getUserById, createUser , getUserByUsername};
