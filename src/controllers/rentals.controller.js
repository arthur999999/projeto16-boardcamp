import {connection} from "../database/db.js";
import joi from "joi";
import dayjs from "dayjs";




const rentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().min(1).required()
})

export async function CreateRental (req, res) {

    const rental = req.body

    const validation = rentalSchema.validate(rental, {abortEarly: false})

    if(validation.error){
        res.status(400).send(validation.error.message)
        return
    }
    
    try {
        const idCustomer = await connection.query('SELECT * FROM customers WHERE id = $1', [rental.customerId])

        if(!idCustomer.rows[0]){
            res.sendStatus(400)
            return
        }

        const idGame = await connection.query('SELECT * FROM games WHERE id = $1', [rental.gameId])

        if(!idGame.rows[0]){
            res.sendStatus(400)
            return
        }

        const rentalGame = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1', [rental.gameId])

        if(rentalGame.rows.length >= idGame.rows[0].stockTotal){
            res.sendStatus(400)
            return
        }

        const rentalObject = {

            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: `${dayjs().year()}-${dayjs().month()+ 1}-${dayjs().date()}`,    
            daysRented: rental.daysRented,             
            returnDate: null,          
            originalPrice: (idGame.rows[0].pricePerDay * rental.daysRented),       
            delayFee: null  
        }

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            rentalObject.customerId,
            rentalObject.gameId,
            rentalObject.rentDate,
            rentalObject.daysRented,
            rentalObject.returnDate,
            rentalObject.originalPrice,
            rentalObject.delayFee
        ])

        res.sendStatus(201)
    } catch (error) {
        res.status(400).send(error.message)
    }

    
}

export async function ReturnRental (req, res) {

    const id = req.params.id

    try {
        const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id])

        if(!rental.rows[0]){
            res.sendStatus(404)
            return
        }

        if(rental.rows[0].returnDate){
            res.sendStatus(400)
            return
        }

        const dateNow = `${dayjs().year()}-${dayjs().month()+ 1}-${dayjs().date()}`

        await connection.query(`UPDATE rentals SET "returnDate" = $1 WHERE id = $2`, [dateNow, id])

        res.sendStatus(200)




       
    } catch (error) {
        res.status(400).send(error.message)
    }
}