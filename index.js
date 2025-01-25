import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import dbConnect from './config/dbConnect.js';
import userRouter from './routes/userRoute.js';
import challengeRouter from './routes/challengeRoute.js';
// import userModel from './models/userModel.js';
// import challengeModel from './models/challengeModel.js';
import { updateChallengeStatus } from './controllers/challengeController.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

cron.schedule('* * * * * *', () => {
    // console.log('Running scheduled job to update challenge status');
    updateChallengeStatus();
})

app.use('/user', userRouter);
app.use('/challenge', challengeRouter);
// Update the status of the challenge

dbConnect().then(() => {
    app.listen(PORT,() =>{
        console.log(`server is carried out on http://localhost:${PORT}`)
    })
})

