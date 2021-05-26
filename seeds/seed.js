const sequelize = require('../config/connection');
const { User, Recipes } = require('../models');

const userData = require('./userData.json');
const projectData = require('./recipies.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Recipes of recipesData) {
    await Project.create({
      ...Recipes,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
