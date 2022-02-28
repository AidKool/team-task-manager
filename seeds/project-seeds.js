const { Project } = require('../models');

const projectData = [
  {
    title: 'Team Task Manager',
    team_id: 1,
  },
  {
    title: 'Bitcoin tracker',
    team_id: 2,
  },
  {
    title: 'Sports Bets',
    team_id: 3,
  },
];

const seedProject = () => Project.bulkCreate(projectData);

module.exports = seedProject;
