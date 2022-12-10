import { Router } from "express"
import { CreateCategori } from "../controllers/categories.controller.js"

const categorieRouter = Router()

categorieRouter.post("/categories", CreateCategori)

export default categorieRouter