/* la je fait les deux modal-box a voir comment faire pour metre 
les deux il faudrra faire aussi le truc pour upload une photo en 4mo */
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

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:5678/api/works", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      var imgmoDiv = document.getElementById("imgmo");
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var image = data[i];
          var imgElement = document.createElement("img");
          imgElement.src = image.imageUrl;
          imgElement.alt = image.title;
          imgmoDiv.appendChild(imgElement);
        }
      }
    }
  }
};
xhr.send();
