/*let login = [];
function fetchLogin() {
  const post = fetch("http://localhost:5678/api/users/login", {
    METHOD: "POST",
    body: JSON.stringify(data),
  });

  return post.json();
}

export { fetchLogin, login };
*/ async function fetchPost(url, data) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, fetchOptions);

  return response.json();
}

async function submit(e) {
  e.preventDefault();
  const url = "http://localhost:5678/api/users/login";

  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const data = {
    email: email,
    password: password,
  };

  fetchPost(url, data).then((responseData) => {
    localStorage.setItem("token", responseData.token);
    window.location.href = "index.html";
  });
}

const submitBtn = document.querySelector(".form");

submitBtn.addEventListener("submit", submit);
