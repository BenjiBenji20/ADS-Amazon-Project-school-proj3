const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const mainContainer = document.querySelector(".container");

signupBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});
signinBtn.addEventListener("click", () => {
  mainContainer.classList.toggle("change");
});


// Error message
const signInErrorMessageElement = document.querySelector('.error-message');

// remove the error message after 2sec
setTimeout(() => {
  signInErrorMessageElement.style.opacity = "0";
  signInErrorMessageElement.style.transition = "opacity 0.3s";
}, 2000);