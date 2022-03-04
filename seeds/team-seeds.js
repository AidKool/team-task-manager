const { Team } = require('../models');

const teamData = [
  {
    name: 'The Rangers',
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
