/*----------Pour la fuction categorie-------------- */
fetchCats();

async function fetchCats() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  categories.unshift({ id: 0, name: "Tous" });
  const categoriesList = document.getElementById("filters");

  categories.forEach((category) => {
    const listItem = document.createElement("li");
    listItem.textContent = ` ${category.name}`;
    listItem.style.cursor = "pointer";
    categoriesList.appendChild(listItem);

    listItem.addEventListener("click", () =>
      filterWorks(category.id, listItem)
    );
  });

  filterWorks(0);
}

async function fetchFilteredWorks(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");

  if (!response.ok) {
    throw new Error(`Erreur HTTP! Statut : ${response.status}`);
  }

  const categories = await response.json();
  const filteredCategories = categories.filter((work) => {
    return categoryId === 0 || work.categoryId === categoryId;
  });

  return filteredCategories;
}

export function displayWorks(filteredCategories) {
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
}

async function filterWorks(categoryId, clickedListItem) {
  const listItems = document.querySelectorAll("#filters li");

  listItems.forEach((item) => {
    item.classList.remove("selected");
  });

  if (clickedListItem) {
    clickedListItem.classList.add("selected");
  }

  const filteredCategories = await fetchFilteredWorks(categoryId);
  displayWorks(filteredCategories);
}
