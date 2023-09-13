const router = require('express').Router();
const { Post, Comment } = require('../../models');

//GET route for creating new posts
router.post('/', async (req, res) => {
    console.log('new post POST request received');
    try {
        const postData = await Post.create({
            title: req.body.title,
            entry: req.body.entry,
            user_id: req.session.user_id,
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// PUT route for updating posts
router.put('/post_edit/:id', async (req, res) => {
    console.log('new post_edit PUT request Received')
    try {
        const postEdit = await Post.update({
            title: req.body.title,
            post_id: req.params.id,
            entry: req.body.entry,
        },
            {
                where: {
                    id: req.params.id,
                }
            })
        res.status(200).json(postEdit);
    } catch (err) {
        res.status(500).json(err);
    }
})

// DELETE route for deleting posts
router.delete('/post_edit/:id', async (req, res) => {
    console.log('new post_edit DELETE request Received')
    try {
        const postDelete = await Post.destroy({ where: { id: req.params.id } })
        res.status(200).json(postDelete);
    } catch (err) {
        res.status(500).json(err);
    }
})

//POST route for creating comments
router.post('/post_view/:id', async (req, res) => {
    console.log('new post POST request received');
    postId = req.params.id;
    userId = req.session.user_id
    console.log('line 54', postId)
    try {
        const commentData = await Comment.create({
            entry: req.body.entry,
            post_id: postId,
            user_id: userId
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

