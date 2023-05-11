const express = require("express");
const router = express.Router();
const { User, Category, Reminder, TemplateCategory, TemplateReminder } = require("../models")
const dayjs = require("dayjs");


router.get("/", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            const templateCategoriesData = await TemplateCategory.findAll();
            const templateCategoriesArr = templateCategoriesData.map(templateCategoryObj => templateCategoryObj.get({ plain: true }));
            return res.render('../views/home.handlebars', { 
                sticky: templateCategoriesArr, 
                loggedIn: false,
            });
        } else {
            const categoriesData = await Category.findAll({ 
                where: { UserId: req.session.UserId },
            });
            const categoriesArr = categoriesData.map(categoryObj => categoryObj.get({ plain: true }));
            return res.render('../views/home.handlebars', {
                sticky: categoriesArr,
                loggedIn: true
            });
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };

    
});

// Logout
router.get("/logout", async (req, res) => {
    await req.session.destroy();
    return res.redirect("/")
});

router.get("/dashboard", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect("/");
        } else {
            const categoriesData = await Category.findAll({ 
                where: { UserId: req.session.UserId },
                include: { 
                    model: Reminder,
                    include: Category,
                }
            });
            const categoriesArr = categoriesData.map(categoryObj => categoryObj.get({ plain: true }));
            if (categoriesArr.length == 0) {
                res.redirect("/wizard")
            } else {
                const remindersArr = categoriesArr.map(categoryObj => categoryObj.Reminders).flat();
                remindersArr.forEach(reminderObj => {
                    reminderObj.nextDue = dayjs(reminderObj.nextDue).format("MMM DD, YY")
                });
                const priorityArr = remindersArr.filter(reminderObj => dayjs(reminderObj.nextDue).isBefore(dayjs().add(2,"week")))
                priorityArr.sort((a,b) => dayjs(a.nextDue).diff(dayjs(b.nextDue)));
                priorityArr.forEach(reminderObj => {
                    if (dayjs(reminderObj.nextDue).isBefore(dayjs().add(1,"day"))) { reminderObj.overdue = true }
                });
                return res.render('../views/dashboard.handlebars', {
                    sticky: categoriesArr,
                    loggedIn: true,
                    bigSticky: categoriesArr[0],
                    upNext: priorityArr,
                });
            };
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

router.get("/dashboard/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        if (!req.session.loggedIn) {
            return res.redirect("/");
        } else {
            const categoriesData = await Category.findAll({ 
                where: { UserId: req.session.UserId },
                include: { 
                    model: Reminder,
                    include: Category,
                }
            });
            const categoriesArr = categoriesData.map(categoryObj => categoryObj.get({ plain: true }));
            const bigStickyArr = categoriesArr.filter(cateogryObj => cateogryObj.id === parseInt(req.params.id));
            if (bigStickyArr.length == 0) {
                return res.redirect("/dashboard")
            } else {
                const remindersArr = categoriesArr.map(categoryObj => categoryObj.Reminders).flat();
                remindersArr.forEach(reminderObj => {
                    reminderObj.nextDue = dayjs(reminderObj.nextDue).format("MMM DD, YY")
                });
                const priorityArr = remindersArr.filter(reminderObj => dayjs(reminderObj.nextDue).isBefore(dayjs().add(2,"week")))
                priorityArr.sort((a,b) => dayjs(a.nextDue).diff(dayjs(b.nextDue)));
                priorityArr.forEach(reminderObj => {
                    if (dayjs(reminderObj.nextDue).isBefore(dayjs().add(1,"day"))) { reminderObj.overdue = true }
                });
                return res.render('../views/dashboard.handlebars', {
                    loggedIn: true,
                    sticky: categoriesArr,
                    bigSticky: bigStickyArr[0],
                    upNext: priorityArr,
                });
            };
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

router.get("/wizard", (req, res) => {
    res.render('../views/wizard.handlebars');
});

router.get("/signup", (req, res) => {
    res.render('../views/signup.handlebars')
})

router.get("/category-editor", (req, res) => {
    res.render('../views/category-editor.handlebars')
})


module.exports = router;