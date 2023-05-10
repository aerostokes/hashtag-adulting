// signup form
const loginForm = document.querySelector("#signup-form");
loginForm.addEventListener("Submit", e=>{
    e.preventDefault();
    const userObj= {
        email:document.querySelector("#email").value,
        password:document.querySelector("#pass").value,
    }
    fetch("/api/users/",{
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

