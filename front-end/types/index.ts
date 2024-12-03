export type Playlist = {
    id: number;
    title: string;
    description: string;
    user: User;
};


export type User = {
    id?: number;
    username: string;
    password : string;
    role?: "admin" | "user";
    email?: string;
    playlists?: Playlist[];
};

export type Song = {
    id: number;
    title: string;
    genre: string;
    releaseDate: Date;
    length: number;
}

export type Artist = {
    id: number;
    name: string;
    birthDate: Date;
    albums: Album[];
};

export type Album = {
    id: number;
    title: string;
    releaseDate: Date;
    songs: Song[];
};

export type StatusMessage = {
    message:string;
    type : "error" | "success";
  }

export type SongWithRelations = Song & {
    album: {
        id: number;
        title: string;
        releaseDate: Date;
        artist: {
            id: number;
            name: string;
            birthdate: Date;
        };
    };
};

export type SongResponse = {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    length: number;
    album: {
        id: number;
        title: string;
        releaseDate: string;
        artist: {
            id: number;
            name: string;
            birthdate: string;
        };
    };
};
