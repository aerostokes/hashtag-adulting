const deskSection = document.getElementById("desk");

// On page load
deskSection.addEventListener("click", handlerStickyClick);


// Callback functions:

function handlerStickyClick(event) {
    if (event.target.matches("#sticky")) {
        if (deskSection.getAttribute("data-loggedIn") === "false") {
            window.location.assign("/signup");
        } else {
            const CategoryId = event.target.getAttribute("data-CategoryId");
            window.location.assign(`/dashboard/${CategoryId}`);
        }
    } else if (event.target.matches("#addCategory")) {
        window.location.assign("/wizard");
    }
}