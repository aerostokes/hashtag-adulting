const chalkboard = document.getElementById("nextTasks");
const bigStickyOl = document.getElementById("remindList")
const addTaskBtn = document.getElementById("addTask")

// On page load
chalkboard.addEventListener("click", handlerChalkboardClick);
addTaskBtn.addEventListener("click", handlerAddTaskBtnClick);
bigStickyOl.addEventListener("click", handlerBigStickClick)


function handlerChalkboardClick() {
    // <input type="date" id="date" style="color-scheme:dark">
    // const deleteBtn = document.createElement("button");
    // deleteBtn.setAttribute("style", "color:red")
    // deleteBtn.textContent = "DELETE";
    // formEl.append(deleteBtn)
    // deleteBtn.addEventListener("click", () => {
    //     // fetch("/api/reminders/")
    // });
};

function handlerAddTaskBtnClick() {
    addTaskBtn.setAttribute("hidden", "hidden")
    const categoryId = document.getElementById("biggerSticky").getAttribute("data-CategoryId");

    const newTaskForm = createForm();
    bigStickyOl.append(newTaskForm);

    newTaskForm.addEventListener("submit", e => {
        e.preventDefault();
        const nextDue = newTaskForm.querySelector("#nextDue").value.trim();

        const newReminderObj = {
            task: newTaskForm.querySelector("#task").value.trim(),
            lastDone: newTaskForm.querySelector("#lastDone").value,
            isRecurring: newTaskForm.querySelector("#isRecurring").checked,
            numPeriods: newTaskForm.querySelector("#numPeriods").value,
            timePeriod: newTaskForm.querySelector("#timePeriod").value,
            nextDue: newTaskForm.querySelector("#nextDue").value,
            note: newTaskForm.querySelector("#note").value,
            CategoryId: categoryId,
        };
        
        console.log(newReminderObj);
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
                res.json().then(data => {

                    console.log(data);
                })
            };
        });
    });
    //     saveBtn.addEventListener("click", e => {
    //     e.preventDefault();
    //     newReminderObj = {
    //         task: taskInput.value.trim(),
    //         lastDone: lastDoneInput.value,
    //         isRecurring: isRecurringInput.checked,
    //         numPeriods: numPeriodsInput.value,
    //         timePeriod: timePeriodSelect.value,
    //         nextDue: nextDueInput.value,
    //         note: noteInput.value,
    //         CategoryId: categoryId
    //     }
    //     fetch("/api/reminders", {
    //         method: "POST", 
    //         body: JSON.stringify(newReminderObj),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //     }).then(res => {
    //         if (res.ok) {
    //             location.reload();
    //         } else {
    //             alert("Error Occured, try again");
    //         };
    //     });
    // });





    // const categoryId = document.getElementById("biggerSticky").getAttribute("data-CategoryId");
    // const formEl = document.createElement("form");
    // bigStickyOl.append(formEl)

    // const taskInput = document.createElement("input")
    // taskInput.setAttribute("type", "text");
    // taskInput.setAttribute("id", "task");
    // taskInput.setAttribute("placeholder", "Task")
    // taskInput.setAttribute("style", "width: 60%")
    // formEl.append(taskInput)


    // const isRecurringInput = document.createElement("input")
    // isRecurringInput.setAttribute("type", "checkbox");
    // isRecurringInput.setAttribute("id", "isRecurring");
    // isRecurringInput.checked = true;
    // formEl.append(isRecurringInput)
    // const isRecurringLabel = document.createElement("label")
    // isRecurringLabel.setAttribute("for", "isRecurring");
    // isRecurringLabel.textContent = "Recurring"
    // formEl.append(isRecurringLabel)

    // const lastDoneLabel = document.createElement("label")
    // lastDoneLabel.setAttribute("for", "lastDone");
    // lastDoneLabel.textContent = "Last Done:"
    // formEl.append(lastDoneLabel)
    // const lastDoneInput = document.createElement("input")
    // lastDoneInput.setAttribute("type", "date");
    // lastDoneInput.setAttribute("id", "lastDone");
    // formEl.append(lastDoneInput)
    
    // const numPeriodsLabel = document.createElement("label")
    // numPeriodsLabel.setAttribute("for", "numPeriods");
    // numPeriodsLabel.textContent = "Every:"
    // formEl.append(numPeriodsLabel)
    // const numPeriodsInput = document.createElement("input")
    // numPeriodsInput.setAttribute("type", "number");
    // numPeriodsInput.setAttribute("id", "numPeriods");
    // numPeriodsInput.setAttribute("style", "width:60px");
    // numPeriodsInput.setAttribute("placeholder", "Num");
    // formEl.append(numPeriodsInput)

    // const timePeriodSelect = document.createElement("select")
    // timePeriodSelect.setAttribute("id", "timePeriod");
    // const opt1 = document.createElement("option");
    // const opt2 = document.createElement("option");
    // const opt3 = document.createElement("option");
    // opt1.value = "day";
    // opt1.text = "day(s)";
    // opt2.value = "week";
    // opt2.text = "week(s)";
    // opt3.value = "month";
    // opt3.text = "month(s)";
    // opt3.setAttribute("selected", "selected")
    // opt4.value = "year";
    // opt4.text = "year(s)";
    // timePeriodSelect.add(opt1);
    // timePeriodSelect.add(opt2);
    // timePeriodSelect.add(opt3);
    // timePeriodSelect.add(opt4);
    // formEl.append(timePeriodSelect)

    // const nextDueLabel = document.createElement("label")
    // nextDueLabel.setAttribute("for", "nextDue");
    // nextDueLabel.textContent = "Next Due:"
    // formEl.append(nextDueLabel)
    // const nextDueInput = document.createElement("input")
    // nextDueInput.setAttribute("type", "date");
    // nextDueInput.setAttribute("id", "nextDue");

    // formEl.append(nextDueInput)

    // const noteInput = document.createElement("input")
    // noteInput.setAttribute("type", "text");
    // noteInput.setAttribute("id", "note");
    // noteInput.setAttribute("placeholder", "notes")
    // noteInput.setAttribute("style", "width: 95%")
    // formEl.append(noteInput)

    // const saveBtn = document.createElement("button");
    // saveBtn.textContent = "save";
    // formEl.append(saveBtn)
    // saveBtn.addEventListener("click", e => {
    //     e.preventDefault();
    //     newReminderObj = {
    //         task: taskInput.value.trim(),
    //         lastDone: lastDoneInput.value,
    //         isRecurring: isRecurringInput.checked,
    //         numPeriods: numPeriodsInput.value,
    //         timePeriod: timePeriodSelect.value,
    //         nextDue: nextDueInput.value,
    //         note: noteInput.value,
    //         CategoryId: categoryId
    //     }
    //     fetch("/api/reminders", {
    //         method: "POST", 
    //         body: JSON.stringify(newReminderObj),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //     }).then(res => {
    //         if (res.ok) {
    //             location.reload();
    //         } else {
    //             alert("Error Occured, try again");
    //         };
    //     });
    // });
    
    // const cancelBtn = document.createElement("button");
    // cancelBtn.textContent = "cancel";
    // formEl.append(cancelBtn);
    // cancelBtn.addEventListener("click", () => location.reload());
};

