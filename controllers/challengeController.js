import mongoose from "mongoose";
import challengeModel from "../models/challengeModel.js";

//Get all challenges
export const viewAllChallengeController = async (req,res) => {
    try{
        const viewChallenges = await challengeModel.find({delete: false}, {delete: 0});
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

//get One challenge By id
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
      
         const challenge = await challengeModel.findById({_id: id, delete:false});
            return res.status(200).json({
                message: `Challenge Id ${id}`,
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
 
//get the limited number of challenges e.g If you want only 2 challenges in 100 challenges its sorted by the date
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

// Create the new challenge
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

//Edit the challenge
export const editChallenge = async (req,res) => {
     try{
         
        const id = req.params.id;

        if(!mongoose.isValidObjectId(id)){
            throw new Error("The id is not valid");
        }

        if(!id){
            return res.status(400).json({
                message: "Please provide the challenge id",
                error: true,
                success: false
            })
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

        const editChallenge = await challengeModel.findOneAndUpdate({_id:id}, payload, {new: true});

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

//Delete the challenge
export const deleteChallengeController = async (req,res) => {
    try {                
        const id = req.params.id;

        if(!mongoose.isValidObjectId(id)){
            throw new Error("The id is not valid");
        }

        if(!id){
            return res.status(400).json({
                message: "Please provide the challenge id",
                error: true,
                success: false
            });
        }
         
        const updatedDelete = await challengeModel.findOneAndUpdate({_id:id}, {delete: true});
        if(updatedDelete){
            return res.status(200).json({
                message: "Data deleted",
                error: false,
                succes: true,
                data: updatedDelete
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

//get the total number of Open challenges 
export const totalOpenChallenges = async (req,res) => {
    try{
         const openChallenges = await challengeModel.countDocuments({status: 'open'}, {delete: false});
         return res.status(200).json({
          message: " Total number of Open challenges",
          error: false,
          succes: true,
          data: openChallenges
         })
    }catch(error) {
      return res.status(400).json({
          message: error.message,
          error: true,
          success: false
      });
    }
}


//get the total number of closed challenges
export  const totalClosedChallenges = async (req,res) => {
   try{
          const closedChallenges = await challengeModel.countDocuments({status: 'closed'} ,{delete: false});

          return res.status(200).json({
              message: " Total number of closed challenges",
              error: false,
              succes: true,
              data: closedChallenges
             });

   }catch(error){
      return res.status(400).json({
          message: error.message,
          error: true,
          success: false
      });

   }
}


//get the total number of the closed challenges
export const totalAllChallenges = async (req, res) => {
    try {
        const totalChallenges = await challengeModel.countDocuments({delete: false});
        return res.status(200).json({
            message: "Total number of challenges retrieved successfully",
            error: false,
            success: true,
            totalChallenges: totalChallenges
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
};


//Update the challenges status from open to closed when  the deadline  date meet
export const updateChallengeStatus = async (req,res) => {
  try{
      const now = new Date();
      const closeResult = await challengeModel.updateMany(
          { deadline: { $lte: now }, status: 'open' },
          { $set: { status: 'closed' } }
      );
      const openResult = await challengeModel.updateMany(
        { deadline: { $gt: now }, status: 'closed' },
        { $set: { status: 'open' } }
    );
 
    // console.log(`Closed ${closeResult.nModified} challenges and opened ${openResult.nModified} challenges.`);

    if(closeResult){
        // return res.status(200).json({
        //     message: "Hackaton status updated successfully",
        //     error: false,
        //     success: true,
        //     data: result
        // });
        // console.log(`Hackathon status updated successfully. Updated ${result.nModified} challenges.`);
    }
    if(openResult){ }
  }catch(error){
    // return res.status(400).json({
    //     message: error.message,
    //     error: true,
    //     success: false
    //    });
    console.error('Error updating challenge status:', error.message);
  }
}

//delete the challenge permanently
export const deletePChallengeController = async (req,res) => {
      try {
        const id = req.params.id;

        if(!mongoose.isValidObjectId(id)){
            throw new Error("The id is not valid");
        }
       
        const deletePChallenge = await challengeModel.findByIdAndDelete({_id: id});

        if(deletePChallenge){
            return res.status(204).json({
                message: `The challenge ${id} deleted successfully`,
                error: false,
                success: true
            });
        }

      } catch (error) {
        return res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
      }
}

//Search In the challenge model by the characters
export const searchChallenge =  async (req,res) => {
   try{
    const data =  await challengeModel.find(
        {
            "$or": [
                {title: {$regex: req.params.key} },
            ]
        },
        {"title": 1, "_id": 0}
      )

      res.send(data);

   }catch(error){
       return res.status(400).json({
        message: error.message,
        error: true,
        success: false
       });
   }
}
