import bcryptjs from 'bcryptjs';
import userModel from "../models/userModel.js";
import { generateAccessToken } from '../utils/generateAccessToken.js';

export const registerUserController = async (req,res) => {
    try{
        const { name, email,password } = req.body;
    
        if(!name || !email || !password){
         return res.status(400).json({
             message: "Please inter the name , email or password",
             error: true,
             success: false
         });
        }

        const user = await userModel.findOne({email});
        if(user){
            if(user) {
                return res.json({
                    message: "The email alredy exists",
                    error: true,
                    success: false
                });
            }
        }
         let role;
        if(email == "admin@hotmail.com" && password == 'admin123'){
            role = 'admin';
        }else{
            role = 'talent';
        }
        const hashedPassword = await bcryptjs.hash(password, 10);

        const payload = {
            name,
            email,
            password: hashedPassword,
            role,
        }

        const newUser = new userModel(payload);
        const save = await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            data: save
        });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export const loginUserController = async (req,res) => {
    try{
     const {email, password } =  req.body;
     if(!email && !password){
        return res.status(400).json({
            message: "Please inter the name , email or password",
            error: true,
            success: false
        });
     }
      
     const user = await userModel.findOne({email});
     if(!user){
          return res.status(404).json({
            message: `User Email ${email} not found`,
             error: true,
             success: false
          });
     }

     const comparePassword = await bcryptjs.compare(password, user.password);
     if(!comparePassword){
        return res.status(400).json({
            message: "The password provided doesn't match",
            error: true,
            success: false
        });
     }

     const accessToken  = await generateAccessToken(user._id);
     
     const corsOption = {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    res.cookie('accessToken', accessToken, corsOption);

    return res.json({
        message:'Login successfully',
        error: false,
        success: true,
        data: {
            accessToken,
        }
    });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

export const logoutController = async (req,res) => {
    const userId = req.userId;
     console.log(userId);

    const corsOption= {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }

    res.clearCookie('accessToken', corsOption);

    return res.status(200).json({
        message: "Logged out successfully",
        error: true,
        succes: false
    });

}