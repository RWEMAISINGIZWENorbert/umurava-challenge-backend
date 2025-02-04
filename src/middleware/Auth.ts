import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';
import IUser from '../models/userModel'; // Ensure this is exported from userModel.ts

interface AuthRequest extends Request {
    userId?: string;
    userRole?: string;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(400).json({
                message: "You have to login first",
                error: true,
                success: false
            });
        }

        const secretKey = process.env.SECRET_KEY_ACCESS_TOKEN;
        
        if (!secretKey) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: true,
                success: false
            });
        }

        const decode = jwt.verify(token, secretKey) as unknown as { id: string };
        if (!decode) {
            return res.status(401).json({
                message: 'Unauthorized access',
                error: true,
                success: false
            });
        }

        const user = await userModel.findById(decode.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        req.userId = decode.id;
        req.userRole = user.role; 

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: true,
            success: false
        });
        next(error);
    }
};