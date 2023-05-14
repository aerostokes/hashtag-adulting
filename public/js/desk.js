const deskSection = document.getElementById("desk");

// On page load
deskSection.addEventListener("click", handlerStickyClick);


// Callback functions:

function handlerStickyClick(event) {
    if (event.target.matches("#sticky")) {
        if (deskSection.getAttribute("data-loggedIn") === "false") {
            location.href = "/signup";
        } else {
            const CategoryId = event.target.getAttribute("data-CategoryId");
            location.href = `/dashboard/${CategoryId}`;
        }
    } else if (event.target.matches("#addCategory")) {
        location.href = "/wizard";
    }
}