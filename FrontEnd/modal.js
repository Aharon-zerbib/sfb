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

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("js-modal")) {
    openModal(e);
  }
});

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
      data.forEach((image) => {
        var imgElement = document.createElement("img");
        imgElement.src = image.imageUrl;
        imgElement.alt = image.title;
        imgmoDiv.appendChild(imgElement);
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

const returnToModal1 = function (e) {
  e.preventDefault();
  hideModal(document.getElementById("modal2"));
  showModal(document.getElementById("modal1"));
};
