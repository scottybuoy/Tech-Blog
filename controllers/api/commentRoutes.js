const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })

        res.json(commentData);
        console.log('------------------')
        console.log(commentData)

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});




module.exports = router;