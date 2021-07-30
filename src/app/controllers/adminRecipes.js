const dataModel = require('../models/recipe')
const fileModel = require('../models/File')

module.exports = {
    home(req, res) {
        return res.render("adm/adm_home")
    },
    async list(req, res){

        const results = await dataModel.all()
        const recipes = results.rows

        return res.render("adm/adm_recipes", { recipes })

    },
    create(req, res) {

        return res.render("adm/adm_create_recipe")
    },
    async show(req, res) {
        const id = req.params.id

        const results = await dataModel.findById(id)
        const recipe = results.rows[0]

        return res.render("adm/adm_show", { recipe })
        

    },
    async edit(req, res) {
        const { id } = req.params

        const results = await dataModel.findById(id)
        const recipe = results.rows[0]

        return res.render("adm/adm_edit", { recipe })
        

    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }   


        //console.log(req.files)


        if(req.files.length == 0)
        return res.send('Please, send at least one image')

        
        let results = await dataModel.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => fileModel.createFile({
            ...file
        }))
        await Promise.all(filesPromise)


        /*filesPromise = req.files.map(file => fileModel.createRecipeFiles(recipeId, file.id))
        await Promise.all(filesPromise)*/

        // results = await fileModel.createRecipeFiles(recipeId, fileId)

        return res.redirect(`/admin/receitas/${recipeId}`)
        
    },
    async put(req, res) {
        const { id } = req.body
        
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields!")
            }
        }

        await dataModel.update(req.body)

        return res.redirect(`/admin/receitas/${id}`)
        


    },
    async delete(req, res) {
        const { id } = req.body


        await dataModel.delete(id)

        return res.redirect("/admin/receitas")
        
    }
}



