
import mongoose from "mongoose";
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import bodyParser from 'body-parser';

const app=express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const url=process.env.MONGODB_URL;
const port=process.env.PORT || 5000;

mongoose.connect(url,{dbName:"receipe"}).then(()=> console.log("mongodb connected")).catch((error)=> console.log(error));

app.use("/api/user",userRouter);

app.listen(port,()=> console.log(" server running on port 5000"));
