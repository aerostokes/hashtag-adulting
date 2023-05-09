const express = require("express");
const router = express.Router();

const homeRoutes = require("./homeController");
const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.render('home');
});

router.use("/api", apiRoutes);
router.use("/", homeRoutes);




module.exports = router;