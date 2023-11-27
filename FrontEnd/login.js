async function fetchPost(url, formData) {
  const data = JSON.stringify(Object.fromEntries(formData.entries()));

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });

    if (response.status === 404) {
      throw new Error("L'adresse email saisie est invalide.");
    }

    if (response.status === 401) {
      throw new Error(
        "Le mot de passe que vous avez indiqué n'est pas reconnu."
      );
    }

    return response.json();
  } catch (error) {
    alert("Erreur: " + error.message);
  }
}

function toggleButtonVisibility() {
  const btnProj = document.querySelector(".btn_projects");

  if (btnProj) {
    const token = localStorage.getItem("token");

    if (token) {
      btnProj.style.display = "inline";
    } else {
      btnProj.style.display = "none";
    }
  }
}

async function submit(e) {
  e.preventDefault();
  const url = "http://localhost:5678/api/users/login";
  const submitForm = document.querySelector(".form");

  try {
    const responseData = await fetchPost(url, new FormData(submitForm));

    if (responseData.token) {
      localStorage.setItem("token", responseData.token);
      toggleButtonVisibility();
      window.location.href = "index.html";
    } else {
      console.log("Erreur: Aucun token trouvé dans la réponse.");
    }
  } catch (err) {
    console.log("Erreur: " + err.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.querySelector(".form");
  if (submitForm) {
    submitForm.addEventListener("submit", submit);
  }

  toggleButtonVisibility();
});
