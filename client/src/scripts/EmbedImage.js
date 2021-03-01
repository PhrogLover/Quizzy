    const image = document.getElementById("add-image");
    const previewContainer = document.getElementById("image-preview");
    const previewImage = document.querySelector(".image-preview__image");
    const previewDefaultText = document.querySelector(".image-preview__default-text");

    image.addEventListener("change", () => {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            previewDefaultText.style.display = "none";
            previewImage.style.display = "block";

            reader.addEventListener("load", () => {
                previewImage.setAttribute("src", this.result);
            })

            reader.readAsDataURL(file);
        }
    })

    document.getElementById('removeFile').addEventListener("click", () => {
        previewDefaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "");
    })