// import userRepository from '../../repository/user.db';
// import { getAllUsers, getUserById, createUser, authenticate } from '../../service/user.service';
// import bcrypt from 'bcrypt';
// import { generateJwtToken } from '../../util/jwt';

// // Mock the userRepository methods
// jest.mock('../repository/user.db', () => ({
//     getAllUsers: jest.fn(),
//     getUserById: jest.fn(),
//     getUserByUsername: jest.fn(),
//     createUser: jest.fn(),
// }));

// jest.mock('bcrypt', () => ({
//     hash: jest.fn(),
//     compare: jest.fn(),
// }));

// jest.mock('../util/jwt', () => ({
//     generateJwtToken: jest.fn(),
// }));

// describe('userService', () => {
//     const mockUsers = [
//         {
//             id: 1,
//             username: 'john_doe',
//             email: 'john.doe@example.com',
//             password: 'hashedpassword',
//             role: 'user',
//             playlists: [],
//         },
//         {
//             id: 2,
//             username: 'jane_doe',
//             email: 'jane.doe@example.com',
//             password: 'hashedpassword',
//             role: 'admin',
//             playlists: [],
//         },
//     ];

//     let hashMock: jest.Mock;
//     let compareMock: jest.Mock;
//     let generateJwtTokenMock: jest.Mock;

//     beforeEach(() => {
//         // Mock functions in `bcrypt` and `jwt`
//         hashMock = bcrypt.hash as jest.Mock;
//         compareMock = bcrypt.compare as jest.Mock;
//         generateJwtTokenMock = generateJwtToken as jest.Mock;
//     });

//     afterEach(() => {
//         // Clear all mocks after each test
//         jest.clearAllMocks();
//     });

//     test('should return all users', async () => {
//         // Given
//         userRepository.getAllUsers.mockResolvedValue(mockUsers);

//         // When
//         const users = await getAllUsers();

//         // Then
//         expect(userRepository.getAllUsers).toHaveBeenCalledTimes(1);
//         expect(users).toEqual(mockUsers);
//     });

//     test('should return user by id', async () => {
//         // Given
//         const userId = 1;
//         const mockUser = mockUsers[0];
//         userRepository.getUserById.mockResolvedValue(mockUser);

//         // When
//         const user = await getUserById(userId);

//         // Then
//         expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
//         expect(user).toEqual(mockUser);
//     });

//     test('should create a new user and return authentication response', async () => {
//         // Given
//         const userInput = {
//             username: 'john_doe',
//             password: 'password123',
//             email: 'john.doe@example.com',
//         };
//         const hashedPassword = 'hashedpassword';
//         hashMock.mockResolvedValue(hashedPassword);
//         userRepository.createUser.mockResolvedValue(mockUsers[0]);
//         generateJwtTokenMock.mockReturnValue('fake-jwt-token');

//         // When
//         const response = await createUser(userInput);

//         // Then
//         expect(userRepository.createUser).toHaveBeenCalledWith({
//             username: userInput.username,
//             password: hashedPassword,
//             email: userInput.email,
//             role: 'user', // make sure the role is correctly set
//         });
//         expect(generateJwtTokenMock).toHaveBeenCalledWith({
//             username: mockUsers[0].username,
//             role: mockUsers[0].role,
//         });
//         expect(response).toEqual({
//             token: 'fake-jwt-token',
//             username: 'john_doe',
//             role: 'user',
//         });
//     });

//     test('should throw error if user with same username exists', async () => {
//         // Given
//         const userInput = {
//             username: 'john_doe',
//             password: 'password123',
//             email: 'john.doe@example.com',
//         };
//         userRepository.getUserByUsername.mockResolvedValue(mockUsers[0]);

//         // When
//         const createUserPromise = createUser(userInput);

//         // Then
//         await expect(createUserPromise).rejects.toThrow('User with username john_doe is already registered.');
//     });

//     test('should authenticate user and return a token', async () => {
//         // Given
//         const loginInput = {
//             username: 'john_doe',
//             password: 'password123',
//         };
//         const mockUser = mockUsers[0];
//         userRepository.getUserByUsername.mockResolvedValue(mockUser);
//         compareMock.mockResolvedValue(true); // simulate successful password comparison
//         generateJwtTokenMock.mockReturnValue('fake-jwt-token');

//         // When
//         const response = await authenticate(loginInput);

//         // Then
//         expect(userRepository.getUserByUsername).toHaveBeenCalledWith(loginInput.username);
//         expect(compareMock).toHaveBeenCalledWith(loginInput.password, mockUser.password);
//         expect(generateJwtTokenMock).toHaveBeenCalledWith({
//             username: mockUser.username,
//             role: mockUser.role,
//         });
//         expect(response).toEqual({
//             token: 'fake-jwt-token',
//             username: 'john_doe',
//             role: 'user',
//         });
//     });

//     test('should throw error if password is incorrect during authentication', async () => {
//         // Given
//         const loginInput = {
//             username: 'john_doe',
//             password: 'wrongpassword',
//         };
//         const mockUser = mockUsers[0];
//         userRepository.getUserByUsername.mockResolvedValue(mockUser);
//         compareMock.mockResolvedValue(false); // simulate incorrect password comparison

//         // When
//         const authenticatePromise = authenticate(loginInput);

//         // Then
//         await expect(authenticatePromise).rejects.toThrow('Invalid password');
//     });
// });
