const hideShowButtons = document.querySelectorAll('.recipeid_content .button')
const recipeInfos = document.querySelectorAll('.recipeid_content .recipe-hide-show')


for (const button in hideShowButtons){
    hideShowButtons[button].addEventListener("click", function(){
        if(hideShowButtons[button].classList.contains('hide')){
            hideShowButtons[button].textContent = "MOSTRAR"
            hideShowButtons[button].classList.remove('hide')
            recipeInfos[button].style.display = "none"
        } else {
            hideShowButtons[button].textContent = "ESCONDER"
            hideShowButtons[button].classList.add('hide')
            recipeInfos[button].style.display = "initial"
        }
    })
}





