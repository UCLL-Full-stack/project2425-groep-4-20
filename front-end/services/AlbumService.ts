import { Album } from "@types";
const token = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token : null;

const getAllAlbums = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    });
};

const getAlbumById = async (id: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    });
};

const AlbumService = {
    getAllAlbums,
    getAlbumById
};

export default AlbumService;
