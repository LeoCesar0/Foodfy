const addIngredient = document.querySelector("span.add_ingredient")
const ingredients = document.querySelector(".create #ingredients")
const fieldContainer = document.querySelectorAll(".ingredient")



function addIngredientFunc(){
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == ""){
        return false
    }

    newField.children[0].value = ""

    ingredients.appendChild(newField)
}

addIngredient.addEventListener("click", addIngredientFunc)

/////////////////////////////////////////////////////////////

const stepField = document.querySelectorAll(".create .preparation")
const preparations = document.querySelector(".create #preparations")
const addStep = document.querySelector(".create .add_step")


addStep.addEventListener("click", function(){
    const newField = stepField[stepField.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    preparations.appendChild(newField)
})

/////////////////////////////////////////////////////////////////