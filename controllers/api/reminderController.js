const express = require("express");
const router = express.Router();
const { Reminder, Category, TemplateReminder, TemplateCategory } = require("../../models")

// Routes for /api/reminders

// Get all Reminders
router.get("/", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            const templateRemindersArr = await TemplateReminder.findAll({
                include: { model: TemplateCategory },
            });
            return res.json(templateRemindersArr);
        } else {
            const remindersArr = await Reminder.findAll({
                include: { 
                    model: Category,
                    where: { UserId: req.session.UserId },
                },
            });
            return res.json(remindersArr);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Get Reminder by id
router.get("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            const templateReminderObj = await TemplateReminder.findByPk(req.params.id, { include: TemplateCategory });
            if (!templateReminderObj) {
                return res.status(404).json({ msg: "TemplateReminderId not found" });
            } else {
                return res.json(templateReminderObj);
            };
        } else {
            const reminderObj = await Reminder.findByPk(req.params.id, { include: Category });
            if (!reminderObj) {
                return res.status(404).json({ msg: "ReminderId not found" });
            } else if (reminderObj.Category.UserId !== req.session.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                return res.json(reminderObj);
            };
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Post new Reminder
router.post("/", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" })
        } else {
            const categoryEntry = await Category.findByPk(req.body.CategoryId);
            if (!categoryEntry) {
                return res.status(404).json({ msg: "CategoryId not found" });
            } else if (req.session.UserId !== categoryEntry.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                const reminderObj = await Reminder.create({
                    task: req.body.task,
                    lastDone: req.body.lastDone,
                    isRecurring: req.body.isRecurring,
                    numPeriods: req.body.numPeriods,
                    timePeriod: req.body.timePeriod,
                    nextDue: req.body.nextDue,
                    note: req.body.note,
                    CategoryId: req.body.CategoryId
                });
                res.json({ msg: "Successfully created", reminderObj })
            };
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Update Reminder by id
router.put("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" }); 
        } else {
            const reminderEntry = await Reminder.findByPk(req.params.id, { include: Category });
            if (!reminderEntry) {
                return res.status(404).json({ msg: "ReminderId not found" });
            } else if (req.session.UserId !== reminderEntry.Category.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                await reminderEntry.update(req.body);
                return res.json({ msg: `Successfully updated Reminder with id: ${req.params.id}` });
            };
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Delete Reminder by id
router.delete("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" });
        } else {
            const reminderEntry = await Reminder.findByPk(req.params.id, { include: Category });
            if (!reminderEntry) {
                return res.status(404).json({ msg: "ReminderId not found" });
            } else if (req.session.UserId !== reminderEntry.Category.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                await reminderEntry.destroy();
                return res.json({ msg: `Successfully deleted Reminder with id: ${req.params.id}` });
            };
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

module.exports = router;