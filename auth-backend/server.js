import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// Middleware for parsing request body
app.use(express.json());

dotenv.config();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);


const PORT = process.env.PORT;
const mongoDBURL = process.env.MONGODB_URL;

//routes

app.use('/auth',authRoute);


//databse connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
