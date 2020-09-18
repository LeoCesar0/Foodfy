const data = require('./data.json')
const fs = require("fs")


exports.home = function(req, res){
    return res.render('home', { recipes: data.recipes })
}

exports.about = function(req, res){
    return res.render('about')
}

exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Please, fill all fields!")
        }
    }

    let { image, preparation, information, ingredients } = req.body
    let id = 1

    const lastMember = data.recipes[length - 1]

    if(lastMember){
        id = lastMember.id + 1
    }

    data.recipes.push({
        id,
        image,
        preparation,
        information,
        ingredients
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")
        
        return res.redirect("/")
    })
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

exports.create = function(req, res){
    return res.render("adm/adm_create_recipe")
}