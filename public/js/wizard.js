const templateCategorySection = document.getElementById("categoryArr");
const firstTemplateCategory = templateCategorySection.querySelector(".checkCircle");
const bigStickyAside = document.getElementById("biggerSticky")
const bigStickyHeader = document.getElementById("stickHead");
const bigStickyUl = document.getElementById("remindList");
const saveButton = document.getElementById("save");
const cancelButton = document.getElementById("cancel");

// On page load
templateCategorySection.addEventListener("click", handlerTemplateClick);
saveButton.addEventListener("click", handlerSaveCategories);
cancelButton.addEventListener("click", handlerCancelWizard);
populateBigSticky(firstTemplateCategory.getAttribute("data-templateCategoryId"));

// Callback functions:

function handlerTemplateClick(event) {
    if (event.target.matches(".checkCircle")) {
        const templateCategoryId = event.target.getAttribute("data-templateCategoryId");
        populateBigSticky(templateCategoryId);
    };
};

function populateBigSticky(templateCategoryId) {
    fetch(`/api/templates/${templateCategoryId}`).then(res => res.json()).then(data => {
        bigStickyAside.setAttribute("class", data.color)
        bigStickyHeader.innerHTML = "";
        const nameEl = document.createElement("h4");
        const emojiEl = document.createElement("h4");

        nameEl.classList.add("bigStickyTitle");
        emojiEl.setAttribute("id", "emoji1")

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

function handlerSaveCategories() {
    // for each checked template on the page, fetch the TemplateCategory data from the server
    const checkedTemplatesArr = document.querySelectorAll("input:checked");
    checkedTemplatesArr.forEach(async checkedTemplateObj => {
        const templateCategoryId = checkedTemplateObj.getAttribute("data-templateCategoryId");
        const templateCategoryResponse = await fetch(`/api/templates/${templateCategoryId}`);
        const templateCategoryData = await templateCategoryResponse.json();
        
        // Post the data from TemplateCategory as a new Category for the current user
        newCategoryObj = {
            name: templateCategoryData.name,
            emoji: templateCategoryData.emoji,
            color: templateCategoryData.color,
        }
        const resCategory = await fetch("api/categories", {
            method: "POST", 
            body: JSON.stringify(newCategoryObj),
            headers: {
              "Content-Type": "application/json",
            },
        });
        if (!resCategory.ok) { return alert("Error Occured, try again!")}
        const dataCategory = await resCategory.json();
        newCategoryId = dataCategory.category.id;

        // for each TemplateReminder in TemplateCategory, post as a new Reminder for the current user
        templateCategoryData.TemplateReminders.forEach(async templateReminderObj => {
            newReminderObj = {
                task: templateReminderObj.task,
                isRecurring: templateReminderObj.isRecurring,
                numPeriods: templateReminderObj.numPeriods,
                timePeriod: templateReminderObj.timePeriod,
                nextDue: new Date(),
                CategoryId: newCategoryId,
            }
            console.log(newReminderObj);
            const resReminder = await fetch("api/reminders", {
                method: "POST", 
                body: JSON.stringify(newReminderObj),
                headers: {
                  "Content-Type": "application/json",
                },
            });
            if (!resReminder.ok) { return alert("Error Occured, try again!")}
            location.href = "/dashboard"
        });
    });
};

function handlerCancelWizard() {
    location.href = "/dashboard"
}