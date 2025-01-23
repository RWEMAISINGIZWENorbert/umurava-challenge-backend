import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Provide Name']
    },
    email:{
        type: String,
        required: [true, 'Provide the Email Adress']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profile_image:{ 
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['talent', 'admin'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

const userModel = new mongoose.model('user', userSchema);
export default userModel;
