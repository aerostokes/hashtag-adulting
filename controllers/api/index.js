const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");
const categoryRoutes = require("./categoryController");
const reminderRoutes = require("./reminderController");

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/reminders", reminderRoutes);

module.exports = router;