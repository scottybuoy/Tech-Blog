const router = require("express").Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require("../models");

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attriutes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render("dashboard", { 
            posts,
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        console.error(err);
    }
    
})


// Show Post on user dashboard
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ all: true, nested: true }],
            // attributes: [
            //     'id',
            //     'title',
            //     'content',
            //     'date_created'
            // ]
        });

        const post = postData.get({ plain: true });

        res.render('edit-post', { post, logged_in: req.session.logged_in })

    } catch (err) {
        console.error(err);
    }
   
});


// New Post form
router.get('/new', (req, res) => {
    res.render('new-post', { logged_in: req.session.logged_in });
})

module.exports = router;