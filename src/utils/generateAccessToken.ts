import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = async (userId: string): Promise<string> => {
    if (!process.env.SECRET_KEY_ACCESS_TOKEN) {
        throw new Error('SECRET_KEY_ACCESS_TOKEN is not defined in environment variables');
    }

    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '2h' }
    );

    return token;
};