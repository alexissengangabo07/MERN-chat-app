import { Router } from 'express';
import {
    insertUserController,
    getUsersController,
    getSingleUserController,
    updateUserController
} from '../controllers/users.controller.js'

const userRouter = Router();

userRouter
    .post('/', insertUserController)
    .get('/all', getUsersController)
    .get('/:id', getSingleUserController)
    .put('/:id', updateUserController);

export default userRouter;