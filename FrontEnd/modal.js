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
/*fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    var imgmoDiv = document.getElementById("imgmo");
    if (data.length > 0) {
      data.forEach((image) => {
        var imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;
        imgmoDiv.appendChild(imgElement);
      });
    }
  });
 */
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    var imgmoDiv = document.getElementById("imgmo");

    var savedData = JSON.parse(localStorage.getItem("savedData")) || {};

    if (data.length > 0) {
      data.forEach((image) => {
        var imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;

        var containerDiv = document.createElement("div");
        containerDiv.classList.add("image-container");

        containerDiv.appendChild(imgElement);

        var trashIcon = document.createElement("i");
        trashIcon.classList.add("fa", "fa-solid", "fa-trash-can");
        trashIcon.title = "Cliquez pour supprimer l'image";

        trashIcon.addEventListener("click", function () {
          var updatedData = data.filter((item) => item.title !== image.title);

          savedData.images = updatedData;
          localStorage.setItem("savedData", JSON.stringify(savedData));

          containerDiv.remove();
        });

        containerDiv.appendChild(trashIcon);

        imgmoDiv.appendChild(containerDiv);
      });
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

//pour le ajout photo
function handleImageSelect(event) {
  const fileInput = event.target;
  const selectedImage = document.getElementById("selectedImage");
  const submitButton = document.getElementById("submit");

  const svg = document.querySelector(".le-svg");
  const mo_max = document.querySelector(".mo_max");
  const ajouterFichierLabel = document.querySelector(".ajouterFichierLabel");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
      selectedImage.style.display = "block";

      svg.style.display = "none";
      ajouterFichierLabel.style.display = "none";
      mo_max.style.display = "none";

      submitButton.removeAttribute("disabled");
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

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
