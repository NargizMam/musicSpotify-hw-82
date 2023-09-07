import mongoose from "mongoose";
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Schema.ObjectId,
        ref: 'Album',
        require: true,
        validate:{
            validator: async (value: mongoose.Types.ObjectId)=> await Album.findById(value),
            message: "Album does not exist!"
        }
    },
    duration: String
});
const Track = mongoose.model('Track', TrackSchema);
export default Track;