function handlerBigStickClick(event) {
    const reminderId = event.target.getAttribute("data-ReminderId");
    if (event.target.matches(".checkTask")) {
        markTaskComplete(reminderId);
    } else if (event.target.matches("li.reminders")) {
        editTask(reminderId);
    }
}

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
} 

async function editTask(reminderId) {
// TODO
}

function createForm() {
    const formEl = document.createElement("form");
    formEl.setAttribute("style", "position:relative; width:100%");

    const firstRowDiv = document.createElement("div");
    firstRowDiv.setAttribute("style", "display:inline-block; width:100%");
    formEl.append(firstRowDiv);
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("style", "display:inline-block; width:70%");
        firstRowDiv.append(taskDiv);
            const taskLabel = document.createElement("label");
            taskLabel.setAttribute("for", "task");
            taskLabel.setAttribute("style", "display:block");
            taskLabel.textContent = "*Add New Task:";
            taskDiv.append(taskLabel);

            const taskInput = document.createElement("input");
            taskInput.setAttribute("type", "text");
            taskInput.setAttribute("id", "task");
            taskInput.setAttribute("style", "display:block; width: 100%");
            taskInput.setAttribute("placeholder", "Task");
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
            lastDoneInput.setAttribute("style", "display:block; width:120px");
            lastDoneDiv.append(lastDoneInput);
    
    const secondRowDiv = document.createElement("div");
    secondRowDiv.setAttribute("style", "display:inline-block; width:100%");
    formEl.append(secondRowDiv);
        const recurringDiv = document.createElement("div");
        recurringDiv.setAttribute("style", "display:inline-block");
        secondRowDiv.append(recurringDiv);
            const isRecurringInput = document.createElement("input");
            isRecurringInput.setAttribute("type", "checkbox");
            isRecurringInput.setAttribute("id", "isRecurring");
            isRecurringInput.setAttribute("style", "display:block; transform:translate(150%, 30%)");
            isRecurringInput.checked = true;
            recurringDiv.append(isRecurringInput);

            const isRecurringLabel = document.createElement("label");
            isRecurringLabel.setAttribute("for", "isRecurring");
            isRecurringLabel.setAttribute("style", "display:block");
            isRecurringLabel.textContent = "Recurring";
            recurringDiv.append(isRecurringLabel);

        const numPeriodsDiv = document.createElement("div");
        numPeriodsDiv.setAttribute("style", "display:inline-block");
        secondRowDiv.append(numPeriodsDiv);
            const numPeriodsLabel = document.createElement("label");
            numPeriodsLabel.setAttribute("for", "numPeriods");
            numPeriodsLabel.setAttribute("style", "display:block");
            numPeriodsLabel.textContent = "Every:";
            numPeriodsDiv.append(numPeriodsLabel);

            const numPeriodsInput = document.createElement("input");
            numPeriodsInput.setAttribute("type", "number");
            numPeriodsInput.setAttribute("id", "numPeriods");
            numPeriodsInput.setAttribute("style", "display:block; width:60px");
            numPeriodsInput.setAttribute("placeholder", "Num");
            numPeriodsInput.setAttribute("required", "required");
            numPeriodsDiv.append(numPeriodsInput);

        const timePeriodDiv = document.createElement("div");
        timePeriodDiv.setAttribute("style", "display:inline-block");
        secondRowDiv.append(timePeriodDiv);
            const timePeriodSelect = document.createElement("select");
            timePeriodSelect.setAttribute("id", "timePeriod");
            timePeriodSelect.setAttribute("style", "display:block");
            const opt1 = document.createElement("option");
            const opt2 = document.createElement("option");
            const opt3 = document.createElement("option");
            const opt4 = document.createElement("option");
            opt1.value = "day";
            opt1.text = "day(s)";
            opt2.value = "week";
            opt2.text = "week(s)";
            opt3.value = "month";
            opt3.text = "month(s)";
            opt3.setAttribute("selected", "selected");
            opt4.value = "year";
            opt4.text = "year(s)";
            timePeriodSelect.add(opt1);
            timePeriodSelect.add(opt2);
            timePeriodSelect.add(opt3);
            timePeriodSelect.add(opt4);
            timePeriodDiv.append(timePeriodSelect);

        isRecurringInput.addEventListener("click", () => {
            if (isRecurringInput.checked) {
                numPeriodsDiv.setAttribute("style", "display:inline-block");
                timePeriodDiv.setAttribute("style", "display:inline-block");
                numPeriodsInput.setAttribute("required", "required");
            } else {
                numPeriodsDiv.setAttribute("style", "display:none");
                timePeriodDiv.setAttribute("style", "display:none");
                numPeriodsInput.removeAttribute("required");
            };
        });

        const nextDueDiv = document.createElement("div");
        nextDueDiv.setAttribute("id", "timePeriodDiv");
        nextDueDiv.setAttribute("style", "display:inline-block");
        secondRowDiv.append(nextDueDiv);
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

        const noteInput = document.createElement("input");
        noteInput.setAttribute("type", "text");
        noteInput.setAttribute("id", "note");
        noteInput.setAttribute("style", "display:inline-block; width:35%");
        noteInput.setAttribute("placeholder", "notes");
        secondRowDiv.append(noteInput);

    const saveBtn = document.createElement("button");
    saveBtn.setAttribute("type", "submit")
    saveBtn.textContent = "save";
    formEl.append(saveBtn);
    
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "cancel";
    formEl.append(cancelBtn);
    cancelBtn.addEventListener("click", () => location.reload());

    return formEl;
};