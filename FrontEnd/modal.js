const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
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

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
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

document.getElementById("addFile").addEventListener("click", function () {
  document.getElementById("modal1").style.display = "none";

  document.getElementById("modal2").style.display = "block";
});
