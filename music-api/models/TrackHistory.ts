import mongoose, {model, Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";


const TrackHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        validate:{
            validator: async (value: Types.ObjectId) => await User.findById(value),
            message: "User does not exist!"
        }
    },
    track: {
        type: mongoose.Schema.ObjectId,
        ref: "Track",
        required: true,
        validate:{
            validator: async (value: Types.ObjectId) => await Track.findById(value),
            message: "Track does not exist!"
        }
    },
    datetime: {
        type: Date,
        default: Date.now,
        require: true
    }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
 export default TrackHistory;