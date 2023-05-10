const express = require("express");
const router = express.Router();
const { User, Category, Reminder, TemplateCategory, TemplateReminder } = require("../models")
const bcrypt = require("bcrypt");


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

// Login
router.post("/login", (req, res) => {
    User.findOne({
        where: { email: req.body.email },
    }).then(userObj => {
        if (!userObj) {
            return res.status(401).json({ msg: "Invalid email/password" });
        } else if (bcrypt.compareSync(req.body.password, userObj.password)) {
            req.session.UserId = userObj.id;
            req.session.loggedIn = true;
            return res.json([
                { msg: "Login successful" },
                req.session,
            ]);
        } else {
            return res.status(401).json({ msg: "Invalid email/password" });
        };
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "Error occurred", err });
    });
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
});

router.get("/dashboard", (req, res) => {
    res.render('../views/dashboard.handlebars');
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