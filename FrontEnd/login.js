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
    let errorMessage;

    if (error.message === "L'adresse email saisie est invalide.") {
    }
    {
      errorMessage = "Mot de passe incorrect. Veuillez réessayer.";
      showAlert(errorMessage, "orange");
    }
  }
}

function showAlert(message, color = "gray") {
  const alertDiv = document.createElement("div");
  alertDiv.style.backgroundColor = color;
  alertDiv.style.padding = "10px";
  alertDiv.style.margin = "10px";
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "0";
  alertDiv.style.right = "0";
  alertDiv.style.width = "100%";
  alertDiv.style.textAlign = "center";
  alertDiv.innerText = message;

  document.body.appendChild(alertDiv);

  //c pour que sa se bar apres 5 scond demande a openIA (-_-)
  setTimeout(() => {
    document.body.removeChild(alertDiv);
  }, 5000);
}
function toggleButtonVisibility() {
  const btnProj = document.querySelector(".btn_projects");
  const btnEditMode = document.getElementById("btn_edit_mode");
  const logoutLink = document.getElementById("logout");
  const loginLink = document.getElementById("login");

  const token = localStorage.getItem("token");

  if (btnProj) {
    btnProj.style.display = token ? "inline" : "none";
  }

  if (btnEditMode) {
    btnEditMode.style.display = token ? "hiden" : "none";
  }

  if (logoutLink) {
    logoutLink.style.display = token ? "inline" : "none";
  }

  if (loginLink) {
    loginLink.style.display = token ? "none" : "inline";
  }
}

function logout() {
  localStorage.removeItem("token");
  toggleButtonVisibility();
  window.location.href = "login.html";
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

function toggleEditMode() {
  console.log("Mode édition activé !");
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.querySelector(".form");
  const logoutLink = document.getElementById("logout");
  const btnEditMode = document.getElementById("btn_edit_mode");

  if (submitForm) {
    submitForm.addEventListener("submit", submit);
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", logout);
  }

  if (btnEditMode) {
    btnEditMode.addEventListener("click", toggleEditMode);
  }

  toggleButtonVisibility();
});
