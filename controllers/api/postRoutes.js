const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post

router.post('/', withAuth, async (res, req) => {
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


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;