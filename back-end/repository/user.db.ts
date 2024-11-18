import { PrismaClient } from '@prisma/client';

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
            where: { id },
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

const createUser = async (username: string, email: string) => {
    try {
        return await database.user.create({
            data: {
                username,
                email,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the user');
    }
};

export default { getAllUsers, getUserById, createUser };
