import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/generateAccessToken';

export const loginUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter the email and password",
                error: true,
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: true,
                success: false
            });
        }

        const token = await generateAccessToken(user._id as string);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        return res.status(200).json({
            message: "Login successful",
            error: false,
            success: true,
            data: {
                userId: user._id,
                email: user.email,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false
        });
    }
};