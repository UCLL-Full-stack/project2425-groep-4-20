import { Song, SongResponse, SongWithRelations } from '@types';

const token = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token : null;


const getAllSongs = async (): Promise<SongWithRelations[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error('Failed to fetch songs');
  }

  const data: SongResponse[] = await response.json();
  return data.map((song): SongWithRelations => ({
      id: song.id,
      title: song.title,
      genre: song.genre,
      releaseDate: new Date(song.releaseDate),
      length: song.length,
      album: {
          id: song.album.id,
          title: song.album.title,
          releaseDate: new Date(song.album.releaseDate),
          artist: {
              id: song.album.artist.id,
              name: song.album.artist.name,
              birthdate: new Date(song.album.artist.birthdate),
          },
      },
  }));
};



const addSong = async (song: Omit<Song, 'id'>) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(song),
  });
};

const SongService = {
  getAllSongs,
  addSong,
};

export default SongService;
