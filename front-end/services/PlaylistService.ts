import { Playlist } from "@types";

const token = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token : null;

const getAllPlaylists = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });
};

const getPlaylistsByUserId = async (userId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/playlists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlists by user ID');
  }

  return response.json();
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

const updatePlaylistTitle = async (playlistId: number, newTitle: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!response.ok) {
    throw new Error('Failed to update playlist title');
  }

  return response.json();
};

const removeSongFromPlaylist = async (playlistId: number, songId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists/${playlistId}/songs/${songId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove song from playlist');
  }

  return response.json();
};

const PlaylistService = {
  getAllPlaylists,
  getPlaylistsByUserId,
  addPlaylist,
  addSongToPlaylist,
  updatePlaylistTitle,
  removeSongFromPlaylist,
};

export default PlaylistService;
