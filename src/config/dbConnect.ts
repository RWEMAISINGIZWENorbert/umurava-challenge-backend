import mongoose from "mongoose";
import  dotenv from 'dotenv';
dotenv.config();

const db_url: string | undefined = process.env.DB_URL;

if (!db_url) {
    throw new Error('Please provide the URL');
}

const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(db_url);
        console.log('DB connected');
    } catch (err) {
        throw new Error(`Data base connection error: ${err}`);
    }
};

export default dbConnect;