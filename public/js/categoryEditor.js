const editCategoryForm = document.getElementById("newCat");
const cancelEditBtn = document.getElementById("cancel-button");
const categoryId = editCategoryForm.getAttribute("data-CategoryId");


// On page load
init();
editCategoryForm.addEventListener("submit", handlerCategorySubmit);
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.href = `/dashboard/${categoryId}`;
});


// Callback functions:

async function init() {
    const categoryResponse = await fetch(`/api/categories/${categoryId}`);
    const categoryData = await categoryResponse.json();

    editCategoryForm.querySelector("#emojiBox").value = categoryData.emoji;
    editCategoryForm.querySelector("#name").value = categoryData.name;

    // TODO: preselect the current color 
};

function handlerCategorySubmit() {
    //TODO: on submit, PUT to /categories/:id
}