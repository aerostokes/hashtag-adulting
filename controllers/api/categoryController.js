const express = require("express");
const router = express.Router();

const { User, Category } = require('../../models');

router.get("/", async (req, res) => {
    if (!req.session.loggedIn) return res.status(403).json({ msg: 'You are not logged in!' });
    const userId = req.session.UserId;

    // const currentUser = await User.findByPk(UserId);
    // const categories = await currentUser.getCategories();

    // const currentUser = await User.findByPk(userId, {include: Category});
    // const categories = currentUser.Categories;

    const categories = await Category.findAll({ where: { UserId: userId }});

    if (categories.length === 0) {
        return res.status(404).json({ msg: "No Categories found" });
    }
    res.json(categories);
});

// Get Category by id
router.get("/:id", (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" })
    } else {
        Category.findByPk(req.params.id).then(categoryObj => {
            if (!categoryObj) {
                return res.status(404).json({ msg: "CategoryId not found" });
            } else if (categoryObj.UserId !== req.session.UserId) {
                return res.status(403).json({ msg: "Not authorized for this UserId" })
            } else {
                return res.json(categoryObj);
            };
        }).catch(err => {
            console.log(err);
            res.status(500).json({ msg: "Error Occurred", err });
        });
    };
});

router.post("/", async (req, res) => {
    if (!req.session.loggedIn) return res.status(403).json({ msg: 'You are not logged in!' });
    const currentUser = await User.findByPk(req.session.UserId);

    try {
        const category = await currentUser.createCategory({
            name: req.body.name,
            emoji: req.body.emoji,
            color: req.body.color,
        });

        res.json({ msg: "Successfully created", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error Occurred", error });
    }
});

// Put update Category by id
router.put("/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.status(403).json({ msg: "Login required" }); 
    };
    try {
        const categoryEntry = await Category.findByPk(req.params.id);
        if (!categoryEntry) {
            return res.status(404).json({ msg: "CategoryId not found" });
        } else if (req.session.UserId !== categoryEntry.UserId) {
            return res.status(403).json({ msg: "Not authorized for this UserId" });
        } else {
            await categoryEntry.update(req.body);
            return res.json({ msg: "Successfully updated" });
        };
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error Occurred", err });
    };
});

router.delete("/:id", async (req, res) => {
    if (!req.session.loggedIn) return res.status(403).json({ msg: 'You are not logged in!' });
    
    try {
        // Require check for UserId match before deleting
        const categoryEntry = await Category.findByPk(req.params.id);
        if (!categoryEntry) {
            return res.status(404).json({ msg: "CategoryId not found" });
        } else if (req.session.UserId !== categoryEntry.UserId) {
            return res.status(403).json({ msg: "Not authorized for this UserId" });
        } else {
            await categoryEntry.destroy();
            res.json({ msg: `Successfully deleted Category with ID: ${req.params.id}`});
        };
    } catch (error) {
        res.status(500).json({ msg: "Error Occurred", error });
    }
});

module.exports = router;