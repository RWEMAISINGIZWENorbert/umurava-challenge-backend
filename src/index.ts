// import express from 'express';
// import dotenv from 'dotenv';
// // import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import cron from 'node-cron';
// import dbConnect from './config/dbConnect.js';
// import userRouter from './routes/userRoute.js';
// import challengeRouter from './routes/challengeRoute.js';
// import cors from "cors";
// // import userModel from './models/userModel.js';
// // import challengeModel from './models/challengeModel.js';
// import { updateChallengeStatus } from './controllers/challengeController.js';
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// const PORT = process.env.PORT || 8000;

// cron.schedule('* * * * * *', () => {
//     // console.log('Running scheduled job to update challenge status');
//     updateChallengeStatus();
// })

// const whiteList = ['http://example1.com', 'http://example2.com',];
// const corsOption = {
//     origin: function (origin, callback){
//         if(whiteList.indexOf(origin) != -1 || !origin){
//             callback(null, true)
//         }else{
//             callback(new Error("Not allowed by cors"))
//         }
//     }
// }

// app.use(cors(corsOption));

// app.use('/user', userRouter);
// app.use('/challenge', challengeRouter);
// // Update the status of the challenge

// dbConnect().then(() => {
//     app.listen(PORT,() =>{
//         console.log(`server is carried out on http://localhost:${PORT}`)
//     })
// })

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import dbConnect from './config/dbConnect';
import userRouter from './routes/userRoute';
import challengeRouter from './routes/challengeRoute';
import cors from 'cors';
import { updateChallengeStatus } from './controllers/challengeController';
import { setupSwaggerDocs } from './swagger';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

cron.schedule('* * * * *', () => {
    updateChallengeStatus();
});

const whiteList = ['http://example1.com', 'http://example2.com'];
const corsOption = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (whiteList.indexOf(origin || '') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOption));

app.use('/user', userRouter);
app.use('/challenge', challengeRouter);

app.get('/', (req,res) => {
   res.send('Hello from umurava backend');
})

dbConnect().then(() => {
    app.listen(PORT, () => {
        setupSwaggerDocs(app);
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});