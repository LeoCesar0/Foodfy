const currentPage = location.pathname
const links = document.querySelectorAll("header .links a")
const logo = document.querySelector("header span")

for (link of links){
    if (currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active')
    }
}


if(currentPage.includes('admin')){
    logo.addEventListener("click", function(){
        window.location = "/admin"
    })
} else {
    logo.addEventListener("click", function(){
        window.location = "/"
    })
}




