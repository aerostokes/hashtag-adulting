const chalkboardOl = document.getElementById("nextTasks");
const bigStickyHead = document.getElementById("stickHead");
const bigStickyOl = document.getElementById("remindList");
const addTaskBtn = document.getElementById("addTask");
const addCategorySticky = document.getElementById("addCategory" );
let reminderId

// On page load
chalkboardOl.addEventListener("click", handlerChalkboardClick);
bigStickyHead.addEventListener("click", handlerBigStickyClickCategory);
bigStickyOl.addEventListener("click", handlerBigStickyClickTask);
addTaskBtn.addEventListener("click", handlerAddTaskBtnClick);
addCategorySticky.addEventListener("click", () => {
    location.href = "/wizard"
});


// Callback functions:

function handlerChalkboardClick(event) {
    if (event.target.matches(".checkTask")) {
        markTaskComplete(event);
    } else if (event.target.matches("li.task")) {
        categoryId = event.target.getAttribute("data-CategoryId");
        location.href = `/dashboard/${categoryId}`;
    }
};

function handlerBigStickyClickCategory(event) {
    const CategoryId = event.target.getAttribute("data-CategoryId")
    location.href = `/category-editor/${CategoryId}`
};

function handlerBigStickyClickTask(event) {
    if (event.target.matches(".checkTask")) {
        markTaskComplete(event);
    } else if (event.target.matches("li.reminders")) {
        editTask(event.target);
    }
};

