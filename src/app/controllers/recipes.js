const dataModel = require('../models/recipe')

module.exports = {
    async home(req, res){

        const results = await dataModel.all()
        const recipes = results.rows

        return res.render('home', { recipes })
        
    },
    about(req, res){
        return res.render('about')
    },
    async list(req, res){

        const results = await dataModel.all()
        const recipes = results.rows

        return res.render('recipes', { recipes })
        

    },
    async chefs(req, res){
        
        const results = await dataModel.allChefs()
        const chefs = results.rows

        return res.render('chefs', { chefs })
        

    },
    async show(req, res){
        const { id } = req.params
    
        const results = await dataModel.findById(id)
        const recipe = results.rows[0]


        return res.render('recipe_show', { recipe })
        
    },
    async busca(req, res){
        let { search, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            search,
            page,
            limit,
            offset
        }

        const result = await dataModel.search(params)
        const results = result.rows
        
        
        const pagination = {
            total: Math.ceil(results[0].total / limit),
            totalItens: results[0].total,
            page
        }

        console.log(`Total de Páginas: ${pagination.total}; Pagina Atual: ${pagination.page}`)
            
        return res.render('search', { recipes: results, pagination, search })
    }
}







