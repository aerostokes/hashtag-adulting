const addCategorySticky = document.getElementById("addCategory" );
const chalkboard = document.getElementById("nextTasks");
const bigStickyHead = document.getElementById("stickHead");
const bigStickyOl = document.getElementById("remindList");
const addTaskBtn = document.getElementById("addTask");

// On page load
addCategorySticky.addEventListener("click", handlerAddCategoryClick);
bigStickyHead.addEventListener("click", handlerBigStickyClickCategory);
bigStickyOl.addEventListener("click", handlerBigStickyClickTask);
addTaskBtn.addEventListener("click", handlerAddTaskBtnClick);
chalkboard.addEventListener("click", handlerChalkboardClick);



// Callback functions:

function handlerAddCategoryClick() {
    location.href = "/wizard"
}

function handlerBigStickyClickCategory(event) {
    const CategoryId = event.target.getAttribute("data-CategoryId")
    location.href = `/category-editor/${CategoryId}`
};

function handlerBigStickyClickTask(event) {
    const reminderId = event.target.getAttribute("data-ReminderId");
    if (event.target.matches(".checkTask")) {
        markTaskComplete(reminderId);
    } else if (event.target.matches("li.reminders")) {
        editTask(event.target);
    }
};

async function markTaskComplete(reminderId) {
    try {
        const reminderResponse = await fetch(`/api/reminders/${reminderId}`);
        const reminderData = await reminderResponse.json();
        let res;

        // If the task is not recurring, than delete the database entry.
        if (!reminderData.isRecurring) {
            res = await fetch(`/api/reminders/${reminderId}`, {
                method: "DELETE", 
                headers: {
                "Content-Type": "application/json",
                },
            });
        // If it is recurring, update the Reminder entry to lastDone = today, and nextDue based on the stored time period. 
        } else {
            const newReminderObj = {
                id: reminderId,
                lastDone: dayjs().format("YYYY-MM-DD"),
                nextDue: dayjs().add(reminderData.numPeriods,reminderData.timePeriod).format("YYYY-MM-DD"),
            };
            res = await fetch(`/api/reminders/${reminderId}`, {
                method: "PUT", 
                body: JSON.stringify(newReminderObj),
                headers: {
                "Content-Type": "application/json",
                },
            });
        }
        if (res.ok) {
            location.reload();
        } else {
            alert("Error Occured, try again");
            console.log(res);
        }   
    } catch(err) {
        alert("Error Occured, try again");
        console.log(err);
    }
};

async function editTask(taskLi) {
    try {
        addTaskBtn.setAttribute("hidden", "hidden")

        const reminderId = taskLi.getAttribute("data-ReminderId");
        const reminderResponse = await fetch(`/api/reminders/${reminderId}`);
        const reminderData = await reminderResponse.json();

        const editTaskForm = createForm(reminderData.isRecurring);
        if (editTaskForm) {
            taskLi.textContent = ""
            editTaskForm.querySelector("#task").value = reminderData.task;
            editTaskForm.querySelector("#lastDone").value = reminderData.lastDone;
            editTaskForm.querySelector("#isRecurring").checked = reminderData.isRecurring;
            editTaskForm.querySelector("#numPeriods").value = reminderData.numPeriods;
            editTaskForm.querySelector("#timePeriod").value = reminderData.timePeriod;
            editTaskForm.querySelector("#nextDue").value = reminderData.nextDue;
            editTaskForm.querySelector("#note").value = reminderData.note;

            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("style", "color:red")
            deleteBtn.textContent = "delete";
            editTaskForm.append(deleteBtn);
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                deleteReminder(reminderId);
            });

            taskLi.append(editTaskForm);
            
            editTaskForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const editReminderObj = {
                    task: editTaskForm.querySelector("#task").value.trim(),
                    isRecurring: editTaskForm.querySelector("#isRecurring").checked,
                    nextDue: editTaskForm.querySelector("#nextDue").value,
                };
                if (editTaskForm.querySelector("#lastDone").value) {
                    editReminderObj.lastDone = editTaskForm.querySelector("#lastDone").value;
                } else {
                    editReminderObj.lastDone = null;
                };
                if (editTaskForm.querySelector("#numPeriods").value) {
                    editReminderObj.numPeriods = editTaskForm.querySelector("#numPeriods").value;
                    editReminderObj.timePeriod = editTaskForm.querySelector("#timePeriod").value;
                } else {
                    editReminderObj.numPeriods = null;
                    editReminderObj.timePeriod = null;
                };
                if (editTaskForm.querySelector("#note").value) {
                    editReminderObj.note = editTaskForm.querySelector("#note").value;
                } else {
                    editReminderObj.note = null;
                };
                
                const res = await fetch(`/api/reminders/${reminderId}`, {
                    method: "PUT", 
                    body: JSON.stringify(editReminderObj),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    location.reload();
                } else {
                    alert("Error Occured, try again");
                    const data = await res.json()
                    console.log(data);
                };
            });
        };
    } catch(err) {
        alert("Error Occured, try again");
        console.log(err);
    };
};


