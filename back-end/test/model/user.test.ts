
// import { Playlist } from '../../model/playlist';
// import { User } from '../../model/user';
// import { Role } from '../../types'; // Assuming you have the Role type defined

// // Mocked data for Playlist
// const mockPlaylist = new Playlist({
//     id: 1,
//     title: 'My Playlist',
//     description: new Date(),
//     : new Date(),
// });

// // Helper function to create a valid user
// const createUser = (overrides = {}) => {
//     return new User({
//         username: 'johndoe',
//         email: 'john.doe@example.com',
//         password: 'password123',
//         role: 'user' as Role,
//         playlists: [mockPlaylist], // Optionally add playlists
//         ...overrides,
//     });
// };

// describe('User Model Tests', () => {
//     test('should create a user with valid values', () => {
//         // given
//         const user = createUser();

//         // then
//         expect(user.getUsername()).toEqual('johndoe');
//         expect(user.getEmail()).toEqual('john.doe@example.com');
//         expect(user.getPassword()).toEqual('password123');
//         expect(user.getRole()).toEqual('user');
//         expect(user.getPlaylists()).toHaveLength(1); // Playlist is passed
//     });

//     test('should throw an error when username is missing', () => {
//         // when
//         const createUserWithoutUsername = () => createUser({ username: '' });

//         // then
//         expect(createUserWithoutUsername).toThrow('Username is required');
//     });

//     test('should throw an error when email is missing', () => {
//         // when
//         const createUserWithoutEmail = () => createUser({ email: '' });

//         // then
//         expect(createUserWithoutEmail).toThrow('Email is required');
//     });

//     test('should throw an error when password is missing', () => {
//         // when
//         const createUserWithoutPassword = () => createUser({ password: '' });

//         // then
//         expect(createUserWithoutPassword).toThrow('Password is required');
//     });

//     test('should throw an error when role is missing', () => {
//         // when
//         const createUserWithoutRole = () => createUser({ role: undefined });

//         // then
//         expect(createUserWithoutRole).toThrow('Role is required');
//     });

//     test('should check equality between two users with same attributes', () => {
//         // given
//         const user1 = createUser();
//         const user2 = createUser();

//         // then
//         expect(user1.equals(user2)).toBe(true);
//     });

//     test('should return false when comparing users with different attributes', () => {
//         // given
//         const user1 = createUser();
//         const user2 = createUser({ username: 'janedoe' });

//         // then
//         expect(user1.equals(user2)).toBe(false);
//     });

//     test('should map from Prisma user data correctly', () => {
//         // given
//         const prismaUser = {
//             id: 1,
//             username: 'johndoe',
//             email: 'john.doe@example.com',
//             password: 'password123',
//             role: 'user',
//             playlists: [], // No playlists in this case
//         };

//         // when
//         const user = User.from(prismaUser);

//         // then
//         expect(user.getId()).toEqual(1);
//         expect(user.getUsername()).toEqual('johndoe');
//         expect(user.getEmail()).toEqual('john.doe@example.com');
//         expect(user.getPassword()).toEqual('password123');
//         expect(user.getRole()).toEqual('user');
//         expect(user.getPlaylists()).toHaveLength(0); // No playlists in Prisma data
//     });

//     test('should return playlists correctly', () => {
//         // given
//         const userWithPlaylists = createUser();

//         // then
//         expect(userWithPlaylists.getPlaylists()).toHaveLength(1); // Playlist is passed
//         expect(userWithPlaylists.getPlaylists()[0]).toBe(mockPlaylist);
//     });

//     test('should add a playlist to the user\'s playlists', () => {
//         // given
//         const user = createUser();
//         const newPlaylist = new Playlist({
//             id: 2,
//             name: 'New Playlist',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         });

//         // when
//         user.getPlaylists().push(newPlaylist);

//         // then
//         expect(user.getPlaylists()).toHaveLength(2); // Now 2 playlists
//         expect(user.getPlaylists()).toContain(newPlaylist);
//     });
// });
