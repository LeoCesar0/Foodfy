const recipes = document.querySelectorAll('.recipe')
const image = document.querySelectorAll('.recipes .recipe-image')
const name =  document.querySelectorAll('.recipes .recipe-name')
const link = document.querySelectorAll('.recipes .linkButton')

for (const recipe in recipes){
    const id = recipes[recipe].getAttribute('id')

    function openLink(){
        if (location.pathname.includes("admin")){
            window.location.href = `/admin/recipes/${id}`
        } else window.location.href = `/receita/${id}`
    }

    image[recipe].addEventListener("click", openLink)
    name[recipe].addEventListener("click", openLink)
    if (link[recipe]) link[recipe].addEventListener("click", openLink)
}    


  