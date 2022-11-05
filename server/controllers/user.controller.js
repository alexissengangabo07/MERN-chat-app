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

export const getUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSingleUserController = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        
        let updatedUser = await userModel.findOneAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err })
    }
}