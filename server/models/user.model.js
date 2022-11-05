import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    profile_picture: {
        type: String,
        default: 'default_avatar.png',
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);

export default userModel;