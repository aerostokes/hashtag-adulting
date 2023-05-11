const chalkboard = document.getElementById("nextTasks");
const bigStickyOl = document.getElementById("remindList")
const addTaskBtn = document.getElementById("addTask")

// On page load
chalkboard.addEventListener("click", handlerEditTask);
addTaskBtn.addEventListener("click", handlerAddTask);
bigStickyOl.addEventListener("click", handlerBigStickClick)


function handlerEditTask() {
    // <input type="date" id="date" style="color-scheme:dark">
    // const deleteBtn = document.createElement("button");
    // deleteBtn.setAttribute("style", "color:red")
    // deleteBtn.textContent = "DELETE";
    // formEl.append(deleteBtn)
    // deleteBtn.addEventListener("click", () => {
    //     // fetch("/api/reminders/")
    // });
};

function handlerAddTask() {
    addTaskBtn.setAttribute("hidden", "hidden")
    const categoryId = document.getElementById("biggerSticky").getAttribute("data-CategoryId");
    const formEl = document.createElement("form");
    bigStickyOl.append(formEl)

    const taskInput = document.createElement("input")
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("id", "task");
    taskInput.setAttribute("placeholder", "Task")
    taskInput.setAttribute("style", "width: 60%")
    formEl.append(taskInput)


    const isRecurringInput = document.createElement("input")
    isRecurringInput.setAttribute("type", "checkbox");
    isRecurringInput.setAttribute("id", "isRecurring");
    isRecurringInput.checked = true;
    formEl.append(isRecurringInput)
    const isRecurringLabel = document.createElement("label")
    isRecurringLabel.setAttribute("for", "isRecurring");
    isRecurringLabel.textContent = "Recurring"
    formEl.append(isRecurringLabel)

    const lastDoneLabel = document.createElement("label")
    lastDoneLabel.setAttribute("for", "lastDone");
    lastDoneLabel.textContent = "Last Done:"
    formEl.append(lastDoneLabel)
    const lastDoneInput = document.createElement("input")
    lastDoneInput.setAttribute("type", "date");
    lastDoneInput.setAttribute("id", "lastDone");
    formEl.append(lastDoneInput)
    
    const numPeriodsLabel = document.createElement("label")
    numPeriodsLabel.setAttribute("for", "numPeriods");
    numPeriodsLabel.textContent = "Every:"
    formEl.append(numPeriodsLabel)
    const numPeriodsInput = document.createElement("input")
    numPeriodsInput.setAttribute("type", "number");
    numPeriodsInput.setAttribute("id", "numPeriods");
    numPeriodsInput.setAttribute("style", "width:60px");
    numPeriodsInput.setAttribute("placeholder", "Num");
    formEl.append(numPeriodsInput)

    const timePeriodSelect = document.createElement("select")
    timePeriodSelect.setAttribute("id", "timePeriod");
    const opt1 = document.createElement("option");
    const opt2 = document.createElement("option");
    const opt3 = document.createElement("option");
    opt1.value = "week";
    opt1.text = "week(s)";
    opt2.value = "month";
    opt2.text = "month(s)";
    opt2.setAttribute("selected", "selected")
    opt3.value = "year";
    opt3.text = "year(s)";
    timePeriodSelect.add(opt1);
    timePeriodSelect.add(opt2);
    timePeriodSelect.add(opt3);
    formEl.append(timePeriodSelect)

    const nextDueLabel = document.createElement("label")
    nextDueLabel.setAttribute("for", "nextDue");
    nextDueLabel.textContent = "Next Due:"
    formEl.append(nextDueLabel)
    const nextDueInput = document.createElement("input")
    nextDueInput.setAttribute("type", "date");
    nextDueInput.setAttribute("id", "nextDue");

    formEl.append(nextDueInput)

    const noteInput = document.createElement("input")
    noteInput.setAttribute("type", "text");
    noteInput.setAttribute("id", "note");
    noteInput.setAttribute("placeholder", "notes")
    noteInput.setAttribute("style", "width: 95%")
    formEl.append(noteInput)

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "save";
    formEl.append(saveBtn)
    saveBtn.addEventListener("click", e => {
        e.preventDefault();
        newReminderObj = {
            task: taskInput.value.trim(),
            lastDone: lastDoneInput.value,
            isRecurring: isRecurringInput.checked,
            numPeriods: numPeriodsInput.value,
            timePeriod: timePeriodSelect.value,
            nextDue: nextDueInput.value,
            note: noteInput.value,
            CategoryId: categoryId
        }
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
            };
        });
    });
    
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "cancel";
    formEl.append(cancelBtn);
    cancelBtn.addEventListener("click", () => location.reload());
};

function handlerBigStickClick() {
    console.log("hello world");
}