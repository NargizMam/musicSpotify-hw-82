export interface ArtistMutation {
    name: string,
    photo: string | null,
    info: string |null
}
export interface AlbumMutation {
    artist: string;
    title: string;
    publishedAt: number;
    image: string | null;
}
export interface TrackMutation {
    title: string;
    album: string;
    duration: string;
}