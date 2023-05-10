const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("Sign Up",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#signup-email").value,
        password:document.querySelector("#signup-password").value,
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
            alert("Invalid sign up")
        }
    })
})