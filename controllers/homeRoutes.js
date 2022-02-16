const router = require("express").Router();
const { User, Post } = require("../models");

router.get("/", async (req, res) => {
    // req.session.logged_in = false;
    try {
        const dbpostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attriutes: ["username"]
                },
            ],
        });
        console.log("dbpost" + dbpostData);

        // const posts = dbpostData.map((post) => post.toJSON());
        const posts = dbpostData.map((post) => post.get({ plain: true }));
        res.render("homepage", { posts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("./dashboard");
        return;
    }

    res.render("signup");
})

// router.get("/dashboard", (req, res) => {
//     if (!req.session.logged_in) {
//         res.redirect("./login");
//         return;
//     }

//     res.render("dashboard")
// })

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
})

module.exports = router;