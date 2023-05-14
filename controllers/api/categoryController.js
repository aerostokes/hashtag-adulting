const express = require("express");
const router = express.Router();
const { Category, TemplateCategory } = require('../../models');

// Routes for /api/categories

// Get all Categories
router.get("/", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            const templateCategoriesArr = await TemplateCategory.findAll();
            return res.json(templateCategoriesArr);
        } else {
            const categoriesArr = await Category.findAll({ 
                where: { UserId: req.session.UserId },
            });
            return res.json(categoriesArr);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Get Category by id
router.get("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            const templateCategoryObj = await TemplateCategory.findByPk(req.params.id);
            if (!templateCategoryObj) {
                return res.status(404).json({ msg: "TemplateCategoryId not found" });
            } else {
                return res.json(templateCategoryObj);
            };
        } else {
            const categoryObj = await Category.findByPk(req.params.id);
            if (!categoryObj) {
                return res.status(404).json({ msg: "CategoryId not found" });
            } else if (categoryObj.UserId !== req.session.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                return res.json(categoryObj);
            };
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Post new Category
router.post("/", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" });
        } else {
            console.log(req.session.UserId);
            const category = await Category.create({
                name: req.body.name,
                emoji: req.body.emoji,
                color: req.body.color,
                UserId: req.session.UserId,
            });
            res.json({ msg: "Successfully created", category });
        };
    } catch(err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    }
});

// Update Category by id
router.put("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" }); 
        } else {
            const categoryEntry = await Category.findByPk(req.params.id);
            if (!categoryEntry) {
                return res.status(404).json({ msg: "CategoryId not found" });
            } else if (req.session.UserId !== categoryEntry.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                await categoryEntry.update(req.body);
                return res.json({ msg: `Successfully updated Category with id: ${req.params.id}` });
            };
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

// Delete Category by id
router.delete("/:id", async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(403).json({ msg: "Login required" }); 
        } else {
            const categoryEntry = await Category.findByPk(req.params.id);
            if (!categoryEntry) {
                return res.status(404).json({ msg: "CategoryId not found" });
            } else if (req.session.UserId !== categoryEntry.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" });
            } else {
                await categoryEntry.destroy();
                res.json({ msg: `Successfully deleted Category with id: ${req.params.id}`});
            };
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    }
});

module.exports = router;