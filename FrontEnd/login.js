/*let login = [];
function fetchLogin() {
  const post = fetch("http://localhost:5678/api/users/login", {
    METHOD: "POST",
    body: JSON.stringify(data),
  });

  return post.json();
}

export { fetchLogin, login };
*/
async function fetchPost(url, formData) {
  const data = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: data,
  });

  try {
    if (response.status === 404) throw "L'adresse email saisie est invalide.";
    if (response.status === 401)
      throw "Le mot de passe que vous avez indiqué n'est pas reconnu.";
    return response.json();
  } catch (error) {
    alert("Erreur: " + error);
  }
}

async function submit(e) {
  e.preventDefault();
  const url = "http://localhost:5678/api/users/login";

  try {
    const responseData = await fetchPost(url, new FormData(submitBtn));
    localStorage.setItem("token", responseData.token);
    window.location.href = "index.html";
  } catch (err) {
    console.log("Erreur: " + err);
  }
}

const submitBtn = document.querySelector(".form");
submitBtn.addEventListener("submit", submit);
