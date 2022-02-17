const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// show all posts
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

    res.json(postData);
});


// create new post 
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.json(newPost);
        console.log('*************************')
        console.log(newPost);
        
    } catch (err) {
        console.error(err);
    }
})


// Update Post
router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        });

        if(!updatePost) {
            console.error('No post with this id')
        }

        res.json(updatePost);

    } catch (err) {
        console.error(err);
    }
    
});


// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if (!postData) {
            console.error('no project found with this id')
        }

        res.json(postData);

    } catch (err) {
        console.error(err);
    }
})




module.exports = router;