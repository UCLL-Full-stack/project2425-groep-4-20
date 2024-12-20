import { Playlist, PrismaClient } from '@prisma/client';
import { Role, UserInput } from '../types';
import { User } from '../model/user';

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

const createUser = async ({ username, email, password, role, playlists }: { username: string; email: string; password: string; role: Role, playlists?: Playlist[] }): Promise<User> => {
    try {
      const userPrisma = await database.user.create({
        data: {
          username,
          email,
          password,
          role,
         
          
        },
        include: {playlists: true},
      });

      return User.from(userPrisma);
    } catch (error) {
      console.error(error);
      throw new Error("Could not create user: ${error}, check server log for more details");
    }
  };

export default { getAllUsers, getUserById, createUser , getUserByUsername};
