const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
    try {
        const dbpostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attriutes: ["username"]
                },
            ],
        });
        console.log("testing");

        // const posts = dbpostData.map((post) => post.toJSON());
        const posts = dbpostData.map((post) => post.get({ plain: true }));
        res.render("homepage", posts);

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;