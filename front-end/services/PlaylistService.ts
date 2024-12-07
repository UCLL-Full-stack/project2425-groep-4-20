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
  

  const addSongToPlaylist = async (playlistId: number, songId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ songId }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add song to playlist');
    }
  
    return response.json();
  };


  
  const PlaylistService = {
    getAllPlaylists,
    addPlaylist,
    addSongToPlaylist,
  };
  
  export default PlaylistService;
  