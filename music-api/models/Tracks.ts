import mongoose from "mongoose";
import Album from "./Albums";

const TrackSchema = new mongoose.Schema({
    title: {
        title: String,
        require: true
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: 'Album',
        require: true,
        validator: async (value: mongoose.Types.ObjectId)=> await Album.findById(value),
        message: "Album does not exist!"
    },
    duration: String
});
const Track = mongoose.model('Track', TrackSchema);
export default Track;