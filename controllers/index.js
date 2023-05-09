const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.render('../views/home.handlebars');
});

router.use("/api", apiRoutes);

module.exports = router;