import { Router } from "express"
import { CustomerCreate, CustomerGet } from "../controllers/customers.controller.js"


const customersRouter = Router()

customersRouter.post("/customers", CustomerCreate)
customersRouter.get("/customers", CustomerGet)


export default customersRouter