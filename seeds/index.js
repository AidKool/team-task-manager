const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedTask = require('./task-seeds');
const seedTeam = require('./team-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SYNCED -----\n');
  await seedTask();
  console.log('\n----- TASKS SYNCED -----\n');
  await seedTeam();
  console.log('\n----- TEAMS SYNCED -----\n');
};

seedAll();
