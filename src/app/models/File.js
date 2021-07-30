const db = require('../../config/db')

module.exports = {
    createFile({ filename, path }){
        
        try{
            const query = `
            INSERT INTO files (
                name,
                path,
            ) VALUES ($1, $2)
            RETURNING id
            `
    
            const values = [
                filename,
                path
            ]

            return db.query(query, values)
        }catch(err){
            console.error(err)
        }

        
    },
    createRecipeFiles(recipe_id, file_id){
        const query = `
        INSERT INTO recipe_files (
            recipe_id,
            file_id,
        ) VALUES ($1, $2)
        RETURNING id
        `

        const values = [
            recipe_id,
            file_id,
        ]

        return db.query(query, values)
    }
}