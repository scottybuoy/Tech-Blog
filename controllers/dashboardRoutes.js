const router = require("express").Router();
const { User, Post } = require("../models");

router.get('/', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("./login");
        return;
    }

    res.render("dashboard")
})

router.get('/new', (req, res) => {
    res.render('new-post');
})

module.exports = router;