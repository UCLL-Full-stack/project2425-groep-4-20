// import React from "react";
// import { Playlist } from "@types";

// interface PlaylistTableProps {
//   playlists: Playlist[];
// }

// const PlaylistTable: React.FC<PlaylistTableProps> = ({ playlists }) => {
//   return (
//     <div className="overflow-x-auto mb-8">
//       <table className="min-w-full table-auto">
//         <thead>
//           <tr className="bg-blue-500 text-white">
//             <th className="px-4 py-2 text-left">Playlist Title</th>
//             <th className="px-4 py-2 text-left">Username</th>
//             <th className="px-4 py-2 text-left">Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {playlists.map((playlist) => (
//             <tr key={playlist.id} className="border-b hover:bg-blue-50">
//               <td className="px-4 py-2">{playlist.title}</td>
//               <td className="px-4 py-2">{playlist.user.username}</td>
//               <td className="px-4 py-2">{playlist.description}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PlaylistTable;
