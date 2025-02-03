import mongoose, { Document, Schema } from "mongoose";

interface IChallenge extends Document {
    title: string;
    deadline: Date;
    duration: string;
    moneyPrize: string;
    contactEmail: string;
    description: string;
    brief: string;
    deliverables: string;
    adminId: mongoose.Schema.Types.ObjectId;
    status: string;
}

const challengeSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide the title of the challenge or the hackathon']
    },
    deadline: {
        type: Date,
        required: [true, 'Please provide the deadline of the hackathon']
    },
    duration: {
        type: String,
        required: [true, "Please provide the duration the challenge will take"]
    },
    moneyPrize: {
        type: String,
        default: '0 rwf',
    },
    contactEmail: {
        type: String,
        required: [true, "Please provide the contact email"]
    },
    description: {
        type: String,
        required: [true, "Please provide the project description"],
        default: '',
    },
    brief: {
        type: String,
        default: ''
    },
    deliverables: {
        type: String,
        default: ''
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'open'
    }
});

const challengeModel = mongoose.model<IChallenge>('Challenge', challengeSchema);
export default challengeModel;