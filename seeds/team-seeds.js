const { Team } = require('../models');

const teamData = [
  {
    name: 'Team 1',
  },
  {
    name: 'Team 2',
  },
  {
    name: 'Team 3',
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
