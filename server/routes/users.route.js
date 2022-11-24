import { Router } from 'express';
import {
    insertUserController,
    getUsersController,
    getSingleUserController,
    updateUserController,
    logOutController,
    connectedUser,
    userLoginController
} from '../controllers/users.controller.js';
import protect from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter
    .post('/register', insertUserController)
    .post('/login', userLoginController)
    .get('/connected', protect, connectedUser)
    .get('/logout', logOutController)
    .get('/all', protect, getUsersController)
    .get('/:id', getSingleUserController)
    .put('/:id', updateUserController);

export default userRouter;