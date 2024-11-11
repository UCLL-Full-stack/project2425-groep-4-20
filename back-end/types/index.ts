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
    songs: SongInput[];
};

type ArtistInput = {
    id?: number;
    name: string;
    birthdate: Date;
    albums?: AlbumInput[];
};

type AlbumInput = {
    id?: number;
    title: string;
    releaseDate: Date;
    artist: ArtistInput;
    songs?: SongInput[];
};

type SongInput = {
    id?: number;
    title: string;
    genre: string;
    releaseDate: Date;
    length: number;
    album: AlbumInput;
};

export {
    UserInput,
    PlaylistInput,
    ArtistInput,
    AlbumInput,
    SongInput,
};
