import mongoose from 'mongoose';

const messagesSchema = mongoose.Schema({
    expediteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    destinateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    messageContent: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const messagesModel = mongoose.model('messages', messagesSchema);
export default messagesModel;