const dataModel = require('../models/chef')

module.exports = {
    async list(req, res) {

        let results = await dataModel.all()

        return res.render('adm/adm_chefs', { chefs: results.rows })
        
    },
    create(req, res) {
        return res.render('adm/adm_chef_create')
    },
    async show(req, res) {
        const id = req.params.id

        let results = await dataModel.findById(id)

            const recipes = []
            const chef = results.rows[0]
            let total_recipes


            for (let item of results.rows) {
                const recipe = {
                    title: item.title,
                    author: item.name,
                    image: item.image,
                    id: item.recipe_id
                }

                recipes.push(recipe)
            }

            if (recipes.length > 1){
                total_recipes = recipes.length
                return res.render('adm/adm_chef_show', { chef, recipes, total_recipes })
            } else {
                total_recipes = results.rows[0].total_recipes
                return res.render('adm/adm_chef_show', { chef, total_recipes })
            }

            
        
    },
    async edit(req, res) {
        const id = req.params.id

        let results = await dataModel.findById(id)

        return res.render('adm/adm_chef_edit', { chef: results.rows[0] })

        

    },
    async post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }

        let results = await dataModel.create(req.body)

        return res.redirect(`/admin/chefs/${results.rows[0].id}`)

    },
    async put(req, res) {
        const id = req.body.id

        await dataModel.update(req.body)

        return res.redirect(`/admin/chefs/${id}`)
    },
    async delete(req, res) {
        const id = req.body.id

        let results = await dataModel.findById(id)
            
            const total_recipes = results.rows.length

            if(results.rows[0].total_recipes > 0){
                
            return res.send(`Este Chef possui ${total_recipes} receitas. Chefs com receitas ativas não podem ser deletados`)
                
                
            } else await dataModel.delete(id)


        return res.redirect(`/admin/chefs`)
            
        
    }
}


