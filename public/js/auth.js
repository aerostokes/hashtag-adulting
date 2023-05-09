// login form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const userObj= {
        email:document.querySelector("#email").value,
        password:document.querySelector("#pass").value,
    }
    console.log(userObj)
})