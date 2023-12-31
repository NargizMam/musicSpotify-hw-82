import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import trackHistoriesRouter from "./routers/trackHistories";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoriesRouter);
const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);