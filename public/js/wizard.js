const templateCategorySection = document.getElementById("categoryArr");
const firstTemplateCategory = templateCategorySection.querySelector(".checkbox");
const bigStickyHeader = document.getElementById("stickHead");
const bigStickyUl = document.getElementById("remindList");

// On page load
templateCategorySection.addEventListener("click", handlerTemplateClick);
populateBigSticky(firstTemplateCategory.getAttribute("data-templateCategoryId"));

// Callback functions:

function handlerTemplateClick(event) {
    if (event.target.matches(".checkbox")) {
        const templateCategoryId = event.target.getAttribute("data-templateCategoryId");
        populateBigSticky(templateCategoryId);
    };
};

function populateBigSticky(templateCategoryId) {
    fetch(`/api/templates/${templateCategoryId}`).then(res => res.json()).then(data => {
        bigStickyHeader.innerHTML = "";
        const nameEl = document.createElement("h4");
        const emojiEl = document.createElement("h4");

        nameEl.classList.add("bigStickyTitle");
        emojiEl.setAttribute("id", "emoji")

        nameEl.textContent = data.name;
        emojiEl.textContent = data.emoji;

        bigStickyHeader.append(nameEl);
        bigStickyHeader.append(emojiEl);

        bigStickyUl.innerHTML = "";
        data.TemplateReminders.forEach(templateReminder => {
            const taskLi = document.createElement("li");
            taskLi.classList.add("reminders");
            taskLi.innerHTML = `${templateReminder.task}  <i>every ${templateReminder.numPeriods} ${templateReminder.timePeriod}</i>`;
            bigStickyUl.append(taskLi);
        });
    })
};