function handlerAddTaskBtnClick() {
    addTaskBtn.setAttribute("hidden", "hidden")
    const categoryId = document.getElementById("biggerSticky").getAttribute("data-CategoryId");

    const newTaskForm = createForm();
    bigStickyOl.append(newTaskForm);

    newTaskForm.addEventListener("submit", e => {
        e.preventDefault();
        const newReminderObj = {
            task: newTaskForm.querySelector("#task").value.trim(),
            isRecurring: newTaskForm.querySelector("#isRecurring").checked,
            nextDue: newTaskForm.querySelector("#nextDue").value,
            CategoryId: categoryId,
        };
        if (newTaskForm.querySelector("#lastDone").value) {
            newReminderObj.lastDone = newTaskForm.querySelector("#lastDone").value;
        };
        if (newTaskForm.querySelector("#numPeriods").value) {
            newReminderObj.numPeriods = newTaskForm.querySelector("#numPeriods").value;
            newReminderObj.timePeriod = newTaskForm.querySelector("#timePeriod").value;
        };
        if (newTaskForm.querySelector("#note").value) {
            newReminderObj.note = newTaskForm.querySelector("#note").value;
        };

        fetch("/api/reminders", {
            method: "POST", 
            body: JSON.stringify(newReminderObj),
            headers: {
              "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("Error Occured, try again");
                res.json().then(data => console.log(data))
            };
        });
    });
};

function handlerChalkboardClick() {
    //TODO
    // <input type="date" id="date" style="color-scheme:dark">

};

