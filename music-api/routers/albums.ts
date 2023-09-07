import express from "express";
import mongoose from "mongoose";
import {AlbumMutation} from "../types";
import {imagesUpload} from "../multer";
import Album from "../models/Album";

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
            .sort({"createdAt": -1});
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});
albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try{
        if(!req.body.title || !req.body.artist || !req.body.createdAt){
            res.status(400).send({"error": "Fields title, artist, createdAt is required!"})
        }
        const albumsData: AlbumMutation = {
            title: req.body.title,
            artist: req.body.artist,
            createdAt: req.body.createdAt,
            image: req.file ? req.file.filename : null,
        };
        const album = new Album(albumsData);
        await album.save();
        res.send(album);
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            res.sendStatus(400).send(e)
        }
        next(e);
    }
});
export default albumsRouter;