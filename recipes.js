const data = require('./data.json')
const fs = require("fs")


exports.home = function(req, res){
    return res.render('home', { recipes: data.recipes })
}

exports.about = function(req, res){
    return res.render('about')
}

exports.list = function(req, res){
    return res.render('recipes', { recipes: data.recipes })
}

exports.recipe = function(req, res){
    const { id } = req.params

    const recipe = data.recipes[id - 1]

    return res.render('recipeid', { recipe })
}

// ADMIN

exports.index = function(req, res){

    const recipes =  data.recipes

    return res.render("adm/adm_index", {recipes})
}
 
exports.create = function(req, res){
    return res.render("adm/adm_create_recipe")
}

exports.show = function(req, res){
    const {id} = req.params
    
    const recipe = {
        ...data.recipes[id - 1],
        id
    }

    return res.render("adm/adm_show", {recipe})
}

exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Please, fill all fields!")
        }
    }

  
    data.recipes.push({
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")
        
        return res.redirect("/")
    })
}

exports.edit = function(req, res){
    const { id } = req.params

    if (!data.recipes[id]) return res.send("This recipe doesn't exist!")

    const recipe = {
        id,
        ...data.recipes[id]
    }

    return res.render("adm/adm_edit", {recipe})
}

exports.put = function(req, res){

    const { id } = req.body
    let index = 0
    console.log(id)

    const foundRecipe = data.recipes.find(function(foundRecipe, foundIndex){
        if (foundIndex == id){
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Recipe ID not found!")

    const recipe = {
        ...foundRecipe,
        ...req.body
    }

    data.recipes[index] = recipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/")
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe, index){
       return index != id
    })

     data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")

        return res.redirect("/")
    })
    
}
