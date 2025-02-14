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
    const aboutMe = data.aboutMe;
    const gallery = data.gallery; // Agora os dados são acessados corretamente

    // Atualizar a seção "about-me"
    const aboutMeSection = document.getElementById("about-me");
    aboutMeSection.querySelector("h1").textContent = aboutMe.name;
    aboutMeSection.querySelector("img").src = aboutMe.image;
    aboutMeSection.querySelector("img").alt = `${aboutMe.name} Picture`;
    aboutMeSection.querySelector("h3").textContent = aboutMe.title;
    aboutMeSection.querySelector("p").textContent = aboutMe.description;

    // Atualizar a seção "gallery"
    const gallerySection = document.getElementById("gallery-content");

    gallery.forEach((category) => {
      const galleryElementDiv = document.createElement("div");
      galleryElementDiv.classList.add("GalleryElement");

      const projectTitle = document.createElement("h3");
      projectTitle.textContent = category.projectName;
      galleryElementDiv.appendChild(projectTitle);

      const coverImage = document.createElement("img");
      coverImage.src = category.coverImage;
      coverImage.alt = `Capa de ${category.projectName}`;
      // coverImage.classList.add("cover-image"); // Adiciona uma classe
      galleryElementDiv.appendChild(coverImage);

      gallerySection.appendChild(galleryElementDiv);
    });
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados:", error);
  });
