import userModel from "../models/user.model.js";

export const insertUserController = async (req, res) => {
    const userInfos = req.body;
    const newUser = new userModel(userInfos);

    try {
        await newUser.save();
        res.status(201).json({ message: 'User inserted successfuly' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}