import { Router } from "express"
import { CreateRental } from "../controllers/rentals.controller.js"



const rentalsRouter = Router()

rentalsRouter.post("/rentals", CreateRental)


export default rentalsRouter