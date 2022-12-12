import { Router } from "express"
import { CreateRental, ReturnRental } from "../controllers/rentals.controller.js"



const rentalsRouter = Router()

rentalsRouter.post("/rentals", CreateRental)
rentalsRouter.post("/rentals/:id/return", ReturnRental)


export default rentalsRouter