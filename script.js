// Carregar dados do JSON e renderizar na página
fetch("data.json")
  //fetch('./data.json')// Carregar dados do JSON e renderizar na página
.then((response) => {
    if (!response.ok) {
        throw new Error("Erro ao carregar o arquivo JSON.");
    }
    return response.json();
})
.then((data) => {
    const { aboutMe, gallery } = data;

    // Atualizar a seção "about-me"
    const aboutMeSection = document.getElementById("about-me");
    if (aboutMeSection) {
        const titleElement = aboutMeSection.querySelector("h3"); // Ajuste para o correto
        if (titleElement) titleElement.textContent = aboutMe.title;

        aboutMeSection.querySelector("p").innerHTML = aboutMe.description;
        const aboutMeImage = aboutMeSection.querySelector("img");
        aboutMeImage.src = aboutMe.image;
        aboutMeImage.alt = `${aboutMe.name} Picture`;
    }

    // Função para exibir o pop-up com detalhes dos projetos de uma categoria
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
    const imageLightbox = document.createElement("div");
    imageLightbox.id = "image-lightbox";
    imageLightbox.setAttribute("role", "dialog");
    imageLightbox.setAttribute("aria-modal", "true");
    imageLightbox.setAttribute("aria-label", "Visualização ampliada da imagem");
    imageLightbox.innerHTML = `
        <button id="image-lightbox-close" type="button" aria-label="Fechar imagem ampliada">&times;</button>
        <img alt="">
    `;
    document.body.appendChild(imageLightbox);

    const lightboxImage = imageLightbox.querySelector("img");
    const lightboxCloseButton = imageLightbox.querySelector("#image-lightbox-close");

    function closeImageLightbox() {
        imageLightbox.classList.remove("active");
        lightboxImage.src = "";
    }

    imageLightbox.addEventListener("click", (event) => {
        if (event.target === imageLightbox || event.target.id === "image-lightbox-close") {
            closeImageLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeImageLightbox();
        }
    });

    popupContent.addEventListener("click", (event) => {
        const imageButton = event.target.closest(".project-image-button");
        if (!imageButton) {
            return;
        }

        const image = imageButton.querySelector("img");
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        imageLightbox.classList.add("active");
        lightboxCloseButton.focus();
    });

    popupContent.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        const imageButton = event.target.closest(".project-image-button");
        if (imageButton) {
            event.preventDefault();
            imageButton.click();
        }
    });

    popupOverlay.addEventListener("click", (event) => {
        if (event.target === popupOverlay) {
            closeImageLightbox();
            popupOverlay.classList.remove("active");
        }
    });

    function showPopup(category) {
        popupContent.innerHTML = `
            <button id="close-btn">X</button>
            <h2>${category.projectName}</h2>
            ${category.description && category.description.trim() !== "" ? `<p class="category-description">${category.description}</p>` : ""}
            <div id="projects-container"></div>
        `;

        // Adiciona cada projeto ao pop-up
        const projectsContainer = document.getElementById("projects-container");
        category.projects.forEach((project) => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");

            const images = Array.isArray(project.images)
                ? project.images
                    .map((image) => typeof image === "string" ? { image } : image)
                    .filter((image) => image && typeof image.image === "string" && image.image.trim() !== "")
                : [];

            if (typeof project.coverImage === "string" && project.coverImage.trim() !== "") {
                images.unshift({ image: project.coverImage });
            }

            projectElement.innerHTML = `
                <h3>${project.projectTitle}</h3>
                <p><strong>Platform:</strong> ${project.targetPlatform}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>
                <p><strong>Description:</strong> ${project.description}</p>
                ${project.embeddedVideoYoutube ? `<iframe src="${project.embeddedVideoYoutube}" width="560" height="315" frameborder="0" allowfullscreen></iframe>` : ""}
                ${project.downloadLink && project.downloadLink.trim() !== "" ? `<a href="${project.downloadLink}" target="_blank" class="download-link">Download</a>` : ""}
            `;

            if (images.length > 0) {
                const detailsHeading = document.createElement("h4");
                detailsHeading.classList.add("project-images-heading");
                detailsHeading.textContent = "Details";
                projectElement.appendChild(detailsHeading);

                const imagesContainer = document.createElement("div");
                imagesContainer.classList.add("project-images");

                images.forEach((image, index) => {
                    const imageFigure = document.createElement("figure");
                    const imageButton = document.createElement("button");
                    imageButton.classList.add("project-image-button");
                    imageButton.type = "button";
                    imageButton.setAttribute("aria-label", `Ampliar imagem ${index + 1} de ${project.projectTitle}`);

                    const imageElement = document.createElement("img");
                    imageElement.src = image.image;
                    imageElement.alt = `${project.projectTitle} - imagem ${index + 1}`;
                    imageButton.appendChild(imageElement);
                    imageFigure.appendChild(imageButton);

                    if (typeof image.description === "string" && image.description.trim() !== "") {
                        const caption = document.createElement("figcaption");
                        caption.textContent = image.description;
                        imageFigure.appendChild(caption);
                    }

                    imagesContainer.appendChild(imageFigure);
                });

                projectElement.appendChild(imagesContainer);
            }

            projectsContainer.appendChild(projectElement);
        });

        // Adiciona o evento de fechar o pop-up
        document.getElementById("close-btn").addEventListener("click", () => {
            popupOverlay.classList.remove("active");
        });

        // Exibe o pop-up
        popupOverlay.classList.add("active");
    }

    // Renderizar a galeria
    const gallerySection = document.getElementById("gallery-content");
    if (gallerySection) {
        gallery.forEach((category) => {
            const galleryElementDiv = document.createElement("div");
            galleryElementDiv.classList.add("GalleryElement");
            galleryElementDiv.style.cursor = "pointer";

            const projectTitle = document.createElement("h3");
            projectTitle.textContent = category.projectName;
            galleryElementDiv.appendChild(projectTitle);

            const coverImage = document.createElement("img");
            coverImage.src = category.coverImage;
            coverImage.alt = `Capa de ${category.projectName}`;
            galleryElementDiv.appendChild(coverImage);

            // Adiciona evento de clique para abrir o pop-up com detalhes da categoria
            galleryElementDiv.addEventListener("click", () => showPopup(category));

            gallerySection.appendChild(galleryElementDiv);
        });
    }
})
.catch((error) => {
    console.error("Erro ao carregar os dados:", error);
});