const express = require('express')
const routes = express.Router()
const recipes = require('./recipes')


routes.get("/", recipes.home)
routes.get("/sobre", recipes.about)
routes.get("/receitas", recipes.list)
routes.get("/receita/:id", recipes.recipe)


routes.get("/admin/recipes/create", recipes.create)
routes.post("/admin/recipes", recipes.post)


module.exports = routes