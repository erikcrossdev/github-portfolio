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
        aboutMeSection.querySelector("h1").textContent = aboutMe.name;
        const aboutMeImage = aboutMeSection.querySelector("img");
        aboutMeImage.src = aboutMe.image;
        aboutMeImage.alt = `${aboutMe.name} Picture`;
        aboutMeSection.querySelector("h3").textContent = aboutMe.title;
        aboutMeSection.querySelector("p").textContent = aboutMe.description;
    }

    // Função para exibir o pop-up com detalhes dos projetos de uma categoria
    function showPopup(category) {
        const popupOverlay = document.getElementById("popup-overlay");
        const popupContent = document.getElementById("popup-content");

          // Limpa o conteúdo anterior do pop-up
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

            projectElement.innerHTML = `
                <h3>${project.projectTitle}</h3>
                <img src="${project.coverImage}" alt="${project.projectTitle}">
                <p><strong>Platform:</strong> ${project.targetPlatform}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>
                <p><strong>Description:</strong> ${project.description}</p>
                ${project.embeddedVideoYoutube ? `<iframe src="${project.embeddedVideoYoutube}" width="100%" height="315" frameborder="0" allowfullscreen></iframe>` : ""}
                ${project.downloadLink && project.downloadLink.trim() !== "" ? `<a href="${project.downloadLink}" target="_blank" class="download-link">Download</a>` : ""}
            `;

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