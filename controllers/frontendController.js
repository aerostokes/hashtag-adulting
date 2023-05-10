const express = require("express");
const router = express.Router();
const { User, Category, Reminder, TemplateCategory, TemplateReminder } = require("../models")


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
                include: Reminder,
            });
            const categoriesArr = categoriesData.map(categoryObj => categoryObj.get({ plain: true }));
            if (categoriesArr.length == 0) {
                res.redirect("/wizard")
            } else {
                return res.render('../views/dashboard.handlebars', {
                    sticky: categoriesArr,
                    loggedIn: true,
                    bigSticky: categoriesArr[0],
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
                include: Reminder,
            });
            const categoriesArr = categoriesData.map(categoryObj => categoryObj.get({ plain: true }));
            const bigStickyArr = categoriesArr.filter(cateogryObj => cateogryObj.id === parseInt(req.params.id));
            if (bigStickyArr.length == 0) {
                return res.redirect("/dashboard")
            } else {
                return res.render('../views/dashboard.handlebars', {
                    loggedIn: true,
                    sticky: categoriesArr,
                    bigSticky: bigStickyArr[0],
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