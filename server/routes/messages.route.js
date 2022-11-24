import { Router } from 'express';
import {
    getMessagesController,
    addMessageController,
    updateMessageController,
    deleteMessageController
} from '../controllers/messages.controller.js';

const messageRouter = Router();

messageRouter.get('/:user', getMessagesController)
    .post('/', addMessageController)
    .put('/:user', updateMessageController)
    .delete('/:id', deleteMessageController);

export default messageRouter;