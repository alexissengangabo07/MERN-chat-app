import express from 'express';
import {
    insertUserController,
    getUsersController,
    getSingleUserController,
    updateUserController
} from '../controllers/user.controller.js'
const router = express.Router();

router
    .post('/register', insertUserController)
    .get('/users', getUsersController)
    .get('/user/:id', getSingleUserController)
    .put('/user/:id', updateUserController);

export default router;