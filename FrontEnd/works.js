/*
gallery
filtre
token
*/
/**/

fetchCats();
async function fetchCats() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  return categories;
}

fetchCats().then((categories) => {
  categories.unshift({ name: "Tous" });
  const categoriesList = document.getElementById("filters");

  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.textContent = ` ${category.name}`;
    categoriesList.appendChild(listItem);
  });
});
/*____________________________________________________________________________________________________________________________ */
/*
async function works() {
  const response = await fetch("http://localhost:5678/api/works");
  const categories = await response.json();

  return categories;
}

works();*/
async function works() {
  try {
    //pour gestion des errer
    const response = await fetch("http://localhost:5678/api/works");
    const categories = await response.json();

    const gallery = document.getElementById("gallery");

    categories.forEach((e) => {
      const imageContainer = document.createElement("div");
      const imageElement = document.createElement("img");
      const titleElement = document.createElement("p");

      imageElement.src = e.imageUrl;
      imageElement.alt = e.title;

      titleElement.textContent = e.title;

      imageContainer.appendChild(imageElement);
      imageContainer.appendChild(titleElement);
      gallery.appendChild(imageContainer);
    });
  } catch (error) {
    //pour gestion des errer
    console.error(
      "Une erreur s'est produite lors de la récupération des données de la galerie :",
      error
    );
  }
}

// afficher galerie quand page est chargée
window.addEventListener("load", works);
