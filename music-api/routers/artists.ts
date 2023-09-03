import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artists";
import {ArtistMutation} from "../types";
import {imagesUpload} from "../multer";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try{
        const artists = await  Artist.find();
        res.send(artists);
    }catch (e) {
        return res.sendStatus(500);
    }
});
artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try{
        if(!req.body.name){
            res.status(400).send({"error": "Field name is required!"})
        }
    const artistsData: ArtistMutation = {
        name: req.body.name,
        info: req.body.info,
        image: req.file ? req.file.filename : null,
    };
    const artist = new Artist(artistsData);
        await artist.save();
        res.send(artist);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            res.sendStatus(400).send(e)
        }
        next(e);
    }
});
export default artistsRouter;