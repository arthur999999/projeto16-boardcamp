import {connection} from "../database/db.js";
import joi from "joi";

const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]+$/, 'numbers').max(11).min(10).required(),
    cpf: joi.string().pattern(/^[0-9]+$/, 'numbers').length(11).required(),
    birthday: joi.date().max('now')
})



export async function CustomerCreate(req, res) {
    const {name, phone, cpf, birthday} = req.body

    const birthdayCorrect = birthday.split('-')

    const birthdayReal = [birthdayCorrect[1], birthdayCorrect[2], birthdayCorrect[0] ].join('-')

    const customerObjetc = {
        name: name,
        phone: phone,
        cpf: cpf,
        birthday: birthdayReal
    }

    const validation = customerSchema.validate(customerObjetc, {abortEarly: false})

    if(validation.error){
        res.status(400).send(validation.error.message)
        return
    }

    try {
        const sameCpf = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
        if(sameCpf.rows[0]){
            res.sendStatus(409)
            return
        }

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

        res.sendStatus(201)
    } catch (error) {
        res.status(400).send(error.message)
    }



}

export async function CustomerGet(req, res) {
    try {
        const {rows} = await connection.query(`SELECT * FROM customers`)
        res.send(rows)
    } catch (error) {
        res.send(error.message)
    }
}