import { Artist } from "@types";

const getAllArtists = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getArtistById = async (id: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const ArtistService = {
    getAllArtists,
    getArtistById,
};

export default ArtistService;
