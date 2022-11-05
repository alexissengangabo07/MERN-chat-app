import express from 'express';
import { insertUserController } from '../controllers/user.controller.js'
const router = express.Router();

router.post('/register', insertUserController);

export default router;