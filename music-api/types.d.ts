export interface ArtistMutation {
    name: string,
    image: string | null,
    info: string |null
}
export interface AlbumMutation {
    title: string;
    artist: string;
    createdAt: number;
    image: string | null;
}
export interface TrackMutation {
    title: string;
    album: string;
    duration: string;
}
export interface IUser {
    username: string;
    password: string;
    token: string;
}
export interface ITrackHistory {
    user: string;
    track: string;
    datetime: string;
}