/*------------Pour ouvrire et fermé  moddall-----------------------*/

let modal = null;

// Fonction pour ouvrir la modal
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  showModal(target);
};

// Fonction pour fermer la modal
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  hideModal(modal);
};

// Fonction pour afficher la modal
const showModal = function (target) {
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;

  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// Fonction pour masquer la modal
const hideModal = function (target) {
  target.style.display = "none";
  target.setAttribute("aria-hidden", "true");
  target.removeAttribute("aria-modal");

  target.removeEventListener("click", closeModal);
  target
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  target
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const returnToModal1 = function (e) {
  e.preventDefault();
  hideModal(document.getElementById("modal2"));
  showModal(document.getElementById("modal1"));
};

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("js-modal")) {
    openModal(e);
  }
});

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.getElementById("addFile").addEventListener("click", function () {
  hideModal(document.getElementById("modal1"));
  showModal(document.getElementById("modal2"));
});

document
  .getElementById("returnToModal1Button")
  .addEventListener("click", returnToModal1);

/////////////////////////////////////////////////////////////////

import { displayWorks } from "./works.js";

// Fonction pour charger les images depuis l'API

function loadImages() {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    })
    .then((data) => {
      let imgmoDiv = document.getElementById("imgmo");
      imgmoDiv.innerHTML = "";
      displayWorks(data);

      if (data.length > 0) {
        data.forEach((work) => {
          let imgElement = document.createElement("img");
          imgElement.src = work.imageUrl;
          imgElement.alt = work.title;

          let containerDiv = document.createElement("div");
          containerDiv.classList.add("image-container");

          containerDiv.appendChild(imgElement);

          let trashIcon = document.createElement("i");
          trashIcon.classList.add("fa-solid", "fa-trash-can");
          trashIcon.title = "Cliquez pour supprimer l'image";

          trashIcon.addEventListener("click", async function (event) {
            event.preventDefault();
            const token = localStorage.getItem("token");
            const res = await fetch(
              `http://localhost:5678/api/works/${work.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "*/*",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              loadImages();
            } else {
              console.error("Erreur lors de la suppression de l'image");
            }
          });

          let squareDiv = document.createElement("div");
          squareDiv.classList.add("square");
          containerDiv.appendChild(squareDiv);
          containerDiv.appendChild(trashIcon);
          imgmoDiv.appendChild(containerDiv);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

document
  .querySelector(".work-container")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });

loadImages();

const form = document.getElementById("validate_form");
const image = document.getElementById("imageInput");
const title = document.getElementById("title");
const category = document.getElementById("category");
const selectedImage = document.getElementById("selectedImage");
const svgElement = document.querySelector(".le-svg");
const labelElement = document.querySelector(".ajouterFichierLabel");
const moMaxElement = document.querySelector(".mo_max");

// Récupère le fichier sélectionné
image.addEventListener("change", function (event) {
  const file = image.files[0];
  selectedImage.src = URL.createObjectURL(file);
  selectedImage.style.display = "block";
  svgElement.style.display = "none";
  labelElement.style.display = "none";
  moMaxElement.style.display = "none";
});

// Fonction pour mettre qu'il et selecte sur les categorie
async function updateCategoryDropdown() {
  const response = await fetch("http://localhost:5678/api/categories");
  const data = await response.json();

  data.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.name;
    category.appendChild(option);
  });
}

updateCategoryDropdown();

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Si je enst pas mi d'img ou titre sa mais une alerte
  if (!image.files[0]) {
    alert("Veuillez sélectionner une image.");
    return;
  }
  if (!title.value) {
    alert("Veuillez entrer un titre.");
    return;
  }
  if (!category.value) {
    alert("Veuillez sélectionner une catégorie.");
    return;
  }

  const formData = new FormData(form);
  formData.set("image", image.files[0]);

  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Ci ok alor sa mais a jour le loadImages
  if (response.status === 201) {
    loadImages();
  }
});
