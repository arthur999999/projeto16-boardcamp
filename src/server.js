import express from "express";
import dotenv from 'dotenv';
import categorieRouter from "./routes/categories.routes.js";
import gamesRouter from "./routes/games.routes.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(categorieRouter)
app.use(gamesRouter)

app.listen(4000, ()=> {console.log('rodando')})

