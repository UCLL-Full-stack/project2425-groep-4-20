// import React, { useState } from "react";
// import PlaylistService from "@services/PlaylistService";

// interface AddPlaylistFormProps {
//   onPlaylistAdded: (newPlaylist: any) => void; // Callback to update the playlist list
// }

// const AddPlaylistForm: React.FC<AddPlaylistFormProps> = ({ onPlaylistAdded }) => {
//   const [newPlaylistTitle, setNewPlaylistTitle] = useState<string>("");
//   const [newPlaylistDescription, setNewPlaylistDescription] = useState<string>("");
//   const [newPlaylistUsername, setNewPlaylistUsername] = useState<string>("");
//   const [newPlaylistEmail, setNewPlaylistEmail] = useState<string>("");

//   const handleAddPlaylist = async (event: React.FormEvent) => {
//     event.preventDefault();
    
//     if (!newPlaylistTitle || !newPlaylistDescription || !newPlaylistUsername || !newPlaylistEmail) {
//       alert("Please fill in all fields to create a playlist.");
//       return;
//     }

//     const newPlaylist = {
//       title: newPlaylistTitle,
//       description: newPlaylistDescription,
//       user: {
//         username: newPlaylistUsername,
//         email: newPlaylistEmail,
//         password: "defaultPassword", // Assuming this is required, or can be omitted based on backend logic
//       },
//     };

//     try {
//       const response = await PlaylistService.createPlaylist(newPlaylist.title, newPlaylist.description, 1); // Assuming 1 is the correct number to pass

//       if (!response) {
//         throw new Error("Failed to add playlist");
//       }

//       onPlaylistAdded(response);  // Pass the new playlist to the parent component
//       setNewPlaylistTitle("");
//       setNewPlaylistDescription("");
//       setNewPlaylistUsername("");
//       setNewPlaylistEmail("");

//       alert("Playlist added successfully!");
//     } catch (error) {
//       console.error("Failed to add playlist", error);
//       alert("Failed to add playlist.");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6">Create a New Playlist</h2>
//       <form onSubmit={handleAddPlaylist}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Playlist Title</label>
//           <input
//             type="text"
//             id="title"
//             value={newPlaylistTitle}
//             onChange={(e) => setNewPlaylistTitle(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Playlist Description</label>
//           <textarea
//             id="description"
//             value={newPlaylistDescription}
//             onChange={(e) => setNewPlaylistDescription(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={newPlaylistUsername}
//             onChange={(e) => setNewPlaylistUsername(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={newPlaylistEmail}
//             onChange={(e) => setNewPlaylistEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
//         >
//           Add Playlist
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPlaylistForm;
