import express from "express";
import Track from "../models/Tracks";
import mongoose from "mongoose";
import {TrackMutation} from "../types";
import Album from "../models/Albums";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    let track;
    try{
        if(req.query.album){
            track = await Track.find({'album': req.query.album});
        }
        track = await Track.find();
        res.send(track);
    }catch (e) {
        res.sendStatus(500);
    }
});
tracksRouter.post('/', async (req, res, next) => {
    try {
        const trackData: TrackMutation = {
            album: req.body.album,
            title: req.body.title,
            duration: req.body.duration
        }
        const track = new Track(trackData);


        await track.save();
        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default tracksRouter;