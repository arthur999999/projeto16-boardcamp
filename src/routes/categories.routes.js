import { Router } from "express"
import { CreateCategori, GetCategories } from "../controllers/categories.controller.js"

const categorieRouter = Router()

categorieRouter.post("/categories", CreateCategori)
categorieRouter.get("/categories", GetCategories)

export default categorieRouter