import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    profile_picture: String,
    password: {
        type: String,
        default: 'default_avatar.png',
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const user = mongoose.model('user', userSchema);

export default user;