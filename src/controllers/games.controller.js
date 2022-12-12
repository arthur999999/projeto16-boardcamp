import {connection} from "../database/db.js";
import joi from "joi";

const gameSchema = joi.object({
    name: joi.required(),
    image: joi.string().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId: joi.number().required(),
    pricePerDay: joi.number().greater(0).required()
})

export async function CreateGame (req, res) {
    const game = req.body

    const validation = gameSchema.validate(game, {abortEarly: false})

    if(validation.error) {
        res.status(400).send(validation.error.message)
        return
    }

    try {
        const gameName = await connection.query("SELECT * FROM games WHERE name = $1;", [game.name])

        if(gameName.rows[0]){
            res.sendStatus(409)
            return
        }

        const categorie = await connection.query('SELECT * FROM games WHERE "categoryId"  = $1;', [game.categoryId])

        if(!categorie.rows[0]){
            res.sendStatus(400)
            return
        }

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay])

        res.sendStatus(201)

    } catch (error) {
        res.send(error.message)
    }

    
}

    export async function GetGames (req, res) {

        const gameName = req.query.name

        try {
            const {rows} = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;`)
            if(gameName){
                const filterr = rows.filter((m)=> m.name.toUpperCase().includes(gameName.toUpperCase()))
                res.send(filterr)
                return
            }
            
            res.send(rows)
            
            
        } catch (error) {
            res.status(400).send(error.message)
        }
}