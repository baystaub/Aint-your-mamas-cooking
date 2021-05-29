const sequelize = require('../config/connection');
const { User, Recipes } = require('../models');

const userData = require('./userData.json');
const recipesData = require('./recipesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipes of recipesData) {
    await Recipes.create({
      ...recipes,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
