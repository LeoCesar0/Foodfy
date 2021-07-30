const db = require("../../config/db")
const { date } = require("../../lib/tools")


module.exports = {
    all(){
        return db.query(`SELECT * FROM chefs`)
    },
    create(data){
        const query = `
        INSERT INTO chefs (
            name,
            avatar_url,
            created_at
        ) VALUES ($1, $2, $3)
        RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    findById(id){
        const query = `
        SELECT chefs.*, count(recipes) AS total_recipes, recipes.image, recipes.title, recipes.id AS recipe_id
        FROM chefs 
        LEFT JOIN recipes on (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id, recipes.id
        `

        return db.query(query, [id])
    },
    update(data){
        const query = `
        UPDATE chefs SET
            name=($1),
            avatar_url=($2)
        WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM chefs WHERE id = $1`, [id])
    }
}