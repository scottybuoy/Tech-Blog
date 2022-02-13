const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        attributes: ['id', 'title', 'content'],

        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id'],
            
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
})

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.json(newPost);
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;