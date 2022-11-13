import passport from 'passport';
import { Router } from 'express';
import {
    insertUserController,
    getUsersController,
    getSingleUserController,
    updateUserController,
    logOutController
} from '../controllers/users.controller.js';

const userRouter = Router();

userRouter
    .post('/register', insertUserController)
    .post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(user);
            if (err) throw err;
            if (!user) res.status(404).json({ message: 'User not found' });
            else {
                req.logIn(user, err => {
                    if (err) throw err;
                    res.status(200).json({ message: 'Success' });
                })
                // res.status(200).json({message: user});
            }
        })(req, res, next);
    })
    .get('/logout', logOutController)
    .get('/all', getUsersController)
    .get('/:id', getSingleUserController)
    .put('/:id', updateUserController);

export default userRouter;