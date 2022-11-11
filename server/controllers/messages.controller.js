import messagesModel from "../models/messages.model.js";

export const addMessageController = async (req, res) => {
    const newMessage = new messagesModel(req.body);

    try {
        const insertedMessage = await newMessage.save();
        res.status(201).json(insertedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessagesController = async (req, res) => {
    try {
        const { user } = req.params;
        let messages = await messagesModel.find({ $or: [{ destinateur: user }, { expediteur: user }] })
            .populate('expediteur')
            .populate('destinateur');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const updateMessageController = async (req, res) => {

};

export const deleteMessageController = async (req, res) => {

};
