import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artists";
import {AlbumMutation, ArtistMutation} from "../types";
import {imagesUpload} from "../multer";
import Album from "../models/Albums";
import Albums from "../models/Albums";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    let album = null
    try {
        if (req.query.artist) {
            album = await Album.find({'artist': req.query.artist});
            return res.send(album);
        }
        album = await Album.find();
        return res.send(album);
    } catch (e) {
        next(e);
    }
});
albumsRouter.get('/:id',async (req, res) => {
    try {

        const result = await Album.find({artist: req.params.id})
            .populate('artist', 'name')
            .sort({"releaseAt": -1});
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});
albumsRouter.post('/', imagesUpload.single('images'), async (req, res, next) => {
    try{
        if(!req.body.title || req.body.artist || req.body.publishedAt){
            res.status(400).send({"error": "Field name is required!"})
        }
        const albumData: AlbumMutation = {
            artist: req.body.artist,
            title: req.body.title,
            publishedAt: req.body.publishedAt,
            image: req.file ? req.file.filename : null,
        };
        const album = new Album(albumData);
        await album.save();
        return res.send(album);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            res.sendStatus(400).send(e)
        }
        next(e);
    }
});
export default albumsRouter;