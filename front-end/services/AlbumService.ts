import { Album } from "@types";

const getAllAlbums = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const getAlbumById = async (id: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const AlbumService = {
    getAllAlbums,
    getAlbumById,
};

export default AlbumService;
