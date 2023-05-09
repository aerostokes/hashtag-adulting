const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");
const categoryRoutes = require("./categoryController");

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;