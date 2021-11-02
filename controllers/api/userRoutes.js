const router = require('express').Router();
const { User } = require('../../models');
//creating a new user
router.post('/', async (res, req) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logging in as an existing user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(400),
                res.json({ message: 'Incorrect email, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword({ where: { email: req.body.password } });
        if (!validPassword) {
            res.status(400),
                res.json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'log in successful!' });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// logging out 
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
            console.log("logged out successfully");
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;