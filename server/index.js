// importing dependencies
import express from 'express';
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


// connect database and implementation server listenerr
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Database connected and Server listening at port ${PORT}`));
    })
    .catch(err => {
        console.log(err.message);
    });