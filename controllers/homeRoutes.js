const router = require("express").Router();
const { User, Post } = require("../models");


// Homepage -- display all posts
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
        console.log("post" + postData);

        // const posts = dbpostData.map((post) => post.toJSON());
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { posts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Display signup form
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("./dashboard");
        return;
    }

    res.render("signup");
})


// Display log in form
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("login");
})


// Display single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ all: true, nested: true }], 
        });

        const post = postData.get({ plain: true });
        console.log('**********************');
        console.log('POST' + post)

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;