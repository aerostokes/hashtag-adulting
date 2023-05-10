const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("Sign Up",e=>{
    e.preventDefault();
    const password = document.querySelector("#signup-password").value.trim
    const passwordconfirm = document.querySelector("#signup-password-confirmation").value.trim
    if (password === passwordconfirm){
        alert("Your password doesn't match!")
    } else {
    const userObj = {
        email:document.querySelector("#signup-email").value.trim,
        password:document.querySelector("#signup-password").value.trim,
        passwordconfirm:document.querySelector("#signup-password-confirmation").value.trim
    }
    fetch("/api/users",{
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
}
})