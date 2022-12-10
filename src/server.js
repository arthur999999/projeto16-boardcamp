import express from "express";
import dotenv from 'dotenv';
import categorieRouter from "./routes/categories.routes.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(categorieRouter)

app.listen(4000, ()=> {console.log('rodando')})

