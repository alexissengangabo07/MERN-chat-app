import passport from 'passport';
import bcrypt from 'bcrypt';
import userModel from "../models/users.model.js";

export const insertUserController = async (req, res) => {
    userModel.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                username,
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.send("User Created");
        }
    });
}

export const userLoginController = (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(200).json({ message: "Successfully Authenticated" });
            });
        }
    })(req, res, next);
}

export const logOutController = (req, res) => {
    if (req.user) {
        req.logout()
        res.status(200).json({ msg: 'logging out' })
    } else {
        res.status(200).json({ msg: 'no user to log out' })
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
    if (req.user) {
        res.status(200).json({ user: req.user });
    }
    else {
        res.status(200).json({ message: 'No user authentified' });
    }
}