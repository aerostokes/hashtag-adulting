const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");

router.get("/", (req, res) => {
    res.send("Welcome to the homepage");
});

router.use("/api", apiRoutes);

module.exports = router;