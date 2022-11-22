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

const userRouter = Router();

userRouter
    .post('/register', insertUserController)
    .post('/login', userLoginController)
    .get('/connected', connectedUser)
    .get('/logout', logOutController)
    .get('/all', getUsersController)
    .get('/:id', getSingleUserController)
    .put('/:id', updateUserController);

export default userRouter;