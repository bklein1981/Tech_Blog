const router = require('express').Router();
const { Post } = require('../../models');
const userAuth = require('../../utils/auth');

//new get route for creating new posts

router.post('/', async (req, res) => {
    console.log('new post POST request received');
    console.log(req.body);
    console.log(req.session.user_id);
    try {
        console.log(req.session.user_id)
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

module.exports = router;