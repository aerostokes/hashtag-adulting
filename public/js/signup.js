const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const password = document.querySelector("#signup-password").value.trim()
    const passwordconfirm = document.querySelector("#signup-password-confirmation").value.trim()
    if (password !== passwordconfirm){
        alert("Passwords don't match!");
    } else {
        const userObj = {
            email:document.querySelector("#signup-email").value.trim(),
            password,
        }
        fetch("/api/users",{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok) {
                location.href = "/dashboard"
            } else {
                alert("Invalid sign up, try again.")
            }
        })
    }
})