import { Strategy } from 'passport-local';
import userModel from "../models/users.model.js";

const passportInitialization = (passport) => {
    passport.use(new Strategy(authUser));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        // try {
        //     userModel.findOne({ _id: id }, (error, user) => {
                done(null, user);
        //     });
        // } catch (error) {
        //     done(error, false);
        // }
    });
}

const authUser = (username, password, done) => {
    let authenticated_user = { id: 123, username: "Kyle", password: '12345'};
    return done (null, authenticated_user )
    
    // try {
    //     userModel.findOne({ username: username }, (error, user) => {
    //         if (error) throw error;
    //         if (!user) return done(null, false);
    //         // if (user.password !== password) return done(null, false);
    //         console.log(user);
    //         return done(null, user);
    //     });
    // } catch (error) {
    //     done(error, false);
    // }

}

// export const isAuthenticated = (req, res, next) => {
//     if(req.user) return next();

//     res.redirect('/login');
// }

export default passportInitialization;