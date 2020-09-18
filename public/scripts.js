const recipes = document.querySelectorAll('.recipe')


for (recipe of recipes){
    const id = recipe.getAttribute('id')

    recipe.addEventListener("click", function(){
        window.location.href = `/receita/${id}`  
    })
}   


  