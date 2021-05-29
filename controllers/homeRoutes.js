const router = require('express').Router();
const { User, Recipes } = require('../models');
const withauth = require('../utils/auth');
router.get('/', async (req, res) => {
  try {
    if (req.session.signIn) {
      res.redirect('/profile');
      return;
    }
    const recipeData = await Recipes.findAll({
      include: [
        {
          model: User,
          attributes: ['userName'],
        },
      ],
    });
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('recipe', {
      recipes,
      signIn: req.session.signIn,
      valid: req.query.valid,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = userData.passwordChecker(req.body.password);
    if (!validPassword) {
      res
        .status(404)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.signIn = true;
      res.json({ user: userData, message: 'You successfully signed in!' });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get('/', withauth, async (req, res) => {
  const recipeData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['userName'],
      },
    ],
  });
  const plainRecipe = recipeData.map((recipe) => recipe.get({ plain: true }));
  const recipes = [];
  plainRecipe.forEach((recipe) => {
    if (req.session.user_id === recipe.user_id) {
      recipe.author = req.session.signIn;
      recipes.push(recipe);
    } else {
      recipes.push(recipe);
    }
  });
  res.render('profile', {
    recipes,
    name: req.session.username.toUpperCase(),
    signIn: req.session.signIn,
  });
});
module.exports = router;
