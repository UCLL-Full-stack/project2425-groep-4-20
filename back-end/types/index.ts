type UserInput = {
    id?: number;
    username: string;
    email: string;
    playlists?: PlaylistInput[];
};

type PlaylistInput = {
    id?: number;
    title: string;
    description: string;
    user: UserInput;
};

export {
    UserInput,
    PlaylistInput,
};
