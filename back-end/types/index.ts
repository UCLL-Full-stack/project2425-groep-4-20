type Role = 'admin' | 'user' | 'artist';

type UserInput = {
    id?: number;
    username: string;
    email: string;
    playlists?: PlaylistInput[];
    password: string;
    role: Role;
};
type UserLogin = {
    username: string;
    password: string;
    
}

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

type AuthenticationResponse = {
    token: string;
    username: string;
    role: Role;
};

export {
    UserInput,
    PlaylistInput,
    ArtistInput,
    AlbumInput,
    SongInput,
    Role,
    AuthenticationResponse,
    UserLogin
};
