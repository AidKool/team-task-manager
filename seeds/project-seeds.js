const { Project } = require('../models');

const projectData = [
  {
    title: 'Team Task Manager',
  },
  {
    title: 'Bitcoin tracker',
  },
  {
    title: 'Sports Bets',
  },
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
