let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  showModal(target);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  hideModal(modal);
};

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

//pour l'api categorie
document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("category");

  var la_cat = new XMLHttpRequest();

  la_cat.open("GET", "http://localhost:5678/api/categories", true);
  la_cat.setRequestHeader("Content-type", "application/json");

  la_cat.onload = function () {
    if (la_cat.status >= 200 && la_cat.status < 300) {
      var categories = JSON.parse(la_cat.responseText);

      categories.forEach(function (category) {
        var option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
      });
    }
  };

  la_cat.send();
});
//pour afficher les img dans la modal avec les pubelle
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    var imgmoDiv = document.getElementById("imgmo");

    if (data.length > 0) {
      data.forEach((work) => {
        var imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;

        var containerDiv = document.createElement("div");
        containerDiv.classList.add("image-container");

        containerDiv.appendChild(imgElement);

        var trashIcon = document.createElement("ipoubel");
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
            imgmoDiv.removeChild(containerDiv);
          } else {
            console.error("Erreur lors de la suppression de l'image");
          }
        });

        var squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        containerDiv.appendChild(squareDiv);
        containerDiv.appendChild(trashIcon);

        imgmoDiv.appendChild(containerDiv);
      });
    }
  });

const image = document.getElementById("imageInput");
const title = document.getElementById("title");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const selectedImage = document.getElementById("selectedImage");
const svgElement = document.querySelector(".le-svg");
const labelElement = document.querySelector(".ajouterFichierLabel");
const moMaxElement = document.querySelector(".mo_max");

image.addEventListener("change", function (event) {
  const file = image.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;

      selectedImage.style.display = "block";

      svgElement.style.display = "none";
      labelElement.style.display = "none";
      moMaxElement.style.display = "none";
    };

    reader.readAsDataURL(file);
  }
});
