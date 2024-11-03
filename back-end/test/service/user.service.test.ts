import { User } from '../../model/user';
import userRepository from '../../repository/user.db';
import userService from '../../service/user.service';

jest.mock('../../repository/user.db', () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
}));

const mockUser = new User({
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    playlists: [],
});

test('given existing users, when getAllUsers is called, then it returns all users', () => {
    (userRepository.getAllUsers as jest.Mock).mockReturnValue([mockUser]);

    const users = userService.getAllUsers();

    expect(userRepository.getAllUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual([mockUser]);
});

test('given a valid user ID, when getUserById is called, then it returns the user', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const user = await userService.getUserById(1);

    expect(userRepository.getUserById).toHaveBeenCalledWith({ id: 1 });
    expect(user).toEqual(mockUser);
});

test('given an invalid user ID, when getUserById is called, then it throws an error', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUserById(999)).rejects.toThrow('User with id 999 does not exist.');
});

test('given valid details, when createUser is called, then it creates and returns the new user', () => {
    const newUserData = {
        username: 'janedoe',
        email: 'jane.doe@example.com',
    };
    const createdUser = new User({ ...newUserData, id: 2 });
    (userRepository.createUser as jest.Mock).mockReturnValue(createdUser);

    const result = userService.createUser(newUserData.username, newUserData.email);

    expect(userRepository.createUser).toHaveBeenCalledWith(newUserData);
    expect(result).toEqual(createdUser);
});
