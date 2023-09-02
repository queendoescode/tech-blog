const router = require('express').Router();
const apiRoutes = require('./api');
const webRoutes = require('./web');
const dashboardRoutes = require('./web/dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', webRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
