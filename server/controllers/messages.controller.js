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
        const { expediteur, destinateur } = req.query;
        let messages = await messagesModel.find({
            $or: [
                {
                    $and: [{ expediteur }, { destinateur }]
                },
                {
                    $and: [{ expediteur: destinateur }, { destinateur: expediteur }]
                }
            ]
        })
            .populate('expediteur')
            .populate('destinateur');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateMessageController = async (req, res) => {
    try {
        const { user } = req.params;

        let updatedMessage = await messagesModel.findOneAndUpdate(user, req.body, { new: true });
        res.status(200).json(updatedMessage);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

export const deleteMessageController = async (req, res) => {
    let { id } = req.params;
    try {
        if (id) {
            let deleteMessage = await messagesModel.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) });
            let messages = await deleteMessage.save();
            res.status(200).json(messages);
        } else {
            res.status(404).json({ message: 'Message non trouvee' });
        }
    } catch (err) {
        res.status(500).json({ message: err + 'erreur' });
    }
};