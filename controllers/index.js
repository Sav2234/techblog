const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/post', postRoutes);
router.use('/users', userRoutes);
router.use('/api', apiRoutes);


module.exports = router;
