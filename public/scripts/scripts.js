const recipes = document.querySelectorAll('.recipe')
const image = document.querySelectorAll('.recipes .recipe-image')
const recipeName =  document.querySelectorAll('.recipes .recipe-name')
const link = document.querySelectorAll('.recipes .linkButton')



for (let recipe in recipes){
    let id = recipes[recipe].getAttribute("id")
    

    function openLink(){
        if (location.pathname.includes("admin")){
           window.location.href = `/admin/receitas/${id}`
        } else window.location.href = `/receita/${id}`
    }

    image[recipe].addEventListener("click", openLink)
    recipeName[recipe].addEventListener("click", openLink)
    if (link[recipe]) link[recipe].addEventListener("click", openLink)
}  

