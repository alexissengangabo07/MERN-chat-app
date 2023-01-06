import bcrypt from 'bcrypt';
import { json } from 'express';
import jwt from 'jsonwebtoken';
import userModel from "../models/users.model.js";

/*
    @desc Create a new user
    @route POST /users/register
    @access public
*/
export const insertUserController = async (req, res) => {
    userModel.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.status(403).json({ message: "User Already Exists" });
        if (!doc) {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await userModel.create({
                username,
                email,
                password: hashedPassword
            });

            if (user) {
                res.status(201).json({
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    profilePicture: user.profile_picture,
                    token: generateToken(user._id)
                });
            }
            else {
                res.status(400).json({ message: 'Invalid user data' });
            }
        }
    });
}

/*
    @desc Create a new user
    @route POST /users/login
    @access public
*/
export const userLoginController = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });


    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            profilePicture: user.profile_picture,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400).json({ message: 'Invalid username or password !' });
    }
}

/*
    @desc Generate a Json Web Token
*/
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

/*
    @desc Create a new user
    @route POST /users/register
    @access Private
*/
export const logOutController = (req, res) => {
    if (req.user) {
        req.logout()
        res.status(200).json({ msg: 'logging out' })
    } else {
        res.status(400).json({ msg: 'no user to log out' })
    }
    // res.redirect('/login');
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

        let updatedUser = await userModel.findOneAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const connectedUser = async (req, res) => {
    const { _id, username, email } = await userModel.findById(req.user.id);
    res.status(200).json({
        id: _id,
        email: email,
        username: username
    });
}