const editCategoryForm = document.getElementById("newCat");
const cancelEditBtn = document.getElementById("cancel-button");
const deleteBtn = document.getElementById("deleteBtn");
const categoryId = editCategoryForm.getAttribute("data-CategoryId");
const emojiInput = editCategoryForm.querySelector("#emojiBox");
const nameInput = editCategoryForm.querySelector("#name");

// On page load
init();
editCategoryForm.addEventListener("submit", handlerCategorySubmit);
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `/dashboard/${categoryId}`;
});
deleteBtn.addEventListener("click", handlerCategoryDelete);


// Callback functions:

// Populate the category form from the database
async function init() {
    const categoryResponse = await fetch(`/api/categories/${categoryId}`);
    const categoryData = await categoryResponse.json();

    emojiInput.value = categoryData.emoji;
    nameInput.value = categoryData.name;

    const priorColor = categoryData.color;
    document.getElementById(priorColor).checked = true;
};

// On submit, PUT to /categories/:id
async function handlerCategorySubmit(e) {
    try {
        e.preventDefault();
        const editCategoryObj = {
            name: nameInput.value ,
            emoji: emojiInput.value,
            color: editCategoryForm.querySelector("input[name='color']:checked").value,
        }
        const res = await fetch(`/api/categories/${categoryId}`, {
            method: "PUT", 
            body: JSON.stringify(editCategoryObj),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            location.href = `/dashboard/${categoryId}`
        } else {
            alert("Error Occured, try again");
            const data = await res.json()
            console.log(data);
        };
    } catch(err) {
        alert("Error Occured, try again");
        console.log(err);
    };
};

async function handlerCategoryDelete(e) {
    try {
        e.preventDefault();
        const res = await fetch(`/api/categories/${categoryId}`, {
            method: "DELETE", 
            headers: {
            "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            location.href = "/dashboard";
        } else {
            alert("Error Occured, try again");
            console.log(res);
        }   
    } catch(err) {
        alert("Error Occured, try again");
        console.log(err);
    };
};