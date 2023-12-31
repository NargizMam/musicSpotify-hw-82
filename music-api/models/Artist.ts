import * as mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: String,
    info: String
});
const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;