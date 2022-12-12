import { Router } from "express"
import { CustomerCreate, CustomerGet, CustomerGetId } from "../controllers/customers.controller.js"


const customersRouter = Router()

customersRouter.post("/customers", CustomerCreate)
customersRouter.get("/customers", CustomerGet)
customersRouter.get("/customers/:id", CustomerGetId)


export default customersRouter