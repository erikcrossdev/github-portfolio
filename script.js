// Carregar dados do JSON e renderizar na página
fetch("data.json") //when deploy, use
  //fetch('./data.json')
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

   // Função para criar e exibir o pop-up com detalhes do projeto
   function showPopup(project) {
    // Criar o fundo do pop-up
    const popupOverlay = document.createElement("div");
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = "0";
    popupOverlay.style.left = "0";
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    popupOverlay.style.display = "flex";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.zIndex = "1000";

    // Criar o conteúdo do pop-up
    const popupContent = document.createElement("div");
    popupContent.style.backgroundColor = "#fff";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "8px";
    popupContent.style.maxWidth = "600px";
    popupContent.style.width = "90%";
    popupContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    popupContent.style.position = "relative";

    // Botão para fechar o pop-up
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.background = "transparent";
    closeButton.style.border = "none";
    closeButton.style.fontSize = "16px";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", () => document.body.removeChild(popupOverlay));
    popupContent.appendChild(closeButton);

    // Adicionar informações do projeto
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.projectName;
    popupContent.appendChild(projectTitle);

    const projectDescription = document.createElement("p");
    projectDescription.textContent = project.description;
    popupContent.appendChild(projectDescription);

    const projectImage = document.createElement("img");
    projectImage.src = project.coverImage;
    projectImage.alt = `Imagem do projeto ${project.projectName}`;
    projectImage.style.width = "100%";
    projectImage.style.borderRadius = "4px";
    popupContent.appendChild(projectImage);

    // Adicionar conteúdo ao overlay e ao body
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);
  }

  // Atualizar a seção "gallery" com click para abrir pop-up
  const gallerySection = document.getElementById("gallery-content");
  gallery.forEach((category) => {
    const galleryElementDiv = document.createElement("div");
    galleryElementDiv.classList.add("GalleryElement");
    galleryElementDiv.style.cursor = "pointer"; // Indica que é clicável

    const projectTitle = document.createElement("h3");
    projectTitle.textContent = category.projectName;
    galleryElementDiv.appendChild(projectTitle);

    const coverImage = document.createElement("img");
    coverImage.src = category.coverImage;
    coverImage.alt = `Capa de ${category.projectName}`;
    galleryElementDiv.appendChild(coverImage);

    // Adiciona evento de clique para abrir o pop-up com detalhes do projeto
    galleryElementDiv.addEventListener("click", () => showPopup(category));

    gallerySection.appendChild(galleryElementDiv);
  });
})
.catch((error) => {
  console.error("Erro ao carregar os dados:", error);
});