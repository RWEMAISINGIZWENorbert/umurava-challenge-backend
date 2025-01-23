import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnect from './config/dbConnect.js';
import userRouter from './routes/userRoute.js';
import challengeRouter from './routes/challengeRoute.js';
import userModel from './models/userModel.js';
import challengeModel from './models/challengeModel.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;


app.use('/user', userRouter);
app.use('/challenge', challengeRouter);
// Update the status of the challenge
const challengeUpdate = challengeModel.findOneAndUpdate({deadline: {$gte: new Date()}}, {status: 'closed'});
if(challengeUpdate){
    console.log("The  Challenge status updated sucessfully");
}

dbConnect().then(() => {
    app.listen(PORT,() =>{
        console.log(`server is carried out on http://localhost:${PORT}`)
    })
})

