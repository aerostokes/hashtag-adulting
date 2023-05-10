const deskSection = document.getElementById("desk");

// On page load
deskSection.addEventListener("click", handlerStickyClick);


// Callback functions:

function handlerStickyClick(event) {
    if (event.target.matches("#sticky")) {
        console.log(deskSection.getAttribute("data-loggedIn"));
        if (deskSection.getAttribute("data-loggedIn") === "false") {
            window.location.assign("/signup");
        } else {
            // TODO: clicking on sticky when logged in
            console.log("TODO: finish this script");
        }
    }
}