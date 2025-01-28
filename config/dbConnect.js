import mongoose from "mongoose";
import  dotenv from 'dotenv';
dotenv.config();
const db_url = process.env.db_remote_url;

if(!db_url){
    throw new Error('Please provide the url');
}

async function dbConnect() {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        }).then(() => console.log('DB connected'));
    } catch (err) {
        throw new Error(err);
    }
}

export default dbConnect;