function createForm(isRecurring=true) {
    if (document.getElementById("addEditForm")) { return };
    const formEl = document.createElement("form");
    formEl.setAttribute("id","addEditForm");
    formEl.setAttribute("style", "position:relative; width:100%");

    const firstRowDiv = document.createElement("div");
    firstRowDiv.setAttribute("style", "display:flex; flex-direction: row; justify-content: space-between; margin-top: 20px; width:50%;");
    formEl.append(firstRowDiv);
    
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("style", "display:inline-block; width:30%;");
    firstRowDiv.append(taskDiv);
// added label for task
    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", "task");
    taskLabel.setAttribute("style", "display:block;");
    taskLabel.textContent = "*Task:";
    taskDiv.append(taskLabel); // Append label to taskDiv before input element
    
    const taskInput = document.createElement("input");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("id", "task");
    taskInput.setAttribute("style", "display:block; width: 100%;");
    taskInput.setAttribute("placeholder", "Add Task");
    taskInput.setAttribute("required", "required");
    taskDiv.append(taskInput);

        const lastDoneDiv = document.createElement("div");
        lastDoneDiv.setAttribute("style", "display:inline-block");
        firstRowDiv.append(lastDoneDiv);
            const lastDoneLabel = document.createElement("label");
            lastDoneLabel.setAttribute("for", "lastDone");
            lastDoneLabel.setAttribute("style", "display:block");
            lastDoneLabel.textContent = "Last Done:";
            lastDoneDiv.append(lastDoneLabel);

            const lastDoneInput = document.createElement("input");
            lastDoneInput.setAttribute("type", "date");
            lastDoneInput.setAttribute("id", "lastDone");
            lastDoneInput.setAttribute("style", "display:block; width:140px");
            lastDoneDiv.append(lastDoneInput);
    
    const secondRowDiv = document.createElement("div");
    secondRowDiv.setAttribute("style", "display:flex; flex-direction: column; margin-top: 10px; width:100%;");
    formEl.append(secondRowDiv);
        const recurringDiv = document.createElement("div");
        recurringDiv.setAttribute('id','recurring_checkbox')
        recurringDiv. setAttribute("style", "display:flex; flex-direction: row; align-self:center ;width: 78%;");
        secondRowDiv.append(recurringDiv);
        const isRecurringLabel = document.createElement("label");
        isRecurringLabel.setAttribute("for", "isRecurring");
        isRecurringLabel.setAttribute("style", "display:block; margin-right:10px;");
        isRecurringLabel.textContent = "Is this a Recurring Event?";
        recurringDiv.append(isRecurringLabel);

            const isRecurringInput = document.createElement("input");
            isRecurringInput.setAttribute("type", "checkbox");
            isRecurringInput.setAttribute("id", "isRecurring");
            isRecurringInput.setAttribute("style", "display:block; height: 20px; width: 20px;");
            recurringDiv.append(isRecurringInput);


        const numPeriodsDiv = document.createElement("div");
        const scheduleDiv = document.createElement('div')
        scheduleDiv.setAttribute('style','display:flex; flex-direction: row; justify-content:space-between;width:50%; margin-top:20px;')
        secondRowDiv.append(scheduleDiv)
        scheduleDiv.append(numPeriodsDiv);
            const numPeriodsLabel = document.createElement("label");
            numPeriodsLabel.setAttribute("for", "numPeriods");
            numPeriodsLabel.setAttribute('style','display:block;')
            numPeriodsLabel.textContent = "*Every:";
            numPeriodsDiv.append(numPeriodsLabel);

            const numPeriodsInput = document.createElement("input");
            numPeriodsInput.setAttribute("type", "number");
            numPeriodsInput.setAttribute("id", "numPeriods");
            numPeriodsInput.setAttribute("style", "display: flex;  justify-content: center; width:60px");
            numPeriodsInput.setAttribute("placeholder", "Num");
            numPeriodsDiv.append(numPeriodsInput);

        const timePeriodDiv = document.createElement("div");
        scheduleDiv.append(timePeriodDiv);
// added label for timePeriod
        const timePeriodLabel = document.createElement("label");
        timePeriodLabel.setAttribute("for", "timePeriod");
        timePeriodLabel.setAttribute("style", "display:block");
        timePeriodLabel.textContent = "*Time Interval:";
        timePeriodDiv.append(timePeriodLabel);

            const timePeriodSelect = document.createElement("select");
            timePeriodSelect.setAttribute("id", "timePeriod");
            timePeriodSelect.setAttribute("style", "display:block; width: 6rem;");
            const opt1 = document.createElement("option");
            const opt2 = document.createElement("option");
            const opt3 = document.createElement("option");
            const opt4 = document.createElement("option");
            opt1.value = "day";
            opt1.text = "day";
            opt2.value = "week";
            opt2.text = "week";
            opt3.value = "month";
            opt3.text = "month";
            opt3.setAttribute("selected", "selected");
            opt4.value = "year";
            opt4.text = "year";
            timePeriodSelect.add(opt1);
            timePeriodSelect.add(opt2);
            timePeriodSelect.add(opt3);
            timePeriodSelect.add(opt4);
            timePeriodDiv.append(timePeriodSelect);

        // Add event listener to hide/show/require the numPeriods and timePeriod fields based on the isRecurring checkbox
        isRecurringInput.addEventListener("click", () => {
            if (isRecurringInput.checked) {
                numPeriodsDiv.setAttribute("style", "display:inline-block");
                timePeriodDiv.setAttribute("style", "display:inline-block");
                numPeriodsInput.setAttribute("required", "required");
                timePeriodSelect.setAttribute("required", "required");
            } else {
                numPeriodsDiv.setAttribute("style", "display:none");
                timePeriodDiv.setAttribute("style", "display:none");
                numPeriodsInput.removeAttribute("required");
                timePeriodSelect.removeAttribute("required");
            };
        });
        // Initiate with !isRecurring argument and then immediately click to trigger to isRecurring
        isRecurringInput.checked = !isRecurring;
        isRecurringInput.click();

        const nextDueDiv = document.createElement("div");
        nextDueDiv.setAttribute("id", "timePeriodDiv");
        nextDueDiv.setAttribute("style", "display:inline-block");
        scheduleDiv.append(nextDueDiv);
            const nextDueLabel = document.createElement("label");
            nextDueLabel.setAttribute("for", "nextDue");
            nextDueLabel.setAttribute("style", "display:block");
            nextDueLabel.textContent = "*Next Due:";
            nextDueDiv.append(nextDueLabel);

            const nextDueInput = document.createElement("input");
            nextDueInput.setAttribute("type", "date");
            nextDueInput.setAttribute("id", "nextDue");
            nextDueInput.setAttribute("style", "display:block; width:120px");
            nextDueInput.setAttribute("required", "required");
            nextDueDiv.append(nextDueInput);

            lastDoneInput.addEventListener("change", () => {
                if (numPeriodsInput.value && lastDoneInput.value) {
                    nextDueInput.value = dayjs(lastDoneInput.value).add(numPeriodsInput.value, timePeriodSelect.value).format("YYYY-MM-DD");
                };
            });
            numPeriodsInput.addEventListener("change", () => {
                if (numPeriodsInput.value && lastDoneInput.value) {
                    nextDueInput.value = dayjs(lastDoneInput.value).add(numPeriodsInput.value, timePeriodSelect.value).format("YYYY-MM-DD");
                };
            });
            timePeriodSelect.addEventListener("change", () => {
                if (numPeriodsInput.value && lastDoneInput.value) {
                    nextDueInput.value = dayjs(lastDoneInput.value).add(numPeriodsInput.value, timePeriodSelect.value).format("YYYY-MM-DD");
                };
            });
// added label for notes
        const noteDiv = document.createElement('div')
        noteDiv.setAttribute('style','margin-top: 20px')
        secondRowDiv.append(noteDiv)
        const noteLabel = document.createElement("label");
        noteLabel.setAttribute("for", "note");
        noteLabel.setAttribute("style", "display:block");
        noteLabel.textContent = "Notes:";
        noteDiv.append(noteLabel);

        const noteInput = document.createElement("input");
        noteInput.setAttribute("type", "text");
        noteInput.setAttribute("id", "note");
        noteInput.setAttribute("style", "display:inline-block; height: 3rem; width:50%");
        noteInput.setAttribute("placeholder", "Add note");
        noteDiv.append(noteInput);

    const saveCancelDiv = document.createElement('div')
    saveCancelDiv.setAttribute('style','display:flex; flex-direction:row; justify-content: space-around; width:50%;')
    formEl.append(saveCancelDiv);
    const saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "submit")
    saveBtn.textContent = "Save";
    saveCancelDiv.append(saveBtn)

    
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    saveCancelDiv.append(cancelBtn);
    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload()
    });

    return formEl;
};

async function deleteReminder(reminderId) {
    try {
        const res = await fetch(`/api/reminders/${reminderId}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            location.reload();
        } else {
            alert("Error Occured, try again");
            console.log(res);
        }   
    } catch(err) {
        alert("Error Occured, try again");
        console.log(err);
    };
};
