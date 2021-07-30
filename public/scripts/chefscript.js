const chefs = document.querySelectorAll('.chef')
const chefImg = document.querySelectorAll('.chef img')
const chefName = document.querySelectorAll('.chef .chef-name')
const link = document.querySelectorAll('.linkButton')


for (let chef in chefs){
    let id = chefs[chef].getAttribute("id")

    chefImg[chef].addEventListener("click", openLink)
    chefName[chef].addEventListener("click", openLink)
    link[chef].addEventListener("click", openLink)

    function openLink(){
        const path = location.pathname

        if (path.includes("admin")){
            window.location.href = `/admin/chefs/${id}`            
        } else (
            window.location.href = `/chefs/${id}`
        )

        
    }
}


