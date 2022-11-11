// importing dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import userRouter from './routes/users.route.js';
import messageRouter from './routes/messages.route.js';

// config dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/message', messageRouter);

// connect database and implementation server listenerr
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Database connected and Server listening at port ${PORT}`));
    })
    .catch(err => {
        console.log(err.message);
    });