const currentPage = location.pathname
const links = document.querySelectorAll("header .links a")
const logo = document.querySelector("header span")

for (link of links){
    if (currentPage.includes(link.getAttribute('href'))){
        link.classList.add('active')
    }
}

logo.addEventListener("click", function(){
    window.location = "/"
})



