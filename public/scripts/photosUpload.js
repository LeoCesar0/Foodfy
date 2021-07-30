
const PhotosUpload = {
    input: "",
    uploadLimit: 5,
    files: [],
    handleFileInput(event){
        const { files: fileList } = event.target
        const { uploadLimit } = PhotosUpload
        PhotosUpload.input = event.target

        if (fileList.length > uploadLimit || this.files.length + fileList.length > uploadLimit){
            alert(`Envie no Máximo ${uploadLimit}`)
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            PhotosUpload.files.push(file)

            reader.onload = () => {
                PhotosUpload.createContainer(reader.result)
            }

            reader.readAsDataURL(file)
        })


        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    createContainer(src){
        const preview = document.querySelector("#photos-preview")
        const image = new Image()

                image.src = String(src)

                const div = document.createElement("div")
                div.classList.add('photo')

                div.onclick = PhotosUpload.removePhoto

                div.appendChild(image)

                div.appendChild(this.getRemoveButton())

                preview.appendChild(div)
    },
    getRemoveButton(){
        const button = document.createElement("i")
        button.classList.add("material-icons")
        button.innerHTML = "close"

        return button
    },
    removePhoto(event){
        const preview = document.querySelector("#photos-preview")

        const divPhoto = event.target.parentNode
        const photosArray = Array.from(preview.children)
        const Index = photosArray.indexOf(divPhoto)

        /*
        const filteredFiles = PhotosUpload.files.filter(function(file){
            return PhotosUpload.files.indexOf(file) != Index
        })
        
        PhotosUpload.files = filteredFiles
        */

        PhotosUpload.files.splice(Index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        console.log(PhotosUpload.input.files)

        divPhoto.remove();

    }
}

