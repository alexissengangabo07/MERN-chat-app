import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));