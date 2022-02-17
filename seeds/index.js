const sequelize = require('../config/connection');
const User = require('../models/User');
const Team = require('../models/Team');
const Task = require('../models/Task');
const { userData, teamData, taskData } = require('./data-seeds.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Team.bulkCreate(teamData, {
    individualHooks: true,
    returning: true,
  });

  await Task.bulkCreate(taskData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
