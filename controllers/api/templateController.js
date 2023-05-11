const express = require("express");
const router = express.Router();
const { TemplateCategory, TemplateReminder } = require('../../models');

// Routes for /api/templates


// Get Template by id
router.get("/:id", async (req, res) => {
    try {
        const templateCategoryObj = await TemplateCategory.findByPk(req.params.id, { include: TemplateReminder });
            if (!templateCategoryObj) {
                return res.status(404).json({ msg: "TemplateCategoryId not found" });
            } else {
                return res.json(templateCategoryObj);
            };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});


module.exports = router;