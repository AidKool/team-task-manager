const { Team } = require('../models');

const teamData = [
  {
    project_id: 1,
    name: 'Team 1',
  },
];

const seedTeam = () => Team.bulkCreate(teamData);

module.exports = seedTeam;
