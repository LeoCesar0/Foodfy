
function paginate(selectedPage, totalPages) {

    let pages = [],
        previousPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPages = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPages = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesAfterSelectedPages && pagesBeforeSelectedPages) {


            if (previousPage && currentPage - previousPage > 2) {
                pages.push("...")
            }

            if (previousPage && currentPage - previousPage == 2) {
                pages.push(previousPage + 1)
            }

            pages.push(currentPage)

            previousPage = currentPage
        }


    }

    return pages

}


const pagination = document.querySelector(".pagination")

const page = +pagination.dataset.page
const total = +pagination.dataset.total
const search = pagination.dataset.search
const pages = paginate(page, total)

let elements = ""

for (let page of pages){
    if(String(page).includes("...")){
        elements += `<span>${page}</span>`
    } else {
        if(search){
            elements += `<a href="?search=${search}&page=${page}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
    
}

pagination.innerHTML = elements