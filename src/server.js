import express from "express";
import dotenv from 'dotenv';
import categorieRouter from "./routes/categories.routes.js";
import gamesRouter from "./routes/games.routes.js";
import cors from "cors";
import customersRouter from "./routes/customers.routes.js";
import rentalsRouter from "./routes/rentals.routes.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(categorieRouter)
app.use(gamesRouter)
app.use(customersRouter)
app.use(rentalsRouter)

app.listen(process.env.PORT, ()=> {console.log('rodando')})

