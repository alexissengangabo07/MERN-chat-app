// importing dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import userRouter from './routes/users.route.js';
import messageRouter from './routes/messages.route.js';
import passportInitialization from './config/passport.config.js';

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
//Passport and session middlewares
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes  middlewares
/**
        * @ Docs routes params
 * */
app.use('/users', userRouter);
app.use('/messages', messageRouter);

passportInitialization(passport);

// connect database and implementation server listenerr
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Database connected and Server listening at port ${PORT}`));
    })
    .catch(err => {
        console.log(err.message);
    });