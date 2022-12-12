import { Router } from "express"
import { CreateGame, GetGames } from "../controllers/games.controller.js"


const gamesRouter = Router()

gamesRouter.post("/games", CreateGame)
gamesRouter.get("/games", GetGames)


export default gamesRouter