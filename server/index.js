import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/auth.router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import blogrouter from './routers/blog.router.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api/blog',blogrouter)

app.use('/api/auth', authRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('Connected to MongoDB')}).catch((err) => {console.log(err)});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});