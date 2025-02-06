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

    // Atualizar a seção "about-me"
    const aboutMeSection = document.getElementById("about-me");
    aboutMeSection.querySelector("h1").textContent = aboutMe.name;
    aboutMeSection.querySelector("img").src = aboutMe.image;
    aboutMeSection.querySelector("img").alt = `${aboutMe.name} Picture`;
    aboutMeSection.querySelector("h3").textContent = aboutMe.title;
    aboutMeSection.querySelector("p").textContent = aboutMe.description;
  })
  .catch((error) => {
    console.error("Erro ao carregar os dados:", error);
  });
