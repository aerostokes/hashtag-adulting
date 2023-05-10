const express = require("express");
const router = express.Router();

const frontendRoutes = require("./frontendController");
const apiRoutes = require("./api");


router.use("/api", apiRoutes);
router.use("/", frontendRoutes);




module.exports = router;