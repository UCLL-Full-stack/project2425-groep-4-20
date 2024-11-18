import songRepository from '../repository/song.db';

const getAllSongs = async () => {
    try {
        const songs = await songRepository.getAllSongs();
        return songs;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching songs');
    }
};

const getSongById = async (id: number) => {
    try {
        const song = await songRepository.getSongById(id);
        return song;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the song by ID');
    }
};

export default { getAllSongs, getSongById };
