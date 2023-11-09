/*
gallery;
filtre;
token;

*/

fetchCats();
async function fetchCats() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  return categories;
}

fetchCats().then((categories) => {
  categories.unshift({ id: 0, name: "Tous" });
  const categoriesList = document.getElementById("filters");

  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.textContent = ` ${category.name}`;
    categoriesList.appendChild(listItem);

    listItem.addEventListener("click", () => filterWorks(category.id));
  });

  filterWorks(0);
});
async function filterWorks(categoryId) {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (response.ok) {
      }
      return response.json();
    })
    .then((categories) => {
      const filteredCategories = categories.filter((work) => {
        return categoryId === 0 || work.categoryId === categoryId;
      });

      const gallery = document.getElementById("gallery");
      gallery.innerHTML = "";

      filteredCategories.forEach((e) => {
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
    });
}

window.addEventListener("load", filterWorks);
