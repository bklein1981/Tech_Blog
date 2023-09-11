const router = require('express').Router();
const { Post } = require('../../models');
const userAuth = require('../../utils/auth');

//new get route for creating new posts

router.post('/', async (req, res) => {
    console.log('new post POST request received');
    console.log(req.body);
    console.log(req.session.user_id);
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

router.put('/post_edit/:id', async (req, res) => {
    console.log('new post_edit PUT request Received')
    try {
        const postEdit = await Post.update({
            title: req.body.title,
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

module.exports = router;