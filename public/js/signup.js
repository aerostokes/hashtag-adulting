const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("Sign Up",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#signup-email").value.trim,
        password:document.querySelector("#signup-password").value.trim,
        passwordconfirm:document.querySelector("#signup-password-confirmation").value.trim
    }
    fetch("/signup",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            alert("Invalid sign up")
        }
    })
})