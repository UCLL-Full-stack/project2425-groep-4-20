import { Artist } from "@types";
const token = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token : null;


const getAllArtists = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    });
};

const getArtistById = async (id: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/artists/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    });
};

const ArtistService = {
    getAllArtists,
    getArtistById,
};

export default ArtistService;
