const User = require('./User');
const Recipes = require('./Recipes');
const Comment = require('./Comment');
User.hasMany(Recipes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Recipes.hasMany(Comment, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE',
});
Recipes.belongsTo(User, {
  foreignKey: 'user_id',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
Comment.belongsTo(Recipes, {
  foreignKey: 'recipe_id',
});
module.exports = { User, Recipes, Comment };
