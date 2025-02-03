import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profile_image: string;
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide Name']
    },
    email: {
        type: String,
        required: [true, 'Provide the Email Address'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profile_image: { 
        type: String,
        default: ''
    }
});

const userModel = mongoose.model<IUser>('User', userSchema);
export default userModel;