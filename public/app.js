const loginAsAppGyverBtn = document.querySelector("#login-appgyver");
const loginAsRomanBtn = document.querySelector("#login-roman");
const loginAsSwastikBtn = document.querySelector("#login-swastik");
const adminBtn = document.querySelector("#admin");
const responses = document.querySelector("#responses");

loginAsAppGyverBtn.addEventListener("click", () => {
  login("APPGYVER");
});

loginAsRomanBtn.addEventListener("click", () => {
  login("Roman");
});

loginAsSwastikBtn.addEventListener("click", () => {
  login("Swastik");
});

adminBtn.addEventListener("click", () => {
  fetch("http://127.0.0.1:8080/adminData", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.text())
    .then((data) => (responses.textContent = data));
});

function login(username) {
  fetch("http://127.0.0.1:8080/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .then((res) => res.text())
    .then((data) => (responses.textContent = data));
}
