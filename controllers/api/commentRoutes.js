const router = require('express').Router();
const { User, Comment, Recipes } = require('../../models');
const withAuth = require('../../utils/auth');
let recipeId = 0;
router.post('/', async (req, res) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.getCurrentUrlPost_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.get('/:id', withAuth, async (req, res) => {
  try {
    postId = req.params.id;
    const post = await Recipes.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['name'],
      },
    });
    const recipePlain = post.get({ plain: true });
    const commentsPlain = comments.map((comment) =>
      comment.get({ plain: true })
    );
    res.status(200).render('comment', { recipePlain, commentsPlain });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.get('/', (req, res) => {
  if (req.session.signIn) {
    res.redirect(`/api/comments/${recipeId}`);
    return;
  }
  res.render('welcome');
});
module.exports = router;
