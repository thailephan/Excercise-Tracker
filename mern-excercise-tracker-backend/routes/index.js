/* eslint-disable new-cap */
const router = require('express').Router();
const excercisesRouter = require('./excercises');
const usersRouter = require('./users');

router.get('/', (_, res) => {
  res.json({info: 'Get info'});
});
router.use('/excercises', excercisesRouter);
router.use('/users', usersRouter);

module.exports = router;
