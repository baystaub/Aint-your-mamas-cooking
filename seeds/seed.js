const sequelize = require('../config/connection');
const { User, Recipes, Cuisine } = require('../models');

const userData = require('./userData.json');
const seedCuisineDatabase = require('./cuisineData')
const recipesData = require('./recipesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedCuisineDatabase();

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
