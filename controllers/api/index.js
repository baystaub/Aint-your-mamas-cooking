const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const recipeRoutes = require('./recipeRoutes');
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
module.exports = router;
