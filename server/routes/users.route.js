import { Router } from 'express';
import {
    insertUserController,
    loginUserController,
    getUsersController,
    getSingleUserController,
    updateUserController,
    logOutController
} from '../controllers/users.controller.js';
import { isAuthenticated } from '../config/passport.config.js';

const userRouter = Router();

userRouter
    .post('/register', insertUserController)
    .post('/login', loginUserController)
    .get('/', logOutController)
    .get('/all', getUsersController)
    .get('/:id', getSingleUserController)
    .put('/:id', updateUserController);

export default userRouter;