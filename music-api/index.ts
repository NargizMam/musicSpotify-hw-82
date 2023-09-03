import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";


const app = express();
const port = 8000;

app.use('/artists', artistsRouter)
app.use(express.json());
app.use(cors());
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