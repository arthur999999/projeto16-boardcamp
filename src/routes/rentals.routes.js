import { Router } from "express"
import { CreateRental, DeleteRental, GetRentals, ReturnRental } from "../controllers/rentals.controller.js"



const rentalsRouter = Router()

rentalsRouter.post("/rentals", CreateRental)
rentalsRouter.post("/rentals/:id/return", ReturnRental)
rentalsRouter.delete("/rentals/:id", DeleteRental)
rentalsRouter.get("/rentals", GetRentals)


export default rentalsRouter