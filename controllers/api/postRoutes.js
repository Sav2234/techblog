const router = require('express').Router();
const { Post } = require('../../models');

//create a new post

router.post('/', async (res, req) => {
    try {
        const post = await Post.create({
            user_id: req.session._user_id,
            post_id: req.session.post_id,
        });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;