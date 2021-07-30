const db = require("../../config/db")
const { date } = require("../../lib/tools")


module.exports = {
    all(){
        const query = `
        SELECT recipes.*, chefs.name AS author
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id) 
        GROUP BY recipes.id, chefs.id
        `

        return db.query(query)
    },
    allChefs(){
        const query = `
        SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        GROUP BY chefs.id
        `

        return db.query(query)
    },
    create(data){
        const query = `
        INSERT INTO recipes (
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    findById(id){
        query = `
        SELECT recipes.*,  chefs.name AS author 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1
        GROUP by recipes.id, chefs.id
        `

        return db.query(query, [id])
    },
    update(data){
        const query = `
        UPDATE recipes SET
            image=($1),
            title=($2),
            ingredients=($3),
            preparation=($4),
            information=($5)
        WHERE id = $6
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    search(params){
        const { search, limit, offset} = params

        let query = `
        SELECT recipes.*, chefs.name AS author,
            ( 
            SELECT count(*) FROM recipes
            WHERE recipes.title ILIKE '%${search}%'
            ) AS total 
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.title ILIKE '%${search}%'
        GROUP BY recipes.id, chefs.id
        LIMIT $1 OFFSET $2
        `
        if (!search){
            query = `
            SELECT recipes.*, chefs.name AS author,
            ( SELECT count(*) FROM recipes ) AS total
            FROM recipes
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            GROUP BY recipes.id, chefs.id
            LIMIT $1 OFFSET $2
        `
        }
        

        return db.query(query, [limit, offset])
    }
}