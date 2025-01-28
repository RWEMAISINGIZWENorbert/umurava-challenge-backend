import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Please provide the The title of the challenge or the hackaton']
    },
    deadline: {
        type: Date,
        required: [true, 'Please provide the deadline of the hackaton']
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
        required: [true, "Please provide the the contact email"]
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

    deliverables:{
        type: String,
        default: ''
    },

    adminId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },

    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },

    delete: {
        type: Boolean,
        default: false,
    }
    
},{timestamps: true});

const challengeModel = new mongoose.model('challenge', challengeSchema);
export default challengeModel;