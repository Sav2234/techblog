const router = require('express').Router();
// const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

// router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;