const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('../views/home.handlebars');
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