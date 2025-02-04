 import { Request, Response, NextFunction } from 'express';
 import mongoose from 'mongoose';
 import challengeModel from '../models/challengeModel';

// Create a new challenge
export const createNewChallenge = async (req: Request, res: Response, next: NextFunction): Promise<any>  => {
    try {
        const { title, deadline, duration, moneyPrize, contactEmail, description, brief, deliverables } = req.body;

        if (!title || !deadline || !duration || !moneyPrize || !contactEmail || !brief || !description) {
            return res.status(400).json({
                message: "Please provide all the required credentials",
                error: true,
                success: false
            });
        }

        const existTitle = await challengeModel.findOne({ title });

        if (existTitle) {
            return res.status(400).json({
                message: "The challenge already exists",
                error: true,
                success: false
            });
        }

        const newChallenge = new challengeModel({
            title,
            deadline,
            duration,
            moneyPrize,
            contactEmail,
            description,
            brief,
            deliverables
        });

        await newChallenge.save();

        return res.status(201).json({
            message: "Challenge created successfully",
            error: false,
            success: true,
            data: newChallenge
        });
        next();
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
        next(error);
    }
};

// View all challenges
export const viewAllChallengeController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const viewChallenges = await challengeModel.find({ delete: false }, { delete: 0 });
        return res.status(200).json({
            error: false,
            success: true,
            data: viewChallenges
        });
    } catch (error) {
        return res.status(400).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
        next(error)
    }
};

// View a single challenge by ID
export const viewChallengeController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format",
                error: true,
                success: false
            });
        }

        const challenge = await challengeModel.findById(id);
        if (challenge) {
            return res.status(200).json({
                message: `Data ${id}`,
                error: false,
                success: true,
                data: challenge
            });
        } else {
            return res.status(404).json({
                message: "Data not found",
                error: true,
                success: false
            });
            next();
        }
    } catch (error) {
        return res.status(400).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
        next(error)
    }
};

// Get the limited number of challenges, sorted by date
export const viewLimitedChallenges = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const limit = Number(req.params.id);

        if (isNaN(limit) || limit < 0) {
            return res.status(400).json({
                message: "Invalid limit parameter",
                error: true,
                success: false
            });
        }

        const pipeline = [
            {
                '$sort': {
                    'createdAt': -1 as const
                }
            },
            {
                '$limit': limit
            }
        ];

        const challenges = await challengeModel.aggregate(pipeline);

        return res.status(200).json({
            message: "Limited data",
            error: false,
            success: true,
            data: challenges
        });
    } catch (error) {
        return res.status(400).json({
            message: (error as Error).message || error,
            error: true,
            success: false
        });
    }
};

// Update a challenge
export const updateChallengeController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, deadline, duration, moneyPrize, contactEmail, description, brief, deliverables } = req.body;
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format",
                error: true,
                success: false
            });
        }

        const payload = {
            title,
            deadline,
            duration,
            moneyPrize,
            contactEmail,
            description,
            brief,
            deliverables
        };

        const editChallenge = await challengeModel.findByIdAndUpdate(id, payload, { new: true });

        if (editChallenge) {
            return res.status(200).json({
                message: "The challenge or hackathon updated successfully",
                error: false,
                success: true,
                data: editChallenge
            });
        } else {
            return res.status(400).json({
                message: "Failed to update the challenge or hackathon",
                error: true,
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Delete a challenge
export const deleteChallengeController = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format",
                error: true,
                success: false
            });
        }

        const deleteChallenge = await challengeModel.findByIdAndUpdate(id, { delete: true }, { new: true });

        if (deleteChallenge) {
            return res.status(200).json({
                message: "The challenge or hackathon deleted successfully",
                error: false,
                success: true,
                data: deleteChallenge
            });
        } else {
            return res.status(400).json({
                message: "Failed to delete the challenge or hackathon",
                error: true,
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Search for challenges
export const searchChallenge = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = await challengeModel.find(
            {
                "$or": [
                    { title: { $regex: req.params.key, $options: 'i' } },
                ]
            },
            { "title": 1, "_id": 0 }
        );
        return res.status(200).json({
            message: "Search results",
            error: false,
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(400).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Update challenge status based on deadline
export const updateChallengeStatus = async (): Promise<void> => {
    try {
        const now = new Date();

        // Close challenges where the deadline has passed
        const closeResult = await challengeModel.updateMany(
            { deadline: { $lte: now }, status: 'open' },
            { $set: { status: 'closed' } }
        );

        // Open challenges where the deadline is in the future
        const openResult = await challengeModel.updateMany(
            { deadline: { $gt: now }, status: 'closed' },
            { $set: { status: 'open' } }
        );

        console.log(`Closed ${closeResult.modifiedCount} challenges and opened ${openResult.modifiedCount} challenges.`);
    } catch (error) {
        console.error('Error updating challenge status:', (error as Error ).message || error);
    }
};

// Get total number of challenges
export const totalAllChallenges = async (req: Request, res: Response): Promise<any> => {
    try {
        const totalChallenges = await challengeModel.countDocuments({ delete: false });
        return res.status(200).json({
            message: "Total number of challenges retrieved successfully",
            error: false,
            success: true,
            totalChallenges: totalChallenges
        });
        
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Get total number of closed challenges
export const totalClosedChallenges = async (req: Request, res: Response): Promise<any> => {
    try {
        const totalClosed = await challengeModel.countDocuments({ status: 'closed' });
        return res.status(200).json({
            message: "Total number of closed challenges retrieved successfully",
            error: false,
            success: true,
            totalClosed: totalClosed
        });
        
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Get total number of open challenges
export const totalOpenChallenges = async (req: Request, res: Response): Promise<any> => {
    try {
        const totalOpen = await challengeModel.countDocuments({ status: 'open' });
        return res.status(200).json({
            message: "Total number of open challenges retrieved successfully",
            error: false,
            success: true,
            totalOpen: totalOpen
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Get challenges by admin ID
export const getChallengesByAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const adminId = req.params.adminId;

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({
                message: "Invalid admin ID format",
                error: true,
                success: false
            });
        }

        const challenges = await challengeModel.find({ adminId, delete: false });
        return res.status(200).json({
            message: "Challenges retrieved successfully",
            error: false,
            success: true,
            data: challenges
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};

// Get challenges by status
export const getChallengesByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const status = req.params.status;

        const challenges = await challengeModel.find({ status, delete: false });
        return res.status(200).json({
            message: "Challenges retrieved successfully",
            error: false,
            success: true,
            data: challenges
        });
    } catch (error) {
        return res.status(500).json({
            message: (error as Error ).message || error,
            error: true,
            success: false
        });
    }
};


// Delete the challenge permanently
export const deletePChallengeController = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "The id is not valid",
                error: true,
                success: false
            });
        }

        const deletePChallenge = await challengeModel.findByIdAndDelete(id);

        if (deletePChallenge) {
            return res.status(204).json({
                message: `The challenge ${id} deleted successfully`,
                error: false,
                success: true
            });
        } else {
            return res.status(404).json({
                message: "Challenge not found",
                error: true,
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: (error as Error).message || error,
            error: true,
            success: false
        });
    }
};