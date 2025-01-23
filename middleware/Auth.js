import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const auth = async (req,res,next) => {
     try{
        
        const token = req.cookies.accessToken;
        if(!token){
            return res.status(400).json({
                message : "You have to login first",
                error: true,
                success: false
            });
        }
 
        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if(!decode){
            return res.status(401).json({
                message: 'Anauthorized access',
                error: true,
                success: false
            });
        }

        const user = await userModel.findById(decode.id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        req.userId = decode.id;
        req.userRole = user.role

     }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
     }
     next();
}