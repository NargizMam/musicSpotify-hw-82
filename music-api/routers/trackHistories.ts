import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import Track from "../models/Track";
import {ITrackHistory} from "../types";
import TrackHistory from "../models/TrackHistory";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if(!token) {
        return res.status(401).send({error: 'No token present'});
    }
    const user = await User.findOne({token});
    if(!user){
        return res.status(401).send({error: 'Wrong token!'});
    }
    const track = await Track.findById(req.body.track);
    if(!track){
        return res.send('This track not found')
    }
    const historyData: ITrackHistory = {
        user: user._id.toString(),
        track: track.id,
    }
    console.log(req.body.track, historyData);
    const trackHistory = new TrackHistory(historyData);
    try{
        await trackHistory.save();
        return res.send(historyData);
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }});

export default trackHistoriesRouter;