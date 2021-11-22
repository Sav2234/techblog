const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post

router.post('/', withAuth, async (req, res) => {
    // console.log(req.body)
    try {
        const post = await Post.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id,
        });
        console.log(post)
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