const express = require("express");
const router = express.Router();

const { User, Category } = require('../../models');

router.get("/", async (_, res) => {
    if (!req.session.loggedIn) return res.status(404).json({ msg: 'You are not logged in!' });

    const currentUser = await User.findByPk(req.session.UserId);
    const categories = await currentUser.getCategories();

    if (categories.length === 0) {
        return res.status(404).json({ msg: "No Categories found" });
    }
    res.json(categories);
});

router.post("/", async (req, res) => {
    if (!req.session.loggedIn) return res.status(404).json({ msg: 'You are not logged in!' });
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

router.delete("/:id", async (req, res) => {
    if (!req.session.loggedIn) return res.status(404).json({ msg: 'You are not logged in!' });
    
    try {
        const id = await Category.destroy({ where: { id: req.body.id }});
        res.json({ msg: `Successfully deleted Category with ID: ${id}`});
    } catch (error) {
        res.status(500).json({ msg: "Error Occurred", error });
    }
});

module.exports = router;