import { Strategy } from 'passport-local';
import userModel from "../models/users.model.js";

const passportInitialization = (passport) => {
    passport.use(new Strategy(authUser));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });
}

const authUser = async (username, password, done) => {
    try {
        const user = await userModel.findOne({ username });

        if (!user) return done(null, false);

        if (user.password !== password) return done(null, false);

        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}

export const isAuthenticated = (req, res, next) => {
    if(req.user) return next();

    res.redirect('/login');
}

export default passportInitialization;