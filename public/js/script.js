// Login Form
const signupForm = document.querySelector("#login-form");
signupForm.addEventListener("Login",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#login-email").value,
        password:document.querySelector("#login-password").value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("trumpet sound")
        }
    })
})