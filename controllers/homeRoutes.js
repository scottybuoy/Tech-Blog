const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attriutes: ["username"]
                },
            ],
        });

        const posts = postData.map((post) => post.toJSON());

        res.render("homepage", { posts });

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;