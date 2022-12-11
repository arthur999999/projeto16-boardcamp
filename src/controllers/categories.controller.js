import {connection} from "../database/db.js";
import joi from "joi";

const categorieSchema = joi.object({
    name: joi.required()
})

export async function CreateCategori (req, res) {
    const name = req.body

    const validation = categorieSchema.validate(name, {abortEarly: false})

    if(validation.error) {
        res.status(400).send(validation.error.message)
        return
    }

    try {
        const {rows} = await connection.query("SELECT * FROM categories WHERE name = $1;", [name.name])
        if(rows[0]){
            res.sendStatus(409)
            return
        }

        await connection.query("INSERT INTO categories (name) VALUES ($1)", [name.name])

        res.sendStatus(201)
        
        
        
    } catch (error) {
        res.send(error.message)
    }
}