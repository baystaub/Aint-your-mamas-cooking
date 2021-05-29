const router = require('express').Router();
const { User, Recipes, Cuisine } = require('../models');
const withauth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const dbCuisineData = await Cuisine.findAll({
      include:[{
      model: Cuisine,
      attributes:['id', 'title', 'image'],
      }],
      include: [
        {
          model: Recipes,
          attributes: ['id', 'dishName','image', 'summary', 'instructions', 'ingredients', 'serves', 'prepTime', 'cookTime', 'date_created'],
          include: [{
            model: User,
            attributes: ['userName'],

          },
          ]
        }

      ],
    });
    const cuisines = dbCuisineData.map((cuisine) => cuisine.get({ plain: true }));
    res.render('homepage', {
      cuisines,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/cuisine/:id', async (req, res) => {
  try {
    const dbCusineData = await Cuisine.findByPk(req.params.id, {
      include: [{
        model: Recipes,
          attributes: ['id', 'dishName', 'image', 'summary', 'instructions', 'ingredients', 'serves', 'prepTime', 'cookTime', 'date_created'],
          include: [{
            model: User,
            attributes: ['userName'],

          },
          ]
        },
      ],
    });

    const cuisine = dbCusineData.get({ plain: true });
    res.render('cuisine', { cuisine });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', async (req, res) => {

  try {
    const dbRecipeData = await Recipes.findByPk(req.params.id, {
          include: [{
            model: User,
            attributes: ['userName']
          },

            {model: Cuisine,
            attributes:['title']}

          
          ]
        },
    
    );

    const recipe = dbRecipeData.get({ plain: true });

    res.render('recipe', { recipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
  const recipeData = await Recipes.findAll({
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
