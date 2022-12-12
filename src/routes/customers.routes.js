import { Router } from "express"
import { CustomerCreate, CustomerGet, CustomerGetId, CustomersPut } from "../controllers/customers.controller.js"


const customersRouter = Router()

customersRouter.post("/customers", CustomerCreate)
customersRouter.get("/customers", CustomerGet)
customersRouter.get("/customers/:id", CustomerGetId)
customersRouter.put("/customers/:id", CustomersPut)


export default customersRouter