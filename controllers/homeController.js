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


module.exports = router;