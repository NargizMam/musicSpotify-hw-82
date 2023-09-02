import mongoose from "mongoose";
import Artist from "./Artists";

const AlbumsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        require: true,
        validator: async (value: mongoose.Types.ObjectId)=> await Artist.findById(value),
        message: "Artist does not exist!"
    },
    publishedAt: {
        type: String,
         require: true
    },
    image: String
});
const Album = mongoose.model('Album',AlbumsSchema);
export default Album;