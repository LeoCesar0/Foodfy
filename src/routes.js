const express = require('express')
const routes = express.Router()

const multer = require("./app/middlewares/multer")
const recipes = require('./app/controllers/recipes')
const admin = require('./app/controllers/adminRecipes')
const chefs = require('./app/controllers/adminChefs')


routes.get("/", recipes.home)
routes.get("/sobre", recipes.about)
routes.get("/receitas", recipes.list)
routes.get("/chefs", recipes.chefs)
routes.get("/receita/:id", recipes.show)

routes.get("/busca", recipes.busca)

/*----------------------CHEFS------------------------------*/

routes.get("/admin", admin.home)

routes.get("/admin/chefs", chefs.list)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/edit/:id", chefs.edit)
routes.get("/admin/chefs/:id", chefs.show)


routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

/*----------------------RECIPES------------------------------*/

routes.get("/admin/receitas", admin.list)
routes.get("/admin/receitas/create", admin.create)
routes.get("/admin/receitas/edit/:id", admin.edit)
routes.get("/admin/receitas/:id", admin.show) 

routes.post("/admin/recipes", multer.array("photos", 5), admin.post)
routes.put("/admin/recipes", multer.array("photos", 5), admin.put)
routes.delete("/admin/recipes", admin.delete)


module.exports = routes