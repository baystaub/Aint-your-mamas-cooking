const router = require('express').Router();
const { Recipes } = require('../../models');

router.post('/', async (req, res) => {
  console.log("hello")
  try {
    const recipeData = await Recipes.create({
      description: req.body.post,
      dishName: req.body.dishName,
      summary: req.body.summary,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      serves: req.body.serves,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      date_created: req.body.date_created,
      image: req.body.image,
      cuisine_id: req.body.cuisine_id,
      
      user_id: req.session.user_id,
    });

    console.log(req.body)
    const recipe = recipeData.get({ plain: true });
    res.status(200).json({ recipe });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get('/edit/:id', async (req, res) => {
  try {
    const recipeData = await Recipes.findByPk(req.params.id);
    const recipe = recipeData.get({ plain: true });
    res.status(200).render('edit-post', { recipe });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const recipeData = await Recipes.update(
      {
        name: req.body.editTitle,
        description: req.body.editPost,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(recipeData);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(recipeData);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