async function markTaskComplete(event) {
    try {
        const reminderId = event.target.getAttribute("data-ReminderId");
        const reminderResponse = await fetch(`/api/reminders/${reminderId}`);
        const reminderData = await reminderResponse.json();
        let res;
        const reminderLiArr = document.querySelectorAll(`li[data-ReminderId='${reminderId}']`)
        let newInnerHTML;

        // If the task is not recurring, than delete the database entry.
        if (!reminderData.isRecurring) {
            res = await fetch(`/api/reminders/${reminderId}`, {
                method: "DELETE", 
                headers: {
                "Content-Type": "application/json",
                },
            });
            newInnerHTML = `<strike>${reminderData.task}</strike> – <b>completed: TODAY</b>`
        // If it is recurring, update the Reminder entry to lastDone = today, and nextDue based on the stored interval. 
        } else {
            const editReminderObj = {
                id: reminderId,
                lastDone: dayjs().format("YYYY-MM-DD"),
                nextDue: dayjs().add(reminderData.numIntervals,reminderData.timeInterval).format("YYYY-MM-DD"),
            };
            res = await fetch(`/api/reminders/${reminderId}`, {
                method: "PUT", 
                body: JSON.stringify(editReminderObj),
                headers: {
                "Content-Type": "application/json",
                },
            });
            newInnerHTML = `<strike>${reminderData.task}</strike> – <b>completed: TODAY, next due: ${editReminderObj.nextDue}</b>`
        }
        if (res.ok) {
            reminderLiArr.forEach(li => {
                li.innerHTML = newInnerHTML;
            });
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

        const editTaskForm = createForm(reminderData.isRecurring, true);
        if (editTaskForm) {
            taskLi.textContent = ""
            editTaskForm.querySelector("#task").value = reminderData.task;
            editTaskForm.querySelector("#lastDone").value = reminderData.lastDone;
            editTaskForm.querySelector("#isRecurring").checked = reminderData.isRecurring;
            editTaskForm.querySelector("#numIntervals").value = reminderData.numIntervals;
            editTaskForm.querySelector("#timeInterval").value = reminderData.timeInterval;
            editTaskForm.querySelector("#nextDue").value = reminderData.nextDue;
            editTaskForm.querySelector("#note").value = reminderData.note;

            taskLi.append(editTaskForm);

            const deleteBtn = editTaskForm.querySelector("#deleteBtn")
            deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                deleteReminder(reminderId);
            });

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
                if (editTaskForm.querySelector("#numIntervals").value) {
                    editReminderObj.numIntervals = editTaskForm.querySelector("#numIntervals").value;
                    editReminderObj.timeInterval = editTaskForm.querySelector("#timeInterval").value;
                } else {
                    editReminderObj.numIntervals = null;
                    editReminderObj.timeInterval = null;
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

    const newLi = document.createElement("li");
    newLi.setAttribute("class", "reminders")
    bigStickyOl.append(newLi)
    const newTaskForm = createForm();
    newLi.append(newTaskForm);

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
        if (newTaskForm.querySelector("#numIntervals").value) {
            newReminderObj.numIntervals = newTaskForm.querySelector("#numIntervals").value;
            newReminderObj.timeInterval = newTaskForm.querySelector("#timeInterval").value;
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



function createForm(isRecurring=true, withDelete=false) {
    if (document.getElementById("addEditForm")) { return };
    const formEl = document.createElement("form");
    formEl.setAttribute("id","addEditForm");
    formEl.setAttribute("style", "display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; text-indent:0px; font-size:80%; line-height:1");
        const editEmoji = document.createElement("p");
        editEmoji.setAttribute("style", "text-indent:-25px; font-size: 20px; transform:translateX(-9px)");
        editEmoji.textContent = "📝";
        formEl.append(editEmoji);

        const taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.setAttribute("id", "task");
        taskInput.setAttribute("style", "flex: 10 10 50%");
        taskInput.setAttribute("placeholder", "*Task");
        taskInput.setAttribute("required", "required");
        formEl.append(taskInput);

        const lastDoneDiv = document.createElement("div");
        lastDoneDiv.setAttribute("style", "display:flex");
        formEl.append(lastDoneDiv);
            const lastDoneLabel = document.createElement("label");
            lastDoneLabel.setAttribute("for", "lastDone");
            lastDoneLabel.setAttribute("style", "width:30px; text-align:end");
            lastDoneLabel.textContent = "Last Done:";
            lastDoneDiv.append(lastDoneLabel);

            const lastDoneInput = document.createElement("input");
            lastDoneInput.setAttribute("type", "date");
            lastDoneInput.setAttribute("id", "lastDone");
            lastDoneInput.setAttribute("style", "width: 120px");
            lastDoneDiv.append(lastDoneInput);

        const calcDueDiv = document.createElement("div");
        calcDueDiv.setAttribute("style", "display:flex; flex:1 1; justify-content:space-between");
        formEl.append(calcDueDiv);
            const recurringDiv = document.createElement("div");
            recurringDiv.setAttribute("style", "display:flex; flex-direction:column; width: 55px");
            calcDueDiv.append(recurringDiv);
                const isRecurringLabel = document.createElement("label");
                isRecurringLabel.setAttribute("for", "isRecurring");
                isRecurringLabel.textContent = "Recurring";
                recurringDiv.append(isRecurringLabel);

                const isRecurringInput = document.createElement("input");
                isRecurringInput.setAttribute("type", "checkbox");
                isRecurringInput.setAttribute("id", "isRecurring");
                isRecurringInput.setAttribute("style", "transform:translateX(20px); height: 15px");
                recurringDiv.append(isRecurringInput);

            const intervalDiv = document.createElement("div");
            // See event listener below for intervalDiv styling
            calcDueDiv.append(intervalDiv);
                const numIntervalsLabel = document.createElement("label");
                numIntervalsLabel.setAttribute("for", "numIntervals");
                numIntervalsLabel.setAttribute("style", "width:32px");
                numIntervalsLabel.textContent = "Every:";
                intervalDiv.append(numIntervalsLabel);

                const numIntervalsInput = document.createElement("input");
                numIntervalsInput.setAttribute("type", "number");
                numIntervalsInput.setAttribute("id", "numIntervals");
                numIntervalsInput.setAttribute("style", "flex:0 1; max-width:53px; text-align:center");
                numIntervalsInput.setAttribute("placeholder", "Num");
                intervalDiv.append(numIntervalsInput);

                const timeIntervalSelect = document.createElement("select");
                timeIntervalSelect.setAttribute("id", "timeInterval");
                timeIntervalSelect.setAttribute("style", "flex:0 1; max-width:87px");
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
                timeIntervalSelect.add(opt1);
                timeIntervalSelect.add(opt2);
                timeIntervalSelect.add(opt3);
                timeIntervalSelect.add(opt4);
                intervalDiv.append(timeIntervalSelect);
            const nextDueDiv = document.createElement("div");
            nextDueDiv.setAttribute("style", "display:flex");
            calcDueDiv.append(nextDueDiv);
                const nextDueLabel = document.createElement("label");
                nextDueLabel.setAttribute("for", "nextDue");
                nextDueLabel.setAttribute("style", "width:30px; text-align:end");
                nextDueLabel.textContent = "*Next Due:";
                nextDueDiv.append(nextDueLabel);

                const nextDueInput = document.createElement("input");
                nextDueInput.setAttribute("type", "date");
                nextDueInput.setAttribute("id", "nextDue");
                nextDueInput.setAttribute("style", "width:120px");
                nextDueInput.setAttribute("required", "required");
                nextDueDiv.append(nextDueInput);

        const noteInput = document.createElement("input");
        noteInput.setAttribute("type", "text");
        noteInput.setAttribute("id", "note");
        noteInput.setAttribute("style", "flex: 1 1 25%; font-size:75%");
        noteInput.setAttribute("placeholder", "notes (optional)");
        formEl.append(noteInput);
        
        const buttonsDiv = document.createElement("div");
        buttonsDiv.setAttribute("style", "flex:1 1; display:flex; justify-content:center");
        formEl.append(buttonsDiv);
            const saveBtn = document.createElement("button");
            saveBtn.setAttribute("type", "submit")
            saveBtn.textContent = "save";
            buttonsDiv.append(saveBtn);
            
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "cancel";
            buttonsDiv.append(cancelBtn);
            cancelBtn.addEventListener("click", (e) => {
                e.preventDefault();
                location.reload()
            });

            if (withDelete) {
                const deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("id", "deleteBtn")
                deleteBtn.setAttribute("style", "color:red")
                deleteBtn.textContent = "delete";
                buttonsDiv.append(deleteBtn);
            }

    // Add event listener to hide/show/require the numIntervals and timeInterval fields based on the isRecurring checkbox
    isRecurringInput.addEventListener("click", () => {
        if (isRecurringInput.checked) {
            intervalDiv.setAttribute("style", "display:flex; align-items:center; flex:1 1");
            numIntervalsInput.setAttribute("required", "required");
            timeIntervalSelect.setAttribute("required", "required");
        } else {
            intervalDiv.setAttribute("style", "display:none");
            numIntervalsInput.removeAttribute("required");
            timeIntervalSelect.removeAttribute("required");
        };
    });

    // Initiate with !isRecurring argument and then immediately click to trigger to isRecurring
    isRecurringInput.checked = !isRecurring;
    isRecurringInput.click();

    lastDoneInput.addEventListener("change", () => {
        if (numIntervalsInput.value && lastDoneInput.value) {
            nextDueInput.value = dayjs(lastDoneInput.value).add(numIntervalsInput.value, timeIntervalSelect.value).format("YYYY-MM-DD");
        };
    });
    numIntervalsInput.addEventListener("change", () => {
        if (numIntervalsInput.value && lastDoneInput.value) {
            nextDueInput.value = dayjs(lastDoneInput.value).add(numIntervalsInput.value, timeIntervalSelect.value).format("YYYY-MM-DD");
        };
    });
    timeIntervalSelect.addEventListener("change", () => {
        if (numIntervalsInput.value && lastDoneInput.value) {
            nextDueInput.value = dayjs(lastDoneInput.value).add(numIntervalsInput.value, timeIntervalSelect.value).format("YYYY-MM-DD");
        };
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
