const router = require('express').Router();

const pageRoutes = require('../pageRoutes');

router.use('/', userRoutes);

module.exports = router;