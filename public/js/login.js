// Login Form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#login-email").value.trim(),
        password:document.querySelector("#login-password").value.trim(),
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("Invalid email or password! Try again.")
        }
    })
})
