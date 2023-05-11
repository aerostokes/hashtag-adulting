const express = require("express");
const router = express.Router();

const userRoutes = require("./userController");
const categoryRoutes = require("./categoryController");
const reminderRoutes = require("./reminderController");
const templateRoutes = require("./templateController");

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/reminders", reminderRoutes);
router.use("/templates", templateRoutes);

module.exports = router;