// import { User } from "../../model/user";
// import { Playlist } from "../../model/playlist";

// describe("User", () => {
//     it("should create a valid User instance", () => {
//         // Given
//         const playlists = [
//             new Playlist({ title: "Playlist 1", description: "Description 1", songs: [] }),
//         ];

//         const validUserData = {
//             id: 1,
//             username: "test_user",
//             email: "test@example.com",
//             playlists: playlists,
//             password: "securepassword123",
//             role: "user",
//         };

//         // When
//         const user = new User(validUserData);

//         // Then
//         expect(user.getId()).toBe(1);
//         expect(user.getUsername()).toBe("test_user");
//         expect(user.getEmail()).toBe("test@example.com");
//         expect(user.getPlaylists().length).toBe(1);
//         expect(user.getPassword()).toBe("securepassword123");
//         expect(user.getRole()).toBe("USER");
//     });

//     it("should return an empty playlist array if none provided", () => {
//         // Given
//         const validUserData = {
//             username: "test_user",
//             email: "test@example.com",
//             password: "securepassword123",
//             role: "user",
//         };

//         // When
//         const user = new User(validUserData as any);

//         // Then
//         expect(user.getPlaylists().length).toBe(0);
//     });
// });
