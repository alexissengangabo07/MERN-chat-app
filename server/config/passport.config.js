import { Strategy } from 'passport-local';
import userModel from "../models/users.model.js";
import bcrypt from 'bcrypt';

const passportInitialization = (passport) => {
    passport.use(
        new Strategy((username, password, done) => {
            userModel.findOne({ username: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );

    passport.serializeUser((user, callBack) => {
        callBack(null, user.id);
    });
    passport.deserializeUser((id, callBack) => {
        userModel.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                email: user.email,
                username: user.username,
                profilePicture: user.profile_picture,
                createdAt: user.createdAt
            };
            callBack(err, userInformation);
        });
    });
}

export default passportInitialization;