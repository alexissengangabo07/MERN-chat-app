// importing dependencies
import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/users.route.js';
import messageRouter from './routes/messages.route.js';

// config dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

morgan.token('id', function getId(req) {
    return req.id
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));

// routes
app.use('/users', userRouter);
app.use('/messages', messageRouter);

let users = [{}];

// Connect socket and socket manups
io.once('connect', (socket) => {
    console.log('Socket Connected');

    socket.once('message', ({ message }) => {
        console.log('message', message);
        io.emit('newMessage', { message });
    });

    socket.once('disconnect', () => {
        console.log('User disconnected');
    });
});

// connect database and implementation server listenerr
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(PORT, () => console.log(`Database connected and Server listening at port ${PORT}`));
    })
    .catch(err => {
        console.log(err.message);
    });