const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')


routes.get("/", recipes.home)
routes.get("/sobre", recipes.about)
routes.get("/receitas", recipes.list)
routes.get("/receita/:id", recipes.recipe)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/edit/:id", recipes.edit)
routes.get("/admin/recipes/:id", recipes.show)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


module.exports = routes