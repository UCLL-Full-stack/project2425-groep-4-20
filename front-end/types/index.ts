export type Playlist = {
    id: number;
    title: string;
    description: string;
    user: User;
};


export type User = {
    id: number;
    username: string;
    email: string;
    playlists: Playlist[];
};

