const express = require("express");
const router = express.Router();
const { Reminder, Category } = require("../../models")

// Routes for /api/reminders

// Get all Reminders for logged in user
router.get("/", (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" })
    } else {
        Reminder.findAll({
            include: { 
                model: Category,
                where: { UserId: req.session.UserId },
            },
        }).then(remindersArr => {
            if (remindersArr.length === 0) {
                return res.status(404).json({ msg: "No Users found" });
            } else {
                return res.json(remindersArr);
            };
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error Occurred", err });
        });
    };
});

// Get Reminder by id
router.get("/:id", (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" })
    } else {
        Reminder.findByPk(req.params.id, { include: Category })
        .then(reminderObj => {
            if (!reminderObj) {
                return res.status(404).json({ msg: "ReminderId not found" });
            } else if (reminderObj.Category.UserId !== req.session.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" })
            } else {
                return res.json(reminderObj);
            };
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error Occurred", err });
        });
    };
});

// Post new reminder
router.post("/", (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" })
    } else {
        Reminder.create({
            task: req.body.task,
            lastDone: req.body.lastDone,
            isRecurring: req.body.isRecurring,
            numPeriods: req.body.numPeriods,
            timePeriod: req.body.timePeriod,
            nextDue: req.body.nextDue,
            note: req.body.note,
            CategoryId: req.body.CategoryId,
        }).then(reminderObj => {
            res.json({ msg: "Successfully created", reminderObj })
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error Occurred", err });
        });
    };
});

// Put update Reminder by id
router.put("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" }); 
    };
    try {
        const reminderEntry = await Reminder.findByPk(req.params.id, { include: Category });
        if (!reminderEntry) {
            return res.status(404).json({ msg: "ReminderId not found" });
        } else if (req.session.UserId !== reminderEntry.Category.UserId) {
            return res.status(403).json({ msg: "Not authorized for this UserId" });
        } else {
            await reminderEntry.update(req.body);
            return res.json({ msg: "Successfully updated" });
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Delete Reminder by id
router.delete("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" });
    };
    try {
        const reminderEntry = await Reminder.findByPk(req.params.id, { include: Category });
        if (!reminderEntry) {
            return res.status(404).json({ msg: "ReminderId not found" });
        } else if (req.session.UserId !== reminderEntry.Category.UserId) {
            return res.status(403).json({ msg: "Not authorized for this UserId" });
        } else {
            await reminderEntry.destroy();
            return res.json({ msg: "Successfully deleted" });
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

module.exports = router;