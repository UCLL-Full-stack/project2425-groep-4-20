import { Playlist } from "@types";
const token = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token : null;
const getAllPlaylists = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });
  };

const addPlaylist = async (playlist: Omit<Playlist, 'id'>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(playlist),
    });
  };
  
  const PlaylistService = {
    getAllPlaylists,
    addPlaylist,
  };
  
  export default PlaylistService;
  