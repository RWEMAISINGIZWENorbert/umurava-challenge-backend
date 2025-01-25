import mongoose from "mongoose";
import challengeModel from "../models/challengeModel.js";
import userModel from "../models/userModel.js";
import { registerUserController } from "./userController.js";



export const viewAllChallengeController = async (req,res) => {
    try{
        const viewChallenges = await challengeModel.find({});
        return res.status(200).json({
            error: false,
            success: true,
            data: viewChallenges
        });
    }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

export const viewChallengeController = async (req,res) => {
     try{
        
         const id = req.params.id;

         if(!mongoose.Types.ObjectId.isValid(id)){
             return res.status(400).json({
                message: `User Id ${id} not found`,
                error: true,
                succes: false
             });
         }
      
         const challenge = await challengeModel.findById({_id: id});
            return res.status(200).json({
                message: `Data ${id}`,
                error: false,
                success: true,
                data: challenge
            });


     }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
     }
}


export const viewLimitedChallenges = async (req,res) => {
    try{
       const id = Number(req.params.id);
       console.log(id);
       const pipeline = [
        {
          '$sort': {
            'createdAt': -1
          }
        }, {
          '$limit': id
        }
      ];

      const challenges = await challengeModel.aggregate(pipeline);
      
      return res.status(200).json({
          message: "Limited data",
          error: true,
          success: false,
          data: challenges
      });

    }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}


export const createNewChallenge = async (req,res) =>{
   try{
    const adminRole = req.userRole;
    if(adminRole != 'admin'){
        return res.status(401).json({
            message: "You are not allowed",
            error: true,
            success: false
        });
    }
    const { title, deadline, duration, moneyPrize, contactEmail, brief, description, requirements, deliverables} = req.body;
     
    const userId = req.userId;
    if(!userId){
        return res.status(401).json({
            message: "Anuthorized access",
            error: true,
            success: false
        });
    }

    if(!title || !deadline || !duration || !moneyPrize || !contactEmail || !brief || !description){
        return res.status(400).json({
            message: "Plesae provide all the required credentials",
            error: true,
            success: false
        })
    }

    const existTitle = await challengeModel.findOne({title});

    if(existTitle){
        return res.status(400).json({
            message: "The challenge already exists",
            error: true,
            succes: false
        })
    }

    const payload = {
        title,
        deadline,
        duration,
        moneyPrize,
        contactEmail,
        brief,
        description,
        requirements,
        deliverables,
        adminId: userId
    }

    const newChallenge = new challengeModel(payload);
    const save  = await newChallenge.save();

    return res.status(201).json({
        message: "The challenge created successfully",
        error: false,
        success: true,
        data: save
    });

   }catch(error){
      return res.status(400).json({
        message: error.message,
        error: true,
        success: false
      });
   }
}

export const editChallenge = async (req,res) => {
     try{
        const adminRole = req.userRole;
        if(!adminRole){
            return res.status(401).json({
                message: "You are not allowed",
                error: true,
                success: false
            });
        }
        
        const userId = req.userId;
        const admin = await userModel.findOne({adminId: userId});
        if(!userId){
            return res.status(400).json({
                message: "Anuthorized access",
                error: true,
                success: false
            });
        }
    
        const { title, deadline,duration, moneyPrize, contactEmail, description, brief, deliverables } = req.body;
     
        const payload = {
            title,
            deadline,
            duration,
            moneyPrize,
            contactEmail,
            description,
            brief,
            deliverables
        }

        const editChallenge = await challengeModel.findOneAndUpdate({adminId:userId}, payload, {new: true});

        if(editChallenge){
            return res.status(200).json({
                message: "The challenge or hackaton updated succesfully",
                error: true,
                success: false,
                data: editChallenge
            });
        }else{
            return res.status(400).json({
                message : "Error occured",
                error: true,
                success: false
            });
        }

     }catch(error){
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        })
     }
}


export const deleteChallengeController = async (req,res) => {
    try {
        const adminRole = req.userRole;
        if(!adminRole){
            return res.status(401).json({
                message: "You are not allowed",
                error: true,
                success: false
            });
        }

        const userId = req.userId;

        const admin = await userModel.findOne({adminId: userId});
        if(!userId){
            return res.status(400).json({
                message: "Anuthorized access",
                error: true,
                success: false
            });
        }
         
        const updatedDelete = await challengeModel.findOneAndUpdate({adminId:userId}, {delete: true});
        if(updatedDelete){
            return res.status(200).json({
                message: "Data deleted",
                error: false,
                succes: true
            })
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}