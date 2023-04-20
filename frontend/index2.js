const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const emailErrorEl = document.getElementById("emailError");
const passwordErrorEl = document.getElementById("passwordError");
const errorLogEl = document.getElementById("errorLogin");

const btnEl = document.getElementById("btn");

btnEl.addEventListener("click", async (e) => {
  e.preventDefault();
  const userName = emailEl.value;
  const userPassword = passwordEl.value;
  const logincredentials = {
    email: userName,
    password: userPassword,
  };
  console.log(logincredentials);

  if (userName === "" || userPassword === "") {
    emailErrorEl.innerHTML = "Please enter username";
    passwordErrorEl.innerHTML = "Please enter password";
  } else {
    const response = await fetch(`http://localhost:8080/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logincredentials),
    });

    const data = await response.json();
    

    if (data.status) {
      window.location.href = "dashboard.html";
      sessionStorage.setItem('isUserLoggedIn', true)
      
    } else {
      errorLogEl.innerHTML = data.message;
    }
  }
});
