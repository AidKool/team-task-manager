const router = require('express').Router();

const taskRoutes = require('./task-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');

router.use('/tasks', taskRoutes);
router.use('/teams', teamRoutes);
router.use('/users', userRoutes);

module.exports = router;
