import { Router } from "express"
import { CreateGame } from "../controllers/games.controller.js"


const gamesRouter = Router()

gamesRouter.post("/games", CreateGame)


export default gamesRouter