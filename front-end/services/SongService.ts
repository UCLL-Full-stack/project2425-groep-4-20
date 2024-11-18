import { Song } from '@types';

const getAllSongs = async (): Promise<Song[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch songs');
  }

  return await response.json();
};

const addSong = async (song: Omit<Song, 'id'>) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(song),
  });
};

const SongService = {
  getAllSongs,
  addSong,
};

export default SongService;
