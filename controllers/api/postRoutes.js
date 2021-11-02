const router = require('express').Router();
const { Post, User } = require('../../models');

//create a new post

router.post('/', async (res, req) => {
    try {
        const newPost = await Post.create({
            title: req.body.postTitle,
            text: req.body.newPost,
        });

        PostUserData = await User.create({
            user_id: req.session._user_id,
            post_id: newPost.id,
        });
        res.status(200).json(PostUserData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;